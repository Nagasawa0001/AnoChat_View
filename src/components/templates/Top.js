import React from 'react';
import { withRouter} from 'react-router';
import Button from '@material-ui/core/Button';
import '../../assets/Top.css';


class Top extends React.Component {

    handleToTopicList = () => {
        this.props.history.push('/topic')
    }


    render() {
        return (
            <div>
                <p class="title">AnoChat</p>
                <p class="discription">世界一気楽なチャットをはじめよう</p>
                <Button id="start-btn" variant="contained" color="primary" onClick={this.handleToTopicList}>Get Started</Button>
            </div>
        )
    }
}

export default withRouter(Top)