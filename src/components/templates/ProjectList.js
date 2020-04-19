import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import renderTextField from '../atoms/TextField';
import { getProjectDetailAction } from '../../modules/ProjectDetail';
import { searchProjectAction, confirmInvitationAction, getProjectListAction } from '../../modules/ProjectList';
import { logoutAction } from '../../modules/Auth';

import '../../assets/ProjectList.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
        justifyContent: 'center',
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    messageButton: {
        width: 80
    },
    messageFrame: {
        marginBottom: 10
    },
    searchForm: {
        margin: 30,
        marginRight: 310
    },
    createButton: {
        margin: 15,
    },
    project: {
        justifyContent: 'center',
        margin: 20,
        width: 700,
        height: 120
    }
});

class ProjectList extends React.Component {

    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.getProjectListAction(this.props.userId);
        } else {
            document.cookie = "JSESSIONID=; expires=0";
            this.props.history.push('/signin');
            // this.props.getProjectListAction(this.props.userId);
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

    logout() {
        this.props.logoutAction();
    }


    render() {
        const { classes, handleSubmit } = this.props;
        this.props.change('userId', this.props.userId);
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
                            <div className={classes.grow}>
                            <IconButton
                                    edge='end'
                                    aria-label='account of current user'
                                    aria-controls=''
                                    aria-haspopup='true'
                                    onClick={this.logout.bind(this)}
                                    color='inherit'
                                >
                                    <ExitToAppIcon style={{ fontSize: 30 }}/>
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
                    <div className={classes.searchForm}>
                                <form onSubmit={handleSubmit(this.submit.bind(this))}>
                                    <SearchIcon style={{ fontSize: 70 }} />
                                    <Field
                                        component={renderTextField}
                                        name='title'
                                        id='title'
                                        variant='outlined'
                                        label='プロジェクト名で検索...'
                                        style={{ width: 600}}
                                    />
                                </form>
                                </div>
                                <Button color="default" className={classes.createButton} variant="contained" onClick={this.handleToProjectRegister.bind(this)} >Create Project</Button>
                        {
                            this.props.projectList.map((project) =>
                                <Card className={classes.project} key={project.id}>
                                        <CardActionArea onClick={this.handleToTopicDetail.bind(this, project.id)}>
                                        <Typography className={classes.projectTitle} gutterBottom variant='h6' component='h2' >
                                            {project.title}
                                        </Typography>
                                        <Typography gutterBottom variant='p' component='h2' >
                                            {project.discription}
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary' component='p' className={classes.metaInfo}>
                                            CREATEDDATE:{project.createdDate}
                                            </Typography>
                                            <Typography>
                                            <PeopleAltIcon fontSize='small' />
                                            {project.currentUser}人参加中
                                            </Typography>
                                    </CardActionArea>
                                </Card>
                            )
                        }
                </main>
            </div>
        )
    }
}

ProjectList = reduxForm({
    form: 'ProjectList'
})(ProjectList)

function mapStateToProps(store) {
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
        },
        logoutAction() {
            dispatch(logoutAction());
        }
    }
}


export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectList)));