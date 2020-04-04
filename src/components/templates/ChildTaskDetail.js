import React from 'react';
import { withRouter } from 'react-router';
import { Field, reduxForm } from 'redux-form'
import renderTextField from '../atoms/TextField';

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
import { Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CardActionArea from '@material-ui/core/CardActionArea';


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

class ChildTaskDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    }
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
                            CHILD TASK
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
          <Paper >
            <Typography>タイトル</Typography>
            <Typography>説明文</Typography>
            <Typography>参加人数</Typography>
            <Typography>総親タスク数 + 未完了タスク数</Typography>
            <Typography>進捗率(%) + 進捗バー</Typography>
          </Paper>
          <IconButton>
            <AddIcon />Create Task
          </IconButton>
          <CardActionArea>
          <Paper >
            <Typography>親タスクタイトル</Typography>
            <Typography>担当者</Typography>
            <Typography>総親タスク数 + 未完了タスク数</Typography>
            <Typography>完了期日</Typography>
          </Paper>
          </CardActionArea>
        </main>
      </div>
    )
  }
}

ChildTaskDetail = reduxForm({
  form: 'ChildTaskDetail'
})(ChildTaskDetail)


export default withStyles(styles)(withRouter(ChildTaskDetail));