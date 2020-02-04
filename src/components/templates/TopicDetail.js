import React from 'react';
import { withRouter } from 'react-router';
import '../../assets/TopicDetail.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Divider from '@material-ui/core/Divider';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SpeakerNotesSharpIcon from '@material-ui/icons/SpeakerNotesSharp';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        float: "right",
        width: '100%',
        maxWidth: 350,
        maxHeight: 350,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
    },
    icon: {
        marginRight: 8,
    },
    card: {
        marginLeft: 80,
        marginBottom: 10,
        maxWidth: 827,
        maxHeight: 400,
        padding: 20,
    },
    media: {
        height: 150,
        width: 200,
        magin: 10,
        border: "solid",
    },
    contentMedia: {
        display: 'flex',
        flexWrap: "wrap",
    },
    topicContent: {
        maxWidth: 600,
        marginLeft: 20,
    },
    input: {
        marginLeft: theme.spacing(1),
        width: 800,
        maxHeight: 600,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 780,
        border: "solid",
        borderColor: "#c0c0c0",
        height: 40,
    },
});

class TopicDetail extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" >
                            タイトルタイトルタイトルタイトルタイトル
                                </Typography>
                    </CardContent>
                    <div className={classes.contentMedia}>
                        <CardMedia
                            className={classes.media}
                            image="/images/top-img01.png"
                            title="Contemplative Reptile"
                        />
                        <span className={classes.topicContent}>[本文記載]</span>
                    </div>
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
                <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem>
                            <ListItemIcon>
                                <TrendingUpIcon className={classes.icon} />
                                <ListItemText primary="急上昇" />
                            </ListItemIcon>
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Trash" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Spam" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Spam" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Spam" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Spam" />
                        </ListItem>
                    </List>
                </div>
                <div id="chat-frame">
                    <span>2019/12/01</span>
                    <ReplyAllIcon />50件
            <p class="chat-talk">
                        <span class="talk-icon">
                            <div class="talk-icon">11</div>
                            <AccountCircleIcon fontSize="large" />
                        </span>
                        <span class="talk-content">[トーク内容を記載]</span>
                    </p>
                    <div>
                        <span>2019/12/01</span>
                        <ReplyAllIcon />50件
            <p class="chat-talk mytalk">
                            <span class="talk-icon">
                                <div class="talk-icon">12</div>
                                <AccountCircleIcon fontSize="large" />
                            </span>
                            <span class="talk-content">[トーク内容を記載]</span>
                        </p>
                    </div>
                    <Paper component="form" className={classes.paper}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Google Maps"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SendIcon fontSize="large" />
                        </IconButton>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(TopicDetail));