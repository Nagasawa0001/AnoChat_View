import React from 'react';
import { withRouter } from 'react-router';
import '../../assets/Top.css';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import { signupAction } from '../../modules/Signup';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import renderTextField from '../atoms/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
});


class Signup extends React.Component {

    submit(form, dispatch) {
      dispatch(signupAction(form));
    }


    render() {
        const { classes } = this.props;
        const { handleSubmit } = this.props;
        return (
            <Container component="main" maxWidth="xs">
              {
                this.props.processing ? (<CircularProgress color="secondary"/>) : ''
              }
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Typography component="subscription" variant="subscription" color="textSecondary">
                メールアドレスにお送りしたトークンを使用してユーザー登録を完了させてください
              </Typography>
              <form onSubmit={handleSubmit(this.submit.bind(this))}>
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
                      name="signupToken"
                      label="signupToken"
                      type="signupToken"
                      id="signupToken"
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
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link component={RouterLink} to="/signin" variant="body2">
                      ユーザー登録済みの方はこちら
                    </Link>
                    <Grid item>
                    <Link href="#" variant="body2">
                      パスワードをお忘れの方はこちら
                    </Link>
                    </Grid>
                  </Grid>
                </Grid> 
              </form>
            </div>
          </Container>
        )
    }
}

Signup = reduxForm({
  // a unique name for the form
  form: 'signup'
})(Signup)

function mapStateToProps(store) {
  return {
    processing: store.signup.processing
  }
}

function mapDispatchToProps(dispatch){
  return {
    signupAction(form){
      dispatch(signupAction(form));
    }
  }
}


export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup)));