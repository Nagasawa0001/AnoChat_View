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
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles(theme => ({
    root: {
        float: "right",
        width: '100%',
        maxWidth: 250,
        maxHeight: 350,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
    },
    icon: {
        marginRight: 8,
    }
}));

function TopicDetail() {
    const classes = useStyles();
    return (
        <div>
        <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                            <ListItemIcon>
                            <TrendingUpIcon className={classes.icon}/>
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
            <p class="chat-talk">
                <span class="talk-icon">
                <AccountCircleIcon fontSize="large" />
                </span>
                <span class="talk-content">[トーク内容を記載]<span class="talk-number">11</span></span>
            </p>
            <div>
                <span>2019/12/01</span>
            <p class="chat-talk mytalk">
                <span class="talk-icon">
                <div class="talk-icon">12</div>
                <AccountCircleIcon fontSize="large" />
                </span>
                <span class="talk-content">[トーク内容を記載]</span>
                <span class="talk-number">2019/01/01</span>
            </p>
            </div>
        </div>
        </div>
    )
}

export default withRouter(TopicDetail)