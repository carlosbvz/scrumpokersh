import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../../components/header/header';
import PlayersPanel from '../../components/playersPanel/players-panel';
import GameCard from '../../components/game-card/game-card';
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import './scrum-pocker.css';

class ScrumPocker extends React.Component {

    constructor(props) {
        super(props);

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.setPlayers = this.setPlayers.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
        this.toggleEstimates = this.toggleEstimates.bind(this);
        this.getPlayersFromDB = this.getPlayersFromDB.bind(this);
        this.logout = this.logout.bind(this);
    }

    state = {
        isAdmin: this.props.isAdmin,
        userName: null,
        userId: null,
        currentUserStory: null,
        players: [],
        cardsNumbers: ['0', '1/2', '1', '2', '3', '5', '8', '13', '21', '20', '40'],
        selectedCardIndex: [],
        userStoryFieldHeight: null,
        shouldDisplayEstimates: false,
        isGetPlayersIntervalSet: false
    }

    componentDidMount() {
        const userName = localStorage.getItem('pockerUserName');
        const userId = localStorage.getItem('pockerUserId');
        if (userName) { // Game starts
            this.setState({ userName, userId });
            this.setPlayers();
            if (!this.state.isAdmin) window.socket.emit('add player', { name: userName, id: userId, score: null });
            window.socket.on('user story from server', (userStory) => {
                this.setState({ currentUserStory: userStory })
            });
        } else {
            this.props.history.push('/');
        }

    }
    componentWillUnmount() {
        if (this.state.isGetPlayersIntervalSet) {
            clearInterval(this.state.isGetPlayersIntervalSet);
            this.setState({ isGetPlayersIntervalSet: null });
        }
    }
    setPlayers() {
        this.getPlayersFromDB();
        if (!this.state.isGetPlayersIntervalSet) {
            let interval = setInterval(this.getPlayersFromDB, 1000);
            this.setState({ isGetPlayersIntervalSet: interval });
        }
    }
    getPlayersFromDB() {
        fetch('/api/get/players')
            .then(response => response.json())
            .then(playersData => {
                this.setState({ players: JSON.parse(playersData.data) })
            });
    }
    onUsernameChange(userName) {
        this.setState({ userName });
        if (userName) localStorage.setItem('pockerUserName', userName);
        axios.post('/api/update/player', {
            id: this.state.userId,
            name: userName
        });
    }
    onCardClick(cardIndex, cardNumber) {
        const selectedCardIndex = [];
        selectedCardIndex[cardIndex] = true;
        this.setState({ selectedCardIndex });
        axios.post('/api/update/player', {
            id: this.state.userId,
            name: this.state.userName,
            score: cardNumber
        });
    }
    logout() {
        localStorage.clear();
        this.props.history.push('/');
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
        window.socket.emit('send user story', event.target.value);
    }
    toggleEstimates() {
        this.setState({ shouldDisplayEstimates: !this.state.shouldDisplayEstimates });
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
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={4}>

                            <Row>
                                <Col xs={6}>
                                    <Button block variant="primary" disabled={!this.state.shouldDisplayEstimates} onClick={this.toggleEstimates} >Hide Estimates</Button>
                                </Col>
                                <Col xs={6}>
                                    <Button block variant="primary" disabled={this.state.shouldDisplayEstimates} onClick={this.toggleEstimates} >Show Estimates</Button>
                                </Col>
                            </Row>
                            <br />
                            <PlayersPanel players={this.state.players} isAdmin={this.state.isAdmin} shouldDisplayEstimates={this.state.shouldDisplayEstimates}/>
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
                                <p>{this.state.currentUserStory || 'No user Story added yet'}</p>
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