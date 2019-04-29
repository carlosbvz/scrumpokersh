import React from 'react';
import { Form } from 'react-bootstrap';
import './header.css'

class Header extends React.Component {

    updateUserName(userName) {
        this.props.handleUserNameChange(userName);
    }
    restoreUserName(userName) {
        if (!userName) this.props.handleUserNameChange(localStorage.getItem('pockerUserName'));
    }

    render() {
        return (
            <div className="header">
                <h1>ScrumPockersh</h1>
                {!this.props.isAdmin ?
                    <Form>
                        <Form.Group controlId="formUserName">
                            <Form.Control className="input-trans" as="textarea" rows="1" 
                                        value={this.props.userName || ''}
                                        onChange={e => this.updateUserName(e.target.value)}
                                        onBlur={e => this.restoreUserName(e.target.value)}
                                        />
                        </Form.Group>
                    </Form>
                    :
                    null
                }
                
            </div>
        )
    }
}

export default Header;
