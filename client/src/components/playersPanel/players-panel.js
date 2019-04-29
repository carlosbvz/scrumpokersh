import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaTrashO } from 'react-icons/lib/fa'
import './players-panel.css';

class PlayersPanel extends React.Component {

    constructor(props) {
        super(props)

        this.onDeletePlayer = this.onDeletePlayer.bind(this)
    }

    getAdminControllers(playerId) {
        return (<a href="#" title="Remove this dude"> 
                <FaTrashO color="red" 
                    onClick={e => this.onDeletePlayer(playerId)}/>
                </a>) 
    }
    onDeletePlayer(playerId) {
        this.props.deletePlayer(playerId);
    }

    render() {
        return (
            <div className="players-panel">
                <ListGroup>
                    <ListGroup.Item ><h3>Players:</h3></ListGroup.Item>
                    {this.props.players.map((item, key) =>
                        <ListGroup.Item key={key} variant={item.score? 'success': ''}>
                            <span>{this.props.isAdmin ? this.getAdminControllers(item.id) : null} {item.name }</span> 
                            <span>{ this.props.shouldDisplayEstimates ? item.score ? item.score: ':(' : null } </span>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        )
    }
}

export default PlayersPanel;