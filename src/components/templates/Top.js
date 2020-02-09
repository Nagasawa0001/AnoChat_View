import React from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import '../../assets/Top.css';
import { connect } from 'react-redux';
import { fetchTopicList } from '../../modules/Top';


class Top extends React.Component {


    handleToTopicList = () => {
        const meta = {
            pageOnTopicList: '/topic'
        }
        this.props.fetchTopicList(meta);
    }

    render() {
        return (
            <div>
                <p className="title">AnoChat</p>
                <p className="discription">　世界一気楽なチャットをはじめよう</p>
                <Button className="start-btn" variant="contained" color="primary" onClick={this.handleToTopicList}>Get Started</Button>
                <Button className="start-btn" variant="contained" color="default" >Test to TopicDetail</Button>
            </div>
        )
    }
}

function mapStateToProps({ topics }) {
    return {
        topics
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTopicList(meta) {
            dispatch(fetchTopicList(meta));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Top));