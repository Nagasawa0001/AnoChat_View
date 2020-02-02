import React from 'react';
import { withRouter} from 'react-router';
import Button from '@material-ui/core/Button';
import '../../assets/Top.css';


class Top extends React.Component {

    handleToTopicList = () => {
        this.props.history.push('/topic')
    }

    handleToTopicDetail = () => {
        this.props.history.push('/topic/1')
    }


    render() {
        return (
            <div>
                <p class="title">AnoChat</p>
                <p class="discription">　世界一気楽なチャットをはじめよう</p>
                <Button id="start-btn" variant="contained" color="primary" onClick={this.handleToTopicList}>Get Started</Button>
                <Button id="start-btn" variant="contained" color="danger" onClick={this.handleToTopicDetail}>Test to TopicDetail</Button>
            </div>
        )
    }
}

export default withRouter(Top)