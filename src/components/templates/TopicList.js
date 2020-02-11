import React from 'react';
import { withRouter } from 'react-router';
import '../../assets/TopicList.css';
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
import MenuIcon from '@material-ui/icons/Menu';
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
import SpeakerNotesSharpIcon from '@material-ui/icons/SpeakerNotesSharp';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchTopicList } from '../../modules/TopicList';

export const categoryTags = [
    { id: 1, name: 'ニュース' },
    { id: 2, name: '漫画・アニメ・ゲーム' },
    { id: 3, name: '雑談' }
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
        maxWidth: 260,
        maxHeight: 270,
        margin: 10,
        borderRadius: 5,
    },
    media: {
        height: 120,
    },

    cardList: {
        display: 'flex',
        flexWrap: "wrap",
        marginLeft: 30,
    },
    main: {
        display: 'flex',
    },
    topicTitle: {
        fontWeight: "bold",
    }
});


class TopicList extends React.Component {

    componentDidMount() {
        const meta = {
            pageOnTopicList: '/topic'
        }
        this.props.fetchTopicList(meta);
    }

    render() {
        const { classes } = this.props;
        const topics = this.props.topics;
        return (
            <div>
                <div className={classes.grow}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography className={classes.title} variant="h6" noWrap>
                                トピック
                            </Typography>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="トピック名で検索..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <IconButton aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={4} color="secondary">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton aria-label="show 17 new notifications" color="inherit">
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls=""
                                    aria-haspopup="true"
                                    onClick=""
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls=""
                                    aria-haspopup="true"
                                    onClick=""
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.main}>
                    <div className={classes.root}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemIcon>
                                    <ListItemText primary="● カテゴリ" />
                                </ListItemIcon>
                            </ListItem>
                            {
                                categoryTags.map(function (categoryTag, i) {
                                    return (
                                        <div>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText key={i} primary={categoryTag.name} />
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
                            topics.map(function (topic, i) {

                                return (
                                    <Card className={classes.card} key={i}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography className={classes.topicTitle} gutterBottom variant="h6" component="h2" >
                                                    {topic.title}
                                                </Typography>
                                            </CardContent>
                                            <CardMedia
                                                className={classes.media}
                                                image="/images/top-img01.png"
                                                title="Contemplative Reptile"
                                            />
                                        </CardActionArea>
                                        <CardActions>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                作成日:2019/12/01
                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                <SpeakerNotesSharpIcon fontSize="small" />
                                                120
                            </Typography>
                                        </CardActions>
                                    </Card>
                                );
                            })

                        }

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(store) {
    console.log(store.topics);
    return {
        topics: store.topics,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTopicList(meta) {
            dispatch(fetchTopicList(meta));
        }
    }
}


export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicList)));