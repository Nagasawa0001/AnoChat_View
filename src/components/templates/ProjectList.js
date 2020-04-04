import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import getJSESSION from '../../common';
import renderTextField from '../atoms/TextField';
import { getProjectDetailAction } from '../../modules/ProjectDetail';
import { searchProjectAction, confirmInvitationAction, getProjectListAction } from '../../modules/ProjectList';

import '../../assets/ProjectList.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import { Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { withStyles } from '@material-ui/core/styles';


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
    messageButton: {
        width: 80
    },
    messageFrame: {
        marginBottom: 10
    }
});

class projectList extends React.Component {

    componentDidMount() {
        var sessionInfo = getJSESSION();
        if (!sessionInfo.JSESSIONID && !sessionInfo.userId) {
            this.props.history.push('/signin');
        } else {
            this.props.getProjectListAction(JSON.parse(sessionInfo.userId));
        }
    }

    handleToTopicDetail(projectId) {
        this.props.getProjectDetailAction(projectId)
    }

    submit(form, dispatch) {
        dispatch(searchProjectAction(form));
    }

    confirmInvitation(messageId, toUserId, projectId) {
        var messageInfo = {
            id: messageId,
            toUserId: toUserId,
            projectId: projectId
        }

        this.props.confirmInvitationAction(messageInfo);
    }

    handleToProjectRegister(){
        this.props.history.push('/create/project');
    }

    handleToProfile() {
        this.props.history.push('/profile');
    }


    render() {
        const { classes } = this.props;
        console.log(this.props);
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
                            PROJECT
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
                            <div className={classes.grow}>
                            <IconButton
                                    edge='end'
                                    aria-label='account of current user'
                                    aria-controls=''
                                    aria-haspopup='true'
                                    onClick={this.handleToProfile.bind(this)}
                                    color='inherit'
                                >
                                    <AccountCircle style={{ fontSize: 30 }}/>
                                </IconButton>
                                </div>
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
                            <ListItem >
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <ListItemText primary='Invitation Box' />
                            </ListItem>
                                {
                                    this.props.messageList.map((message) =>
                                    message.confirmed ? '' :
                                    <div className={classes.messageFrame}>
                                        <Divider />
                                        <List >
                                            <ListItem key={message.id} >
                                                <Typography  variant='caption'>
                                                    PROJECT :{message.messageTitle}
                                                </Typography>
                                                </ListItem>
                                                <ListItem key={message.id} >
                                                <Typography variant='caption' noWrap>
                                                      TITLE :{message.messageTitle}
                                                </Typography>
                                                </ListItem>
                                                <ListItem key={message.id} >
                                                <Typography variant='caption' noWrap>
                                                      CONTENT :{message.content}
                                                </Typography>
                                                </ListItem>
                                                <ListItem key={message.id} >
                                                <Typography variant='caption' noWrap>
                                                      CREATEDDTE :{message.createdDate}
                                                </Typography>
                                            </ListItem>
                                            <Button
                                            className={classes.messageButton}
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={this.confirmInvitation.bind(this, message.id, message.toUserId, message.projectId)}
                                            >
                                                  Join
                                            </Button>
                                            </List>
                                            </div>
                                  )
                                }
                             </List>
                            <Divider />
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <IconButton onClick={this.handleToProjectRegister.bind(this)}>
              <AddIcon />Create Project
            </IconButton>
                    <Paper >
                        {
                            this.props.projectList.map((project) =>
                                <Card className={classes.card} key={project.id}>
                                    <CardActionArea onClick={this.handleToTopicDetail.bind(this, project.id)}>

                                        <Typography className={classes.projectTitle} gutterBottom variant='h6' component='h2' >
                                            {project.title}
                                        </Typography>
                                        <Typography gutterBottom variant='p' component='h2' >
                                            {project.discription}
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary' component='p' className={classes.metaInfo}>
                                            CREATEDDATE:{project.createdDate}
                                            <PeopleAltIcon fontSize='small' />
                                            {project.currentUser}人参加中
                                            </Typography>
                                    </CardActionArea>
                                </Card>
                            )
                        }
                    </Paper>
                </main>
            </div>
        )
    }
}

projectList = reduxForm({
    form: 'ProjectList'
})(projectList)

function mapStateToProps(store) {
    console.log(store);
    return {
        projectList: store.projectInfo.userInfo.projectList,
        messageList: store.projectInfo.userInfo.messageList,
        userId: store.userInfo.profile.id,
        loggedIn: store.userInfo.loggedIn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProjectListAction(userId) {
            dispatch(getProjectListAction(userId));
        },
        getProjectDetailAction(projectId) {
            dispatch(getProjectDetailAction(projectId));
        },
        searchProjectAction(userId, title) {
            dispatch(searchProjectAction(userId, title));
        },

        confirmInvitationAction(messageInfo) {
            dispatch(confirmInvitationAction(messageInfo));
        }
    }
}


export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(projectList)));