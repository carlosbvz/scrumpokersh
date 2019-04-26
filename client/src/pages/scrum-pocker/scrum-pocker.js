import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../../components/header/header';
import PlayersPanel from '../../components/playersPanel/players-panel';
import GameCard from '../../components/game-card/game-card';
import { Button, Form } from 'react-bootstrap';
import './scrum-pocker.css';

class ScrumPocker extends React.Component {

    constructor(props) {
        super(props);

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setPlayers = this.setPlayers.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
        this.requestEstimates = this.requestEstimates.bind(this);
        this.showEstimates = this.showEstimates.bind(this);
    }

    state = {
        isAdmin: true,
        userName: null,
        currentUserStory: null,
        userStories: [],
        players: [],
        cardsNumbers: ['0', '1/2', '1', '2', '3', '5', '8', '13', '21', '20', '40'],
        selectedCardIndex: [],
        userStoryFieldHeight: null,
        isRequestingEstimates: false
    }

    componentDidMount() {
        this.setUserName();
        this.setPlayers();
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                console.log(data)
        });
    }
    setUserName() {
        const userName = localStorage.getItem('pockerUserName');
        if (userName) {
            this.setState({ userName });
        } else {
            this.props.history.push('/');
        }
    }
    setPlayers() {
        // TODO: Get list from node
        this.setState({ players: ['Charlie', 'Jose'] })
    }
    onUsernameChange(userName) {
        this.setState({ userName });
        if (userName) localStorage.setItem('pockerUserName', userName);
    }
    onCardClick(cardIndex) {
        const selectedCardIndex = [];
        selectedCardIndex[cardIndex] = true;
        this.setState({ selectedCardIndex });
    }

    getCards() {
        return this.state.cardsNumbers.map((card, index) => {
            return <GameCard key={index}
                number={card}
                index={index}
                isCardSelected={this.state.selectedCardIndex[index]}
                handleCardClick={this.onCardClick} />
        });
    }
    onUserStoryChange(event) {
        this.setState({ userStoryFieldHeight: event.target.scrollHeight });
        this.setState({ currentUserStory: event.target.value });
    }
    requestEstimates() {
        this.setState({isRequestingEstimates: !this.state.isRequestingEstimates});
    }
    showEstimates() {
        this.setState({isRequestingEstimates: !this.state.isRequestingEstimates});
    }
    getMainPanel() {
        if (this.state.isAdmin) {
            return (
                <div>
                    <Row>
                        <Col xs={8}>
                            <Row>
                                <Col className="">
                                    <h3>User Story:</h3>
                                    <Form>
                                        <Form.Group controlId="formCurrentUserStory">
                                            <Form.Control style={{ height: this.state.userStoryFieldHeight }}
                                                as="textarea" rows="3"
                                                className="input-trans"
                                                placeholder="Paste here your User Story"
                                                value={this.state.currentUserStory || ''}
                                                onChange={e => this.onUserStoryChange(e)}
                                            />
                                        </Form.Group>
                                    </Form>
                                    <Row>
                                        <Col xs={3}>
                                            <Button block variant="primary"  disabled={this.state.isRequestingEstimates} onClick={this.requestEstimates} >Request Estimates</Button>
                                        </Col>
                                        <Col xs={3}>
                                            <Button block variant="primary" disabled={!this.state.isRequestingEstimates} onClick={this.showEstimates} >Show Estimates</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={4}>
                            <PlayersPanel players={this.state.players} />
                        </Col>
                    </Row>
                </div>)
        } else {
            return (
                <Row>
                    <Col xs={8}>
                        <Row>
                            <Col >
                                <h3>User Story:</h3>
                                <p>This is my User Story</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="cards-section">
                                {this.getCards()}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={4}>
                        <PlayersPanel players={this.state.players} />
                    </Col>
                </Row>
            )
        }

    }

    render() {
        return (
            <div>
                <Header handleUserNameChange={this.onUsernameChange} userName={this.state.userName} />
                {this.getMainPanel()}
            </div>
        )
    }
}

export default ScrumPocker;