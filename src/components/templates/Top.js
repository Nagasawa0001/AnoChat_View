import React from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import '../../assets/Top.css';


class Top extends React.Component {


    handleToProjectList = () => {
        this.props.history.push('/project');
    }

    render() {
        return (
            <div>
                
                <h1 className="title">CoopLab</h1>
                <p className="discription">Easy Co-op Development</p>
                <Button className="start-btn" variant="contained" onClick={this.handleToProjectList}>Get Started</Button>
                <h3>{this.props.error}</h3>
            </div>
        )
    }
}

export default withRouter(Top);