import React from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import '../../assets/Top.css';
import { connect } from 'react-redux';
import { fetchTopicList } from '../../modules/TopicList';


class Top extends React.Component {


    handleToTopicList = () => {
        this.props.history.push('/topic');
    }

    render() {
        return (
            <div>
                
                <p className="title">AnoChat</p>
                <p className="discription">　みんなと楽しいチャットをはじめよう</p>
                <Button className="start-btn" variant="contained" color="primary" onClick={this.handleToTopicList}>Get Started</Button>
                <h3>{this.props.error}</h3>
            </div>
        )
    }
}

function mapStateToProps({ error }) {
    return {
        error
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