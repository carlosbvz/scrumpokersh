import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './login.css';

class LoginPage extends React.Component {

    state = {
        userName: null
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    componentDidMount() {
        if (localStorage.getItem('pockerUserName')) {
            this.props.history.push('/scrum-pocker');
        }
    }

    startGame(userName) {
        if (userName) {
            const userId = this.uuidv4();
            localStorage.setItem('pockerUserName', userName);
            localStorage.setItem('pockerUserId', userId);
            window.socket.emit('add player', {name: userName, id: userId});
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
                    <Form.Control type="text"
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

