import React from 'react';
import { withRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { signinAction } from '../../modules/Signin';
import renderTextField from '../atoms/TextField';

import '../../assets/Top.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

class Signin extends React.Component {

  submit(form, dispatch) {
    dispatch(signinAction(form));
  }

    render() {
        const {classes, handleSubmit} = this.props;
        return (
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      component={renderTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      component={renderTextField}
                    />
                  </Grid>
                </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          </form>
          <Grid container justify="flex-end">
          <Grid item>
                    <Link component={RouterLink} to="/signup" variant="body2">
                      ユーザー登録がまだの方はこちら
                    </Link>
                  </Grid>
          </Grid>
      </div>
    </Container>
        )
    }
}

Signin = reduxForm({
  form: 'signin'
})(Signin)

function mapDispatchToProps(dispatch) {
  return {
    signinAction(form) {
      dispatch(signinAction(form));
    }
  }
}

export default withStyles(styles)(withRouter(connect(null, mapDispatchToProps)(Signin)));