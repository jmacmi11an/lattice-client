import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import server from '../constants.js'

const SERVER_URL_CARDS = server('cards')
const SERVER_URL_TASKS = server('tasks')

class CardDeck extends Component {
  constructor() {
    super();
    this.state = {
      allCards: [],
      cardDetail: '',
    }
    this.saveCardDetailCreate = this.saveCardDetailCreate.bind(this);
  }

  saveCardDetailCreate(cardDetail) {
    if (cardDetail === '') {
      return
    };
    axios.post(SERVER_URL_CARDS, {
      name: cardDetail,
      project_id: this.props.projectCards.id,
    }, {withCredentials:true}).then( (res) => {
      this.setState({ cardDetail: '', allCards: [...this.state.allCards, this.props.allCards] })
      console.log(res.data)

      this.props.updateCards(res.data)
    })
  }

  render(props) {
    return(
      <div className="main">
        <CardContent class="card-container">
          <CardForm onBlur={ this.saveCardDetailCreate }/>
            <div class="single-card">
            { this.props.projectCards && this.props.projectCards.cards && this.props.projectCards.cards.map((c, i) =>
              <div id="each-card">
                <h3 key={ c.id }>{c.name}</h3>
                <IconButton
                  aria-label="delete"
                  onClick={ () => this.props.deleteCard(c.id)}>
                  <DeleteIcon />
                </IconButton>
                <SingleTask
                  cardIndex={i}
                  cardId={c.id}
                  cards={this.props.projectCards}
                  deleteTask={this.props.deleteTask}/>
                <Task cardIndex={i} updateTasks={this.props.updateTasks}/>
              </div>
            )}
            </div>

        </CardContent>
      </div>
    );
  }
}

class CardForm extends Component {
  constructor() {
    super();
    this.state = { cardDetailChanged : '' };
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleCardSubmit = this._handleCardSubmit.bind(this);
  }

  _handleCardChange(event) {
    this.setState({ cardDetailChanged: event.target.value });
  }

  _handleCardSubmit(event) {
    event.preventDefault()
    this.props.onBlur( this.state.cardDetailChanged );
    this.setState({ cardDetailChanged: '' });
  }

  render() {
    return(
        <textarea
          id="create-card-input"
          class="create-input"
          placeholder="Add new card"
          required
          onChange={ this._handleCardChange }
          onBlur={ this._handleCardSubmit }
          value={this.state.cardDetailChanged}>
        </textarea>
    );
  }
}

class SingleTask extends Component {
  render(props) {
    return(
      <div>
        {this.props.cards.cards[this.props.cardIndex].tasks.map((t) =>
          <div class="task-container">
            <textarea key={t.id}>{t.description}</textarea>
            <IconButton
              aria-label="delete"
              onClick={ () => this.props.deleteTask(this.props.cardId, this.props.cardIndex, t.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
    );
  }
}

export default CardDeck;
