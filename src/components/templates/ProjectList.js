import React from 'react';
import { withRouter } from 'react-router';
import '../../assets/ProjectList.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import { fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import getProjectListAction from '../../modules/actions/ProjectList';
import checkProjectMemberAction from '../../modules/actions/ProjectDetail';
import HomeIcon from '@material-ui/icons/Home';
import { Button } from '@material-ui/core';

const languages = [
    { id: 2, name: "Java", url: '/topImages/java-icon.svg' },
    { id: 3, name: "Javascript", url: '/topImages/javascript-icon.svg' }
]

const categories = [
    { id: 2, name: '初心者歓迎'},
    { id: 3, name: '経験者募集'}
]


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
        width: 250,
        maxHeight: 300,
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
        background : '#deb887',
    }
});


class projectList extends React.Component {

    componentDidMount() {
        const meta = {
            success: '/project',
            failure: '/'
        }
        this.props.getProjectListAction(meta);
    }

    handleToTopicDetail(projectId) {
        const userInfoList = this.props.userInfoList;
        this.props.checkProjectMemberAction(projectId, userInfoList)
    }

    render() {
        const { classes } = this.props;
        const projects = this.props.projects;
        console.log(this.props);
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
                                トピック
                            </Typography>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder='トピック名で検索...'
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
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
                                    <ListItemText primary='■ 言語' />
                                </ListItemIcon>
                            </ListItem>
                            {
                                languages.map(function (language, i) {
                                    return (
                                        <div>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText key={i} primary={language.name} />
                                            </ListItem>
                                            <Divider light />
                                        </div>
                                    );
                                })
                            }
                        </List>
                        <List component='nav' aria-label='main mailbox folders'>
                            <ListItem>
                                <ListItemIcon>
                                    <ListItemText primary='■ カテゴリ' />
                                </ListItemIcon>
                            </ListItem>
                            {
                                categories.map(function (category, i) {
                                    return (
                                        <div>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText key={i} primary={category.name} />
                                            </ListItem>
                                            <Divider light />
                                        </div>
                                    );
                                })
                            }
                        </List>
                    </div>
                    <div className={classes.cardList}>
                        {
                            projects.map((project) =>
                               // const moment = require('moment');
                                //const date = new Date();
                                //const createDate = moment().format('YYYY/MM/DD');
                               // const createDate = project.createDate;
                              //  const topImageURL = languages.find(language => language.id === project.languageId1).url
           
                                    <Card className={classes.card} key={project.id}>
                                        <Button onClick={this.handleToTopicDetail.bind(this, 1)}>aaaaa</Button> 
                                        <CardActionArea >
                                            <CardContent>
                                                <Typography className={classes.projectTitle} gutterBottom variant='h6' component='h2' >
                                                    {project.title}
                                                </Typography>
                                            </CardContent>
                                            <CardMedia
                                                className={classes.media}
                                                //image={topImageURL}
                                                title='Contemplative Reptile'
                                            />
                                        
                                        <CardActions>
                                            <Typography variant='body2' color='textSecondary' component='p' className={classes.metaInfo}>
                                                作成日:createDate
                                            </Typography>
                                            <Typography variant='body2' color='textSecondary' component='p' className={classes.metaInfo}>
                                                <PeopleAltIcon fontSize='small' />
                                                120
                                            </Typography>
                                        </CardActions>
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

function mapStateToProps(store) {
    console.log(store.projectInfoList);
    return {
        projects: store.projectInfoList.projects,
        userInfoList: store.userInfoList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProjectListAction(meta) {
            dispatch(getProjectListAction(meta));
        },
        checkProjectMemberAction(userInfo, projectId) {
            dispatch(checkProjectMemberAction(userInfo, projectId));
        }
    }
}


export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(projectList)));