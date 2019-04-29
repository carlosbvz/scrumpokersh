import React from 'react';
import { Card } from 'react-bootstrap';
import './game-card.css';

class GameCard extends React.Component {

    onCardClick(index, number) {
        this.props.handleCardClick(index, number);
    }

    render() {
        return (
            <Card bg={ this.props.isCardSelected ? 'primary' : '' } 
                  text={this.props.isCardSelected ? 'white': ''} 
                  className="game-card--external"
                  onClick={e => this.onCardClick(this.props.index, this.props.number)}>
                <p className="game-card--up">{this.props.number}</p>
                <Card.Body>
                       
                    <Card bg={this.props.isCardSelected ? 'primary' : '' } className="game-card--internal">
                        <Card.Body>
                            <Card.Text>
                                {this.props.number}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                       
                </Card.Body>
                <p className="game-card--down">{this.props.number}</p>
            </Card>
        )
    }
}

export default GameCard;