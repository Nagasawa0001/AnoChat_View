import React from 'react';
import { withRouter } from 'react-router';
import '../../assets/ProjectList.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getProjectListAction } from '../../modules/ProjectList';
import { getProjectDetailAction } from '../../modules/ProjectDetail';
import HomeIcon from '@material-ui/icons/Home';
import getJSESSION from '../../common';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
import renderTextField from '../atoms/TextField';
import { searchProjectAction } from '../../modules/ProjectList';
import { confirmInvitationAction } from '../../modules/ProjectList';



const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 250,
        maxHeight: 350,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
    },
    grow: {
        flexGrow: 1,
        marginBottom: 30,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    card: {
        width: 800,
        maxHeight: 200,
        margin: 10,
        borderRadius: 5,
    },
    media: {
        height: 120,
    },

    cardList: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 30,
    },
    main: {
        display: 'flex',
    },
    projectTitle: {
        fontWeight: 'bold',
    },
    metaInfo: {
        marginTop: 55,
    },

    appbar: {
        background: '#deb887',
    },
    button: {
        background: 'red'
    },
    cardBorder: {
        border: 5,
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

    render() {
        const { classes, handleSubmit } = this.props;
        this.props.change("userId", getJSESSION().userId);
        return (
            <div>
                <div className={classes.grow}>
                    <AppBar position='static' className={classes.appbar}>
                        <Toolbar>
                            <IconButton
                                edge='start'
                                className={classes.menuButton}
                                color='inherit'
                                aria-label='open drawer'
                            >
                                <HomeIcon />
                            </IconButton>
                            <Typography className={classes.title} variant='h6' noWrap>
                                PROJECT
                            </Typography>
                            <div className={classes.search}>
                                <form onSubmit={handleSubmit(this.submit.bind(this))}>
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
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <IconButton aria-label='show 4 new mails' color='inherit'>
                                    <Badge badgeContent={4} color='secondary'>
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton aria-label='show 17 new notifications' color='inherit'>
                                    <Badge badgeContent={17} color='secondary'>
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    edge='end'
                                    aria-label='account of current user'
                                    aria-controls=''
                                    aria-haspopup='true'
                                    onClick=''
                                    color='inherit'
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton
                                    aria-label='show more'
                                    aria-controls=''
                                    aria-haspopup='true'
                                    onClick=''
                                    color='inherit'
                                >
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.main}>
                    <div className={classes.root}>
                        <List component='nav' aria-label='main mailbox folders'>
                            <ListItem>
                                <ListItemIcon>
                                    <ListItemText primary='■ Invitation Message' />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                        <div className={classes.root}>
                            <List component='nav' aria-label='main mailbox folders'>
                                <Divider />
                                {
                                    this.props.messageList.map((message) =>
                                        message.confirmed ? '' :
                                            <div className={classes.cardBorder}>
                                                <ListItem >
                                                    <Typography className={classes.title} variant='p' noWrap>
                                                        PROJECT :
                                </Typography>
                                                    <ListItemText key={message.id} inset primary={message.messageTitle} />
                                                </ListItem>
                                                <ListItem >
                                                    <Typography className={classes.title} variant='p' noWrap>
                                                        TITLE :
                                </Typography>
                                                    <ListItemText key={message.id} inset primary={message.messageTitle} />
                                                </ListItem>
                                                <ListItem >
                                                    <Typography className={classes.title} variant='p' noWrap>
                                                        CONTENT :
                                </Typography>
                                                    <ListItemText key={message.id} inset primary={message.content} />
                                                </ListItem>
                                                <ListItem >
                                                    <Typography className={classes.title} variant='p' noWrap>
                                                        CREATEDDTE :
                                </Typography>
                                                    <ListItemText key={message.id} inset primary={message.createdDate} />
                                                </ListItem>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.confirmInvitation.bind(this, message.id, message.toUserId, message.projectId)}
                                                >
                                                    Join
                                </Button>
                                                <Divider />
                                            </div>
                                    )

                                }
                            </List>
                        </div>
                    </div>
                    <div className={classes.cardList}>
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
                    </div>
                </div>
            </div>
        );
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