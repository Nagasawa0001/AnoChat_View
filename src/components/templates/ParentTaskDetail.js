import React from 'react';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form'
import { getChildTaskDetailAction } from '../../modules/ChildTaskDetail';
import { connect } from 'react-redux';
import { switchChildTaskAction, updateParentTaskStatusAction } from '../../modules/ParentTaskDetail';


import Button from '@material-ui/core/Button';
import ViewListIcon from '@material-ui/icons/ViewList';
import { fade } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BlockIcon from '@material-ui/icons/Block';



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
card: {
  margin: 20,
  width: 700,
  height: 120
}
});

class ParentTaskDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = { status: ''};
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      document.cookie = "JSESSIONID=; expires=0";
      this.props.history.push('/signin');
    }
  }

  handleToChildTaskDetail(childTaskId) {
    this.props.getChildTaskDetailAction(childTaskId);
  }

  updateParentTaskStatus(e) {
    this.props.updateParentTaskStatusAction(this.props.parentTask.id, e.currentTarget.value);
  }

  switchChildTaskList(status) {
    this.props.switchChildTaskAction(this.props.parentTask.id, status);
  }

  render() {
    const { classes } = this.props;
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
                            PARENT TASK
            </Typography>
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
              </List>

            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Paper className={classes.card}>
          <Button color="primary" variant="outlined" value='1' onClick={this.updateParentTaskStatus.bind(this)}>Done：</Button>
          <Button color="secondary" variant="outlined" value='2' onClick={this.updateParentTaskStatus.bind(this)}>Delete</Button>
          <Button color="default" variant="outlined" value='3' onClick={this.updateParentTaskStatus.bind(this)}>Cancel</Button>
          <Typography>親タスク詳細</Typography>
            <Typography>{this.props.parentTask.title}</Typography>
            <Typography>{this.props.parentTask.content}</Typography>
          </Paper>
          <BottomNavigation
      value={this.state.status}
      onChange={(event, status) => {
        this.switchChildTaskList(status)
        this.setState({status: status})
      }}
      showLabels
      className={classes.card}
    >
      <BottomNavigationAction label="All" icon={<ViewListIcon />} />
      <BottomNavigationAction label="Done" icon={<DoneOutlineIcon />} />
      <BottomNavigationAction label="Deleted" icon={<DeleteForeverIcon />} />
      <BottomNavigationAction label="Canceled" icon={<BlockIcon />} />
    </BottomNavigation>
          {
                this.props.childTaskList.map((childTask) =>
                  <Paper className={classes.card} key={childTask.id}>
                    <CardActionArea onClick={this.handleToChildTaskDetail.bind(this, childTask.id)}>

                      <Typography className={classes.projectTitle} gutterBottom variant='h6' component='h2' >
                        {childTask.title}
                      </Typography>
                      <Typography gutterBottom variant='p' component='h2' >
                        {childTask.content}
                      </Typography>
                      <Typography variant='body2' color='textSecondary' component='p' className={classes.metaInfo}>
                        CREATEDDATE:{childTask.createdDate}
                                            </Typography>
                    </CardActionArea>
                    </Paper>
                )
              }
        </main>
      </div>
    )
  }
}

ParentTaskDetail = reduxForm({
  form: 'ParentTaskDetail'
})(ParentTaskDetail)

function mapStateToProps(store) {
  return {
    parentTask: store.parentTask.parentTask,
    childTaskList: store.parentTask.childTaskList,
    loggedIn: store.userInfo.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getChildTaskDetailAction(childTaskId) {
        dispatch(getChildTaskDetailAction(childTaskId));
    },
    switchChildTaskAction(parentTaskId, status) {
      dispatch(switchChildTaskAction(parentTaskId, status));
    },
    updateParentTaskStatusAction(parentTaskId, status) {
      dispatch(updateParentTaskStatusAction(parentTaskId, status));
    }
  }
}


export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ParentTaskDetail)));