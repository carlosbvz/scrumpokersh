import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaMinus } from 'react-icons/lib/fa'
import './players-panel.css';

class PlayersPanel extends React.Component {

    constructor(props) {
        super(props)
    }

    getAdminControllers() {
        return <a href="#"> <FaMinus color="red"/></a> 
    }

    render() {
        return (
            <div className="players-panel">
                <ListGroup>
                    <ListGroup.Item ><h3>Players:</h3></ListGroup.Item>
                    {this.props.players.map((item, key) =>
                        <ListGroup.Item key={key}>
                            <span>{this.props.isAdmin ? this.getAdminControllers() : null} {item.name }</span> 
                            <span>{ this.props.shouldDisplayEstimates ? item.score: null } </span>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        )
    }
}

export default PlayersPanel;