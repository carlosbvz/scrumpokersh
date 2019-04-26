import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './login.css'

class LoginPage extends React.Component {

    state = {
        userName: null
    }

    componentDidMount() {
        if (localStorage.getItem('pockerUserName')) {
            this.props.history.push('/scrum-pocker');
        }
    }

    startGame(userName) {
        if (userName) {
            localStorage.setItem('pockerUserName', userName);
            this.props.history.push('/scrum-pocker');
        }
    }
    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <Form className="login-form" onSubmit={this.onSubmit}>
                <Form.Group controlId="fromLogin">
                    <Form.Control   type="text" 
                                    placeholder="What's your name" 
                                    onChange={e => this.setState({ userName: e.target.value })}
                                    required />
                </Form.Group>
                <Button block variant="primary" type="submit" onClick={() => this.startGame(this.state.userName)}>
                    Let's play!
                </Button>
            </Form>
        )
    }
}

export default LoginPage;

