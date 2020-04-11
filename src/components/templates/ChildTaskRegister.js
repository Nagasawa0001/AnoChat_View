import React from 'react';
import { withRouter } from 'react-router';
import { Field, reduxForm } from 'redux-form'
import renderTextField from '../atoms/TextField';
import renderSelect from '../atoms/Select';
import { createTaskAction } from '../../modules/Register';
import { connect } from 'react-redux';


import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WorkIcon from '@material-ui/icons/Work';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.35),
    '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
},
});

class TaskRegister extends React.Component {

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push('/signin');
    }
  }

  submit(form, dispatch) {
    dispatch(createTaskAction(form));
  }

  render() {
    console.log(this.props);
    const { classes, handleSubmit } = this.props;
    this.props.change('userId', this.props.userId);
    this.props.change('taskType', 'Child');
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                            Child Task Register
            </Typography>
            <SearchIcon />
            <div className={classes.search}>
                                <form onSubmit=''>
                                    <Field
                                        placeholder='トピック名で検索...'
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        component={renderTextField}
                                        name='title'
                                        id='title'
                                    />
                                </form>
                            </div>
                            <IconButton
                                    edge='end'
                                    aria-label='account of current user'
                                    aria-controls=''
                                    aria-haspopup='true'
                                    onClick=''
                                    color='inherit'
                                >
                                    <AccountCircle style={{ fontSize: 30 }}/>
                                </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <div className={classes.toolbar} />
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon><PeopleAltIcon /></ListItemIcon>
                  <ListItemText primary='Member List' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><WorkIcon /></ListItemIcon>
                  <ListItemText primary='Project List' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><AssignmentIcon /></ListItemIcon>
                  <ListItemText primary='ParentTask List' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><AssignmentIcon /></ListItemIcon>
                  <ListItemText primary='ChildTask List' />
                </ListItem>
              </List>

            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container component="main" maxWidth="xs">
              {
                this.props.processing ? (<CircularProgress color="secondary"/>) : ''
              }
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <AddCircleOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create Child Task
              </Typography>
              <form  onSubmit={handleSubmit(this.submit.bind(this))}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      id="parentTaskId"
                      label="parentTaskId"
                      name="parentTaskId"
                      autoComplete="parentTaskId"
                      values={this.props.parentTaskList}
                      component={renderSelect}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      id="title"
                      label="title"
                      name="title"
                      autoComplete="title"
                      component={renderTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      name="content"
                      label="content"
                      type="content"
                      id="content"
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
                  Create
                </Button>
              </form>
            </div>
          </Container>
        </main>
      </div>
    )
  }
}

TaskRegister = reduxForm({
  form: 'TaskRegister'
})(TaskRegister)

function mapStateToProps(store) {
  console.log(store);
  return {
      parentTaskList: store.project.projectDetail.parentTasks,
      userId: store.userInfo.profile.id,
      loggedIn: store.userInfo.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createTaskAction(form) {
      dispatch(createTaskAction(form));
    }
  }
}


export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskRegister)));