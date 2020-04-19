import React from 'react';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { getParentTaskDetailAction } from '../../modules/ParentTaskDetail';
import { switchParentTaskAction } from '../../modules/ProjectDetail';

import { fade } from '@material-ui/core/styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
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
import ViewListIcon from '@material-ui/icons/ViewList';
import Button from '@material-ui/core/Button';



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

class ProjectDetail extends React.Component {
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

  handleToParentTaskDetail(parentTaskId) {
    this.props.getParentTaskDetailAction(parentTaskId);
  }

  switchParentTaskList(status) {
    this.props.switchParentTaskAction(this.props.project.id, status);
  }

  handleToParentTaskRegister() {
    this.props.history.push('/create/task/parent');
  }

  handleToChildTaskRegister() {
    this.props.history.push('/create/task/child');
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
              PROJECT DETAIL
            </Typography>
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
          <Typography>プロジェクト詳細</Typography>
            <Typography>{this.props.project.title}</Typography>
            <Typography>{this.props.project.discription}</Typography>
            <Typography><PeopleAltIcon fontSize='small' />{this.props.project.currentUser}人参加中</Typography>
          </Paper>
          <Button color="default" className={classes.createButton} variant="contained" onClick={this.handleToParentTaskRegister.bind(this)} >Create ParentTask</Button>
          <Button color="default" className={classes.createButton} variant="contained" onClick={this.handleToChildTaskRegister.bind(this)} >Create ChildTask</Button>
          <BottomNavigation
          value={this.state.status}
      onChange={(event, status) => {
        this.switchParentTaskList(status)
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
                this.props.parentTaskList.map((parentTask) =>
                  <Paper className={classes.card} key={parentTask.id}>
                    <CardActionArea onClick={this.handleToParentTaskDetail.bind(this, parentTask.id)}>

                      <Typography className={classes.projectTitle} gutterBottom variant='h6' component='h2' >
                        {parentTask.title}
                      </Typography>
                      <Typography gutterBottom variant='p' component='h2' >
                        {parentTask.content}
                      </Typography>
                      <Typography variant='body2' color='textSecondary' component='p' className={classes.metaInfo}>
                        CREATEDDATE:{parentTask.createdDate}
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

ProjectDetail = reduxForm({
  form: 'ProjectDetail'
})(ProjectDetail)

function mapStateToProps(store) {
  return {
    project: store.userInfo.loggedIn ? store.project.projectDetail.project : {},
    parentTaskList: store.userInfo.loggedIn ? store.project.projectDetail.parentTasks : [],
    loggedIn: store.userInfo.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getParentTaskDetailAction(parentTaskId) {
          dispatch(getParentTaskDetailAction(parentTaskId));
    },
    switchParentTaskAction(projectId, status) {
      dispatch(switchParentTaskAction(projectId, status));
    }
  }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDetail)));