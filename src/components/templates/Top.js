import React from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import '../../assets/Top.css';
import { connect } from 'react-redux';
import { getProjectListAction } from '../../modules/ProjectList';


class Top extends React.Component {


    handleToTopicList = () => {
        this.props.history.push('/topic');
    }

    render() {
        return (
            <div>
                
                <h1 className="title">CoopLab</h1>
                <p className="discription">Easy Co-op Development</p>
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
        getProjectListAction(meta) {
            dispatch(getProjectListAction(meta));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Top));