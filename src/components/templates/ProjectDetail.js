import React from 'react';
import { withRouter } from 'react-router';
import '../../assets/ProjectDetail.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const styles = (theme) => ({
    root: {
      display: 'flex',
      minHeight: 570,
      justifyContent: 'center',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    categoryChips: {
        margin: 5,
        background: '#f5deb3',
    },
    languageChips: {
        margin: 5,
        background: '#ffe4e1',
    },
    chips: {
        marginTop: 15,
        marginBottom: 15,
    },
    content2: {
        display: 'flex',
    },
    administrator: {
        marginRight: 15,
        color: 'red',
    },
    requireNumber: {
        marginRight: 15,
        color: 'red',

    },
    currentNumber: {
        marginRight: 15,
        color: 'red',
    },
    discription: {
        margin: 50,
        maxWidth: 550,
        textAlign: 'left'
    }
});

class TopicDetail extends React.Component {

    handleToProjectList = () => {
        this.props.history.push('/project');
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h2" variant="h2">
                  Live From Space
                </Typography>
                <div className={classes.chips}>
                <Chip className={classes.categoryChips} label="ああああああああああああ" />
                <Chip className={classes.languageChips} label="Basic" />
                </div>
                <div className={classes.content2}>
                管理/作成者：
                <Typography className={classes.administrator} variant="p" color="textSecondary">
                  Mac Miller
                </Typography>
                募集：
                <Typography className={classes.requireNumber} variant="p" color="textSecondary">
                  5人
                </Typography>
                参加：
                <Typography className={classes.currentNumber} variant="p" color="textSecondary">
                  2人
                </Typography>
                </div>
                <div className={classes.discription}>
                <Typography  variant="subtitle1" color="textSecondary">
                あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                </Typography>
                </div>
              </CardContent>
              <div className={classes.controls}>
      <ButtonGroup variant="contained">
        <Button color="primary" className="select-btn">参加申請</Button>
        <Button color="secondary" className="select-btn" onClick={this.handleToProjectList}>前ページへ戻る</Button>
      </ButtonGroup>
              </div>
            </div>
          </Card>
        );
    }
}

export default withStyles(styles)(withRouter(TopicDetail));