import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './players-panel.css';

class PlayersPanel extends React.Component {

    render() {
        return (
            <div className="players-panel">
                <ListGroup>
                    <ListGroup.Item ><h3>Players:</h3></ListGroup.Item>
                    {this.props.players.map((item, key) =>
                        <ListGroup.Item key={key}>{item}</ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        )
    }
}

export default PlayersPanel;