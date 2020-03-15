import React from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import '../../assets/Top.css';


class Top extends React.Component {


    handleToSignin = () => {
        this.props.history.push('/signin');
    }

    handleToSignup = () => {
        this.props.history.push('/signup');
    }

    render() {
        return (
            <div>
                
                <h1 className="title">CoopLab</h1>
                <p className="discription">Easy Task Management!</p>
                <Button color="primary" className="start-btn" variant="contained" onClick={this.handleToSignin}>Signin</Button>
                <Button color="secondary" className="start-btn" variant="contained" onClick={this.handleToSignup}>Signup</Button>
                <h3>{this.props.error}</h3>
            </div>
        )
    }
}

export default withRouter(Top);