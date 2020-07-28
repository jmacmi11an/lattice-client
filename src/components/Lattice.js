import React, { Component } from 'react';
import axios from 'axios';
import CardDeck from './CardDeck'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import server from '../constants.js'

const SERVER_URL_PROJECTS = server('projects')
const SERVER_URL_CARDS = server('cards')
const SERVER_URL_TASKS = server('tasks')

class Lattice extends Component {
  constructor() {
    super();
    this.state = {
      name: [],
      currentlyRendering: {}
    };

    const fetchProjects = () => {
      axios.get(SERVER_URL_PROJECTS, {withCredentials: true}).then( (res) => {
        this.setState({name: res.data, currentlyRendering: res.data[0]});
      })
    }

    fetchProjects();
    this.saveProject = this.saveProject.bind(this)
    this.changeCurrentlyRendering = this.changeCurrentlyRendering.bind(this)
    this.changeCurrentlyRenderingTasks = this.changeCurrentlyRenderingTasks.bind(this)
    this.changeCurrentlyRenderingCards = this.changeCurrentlyRenderingCards.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
    this.fetchProjects = fetchProjects
  }

  changeCurrentlyRenderingTasks(cardIndex, task) {
    const newCards = this.state.currentlyRendering.cards.slice(0) //copying
    newCards[cardIndex].tasks.push(task)

    this.setState( {
      currentlyRendering: {
        ...this.state.currentlyRendering,
        cards: newCards
      }
    })
  }

  async deleteTask(cardId, cardIndex, taskId) {
    await axios.delete(SERVER_URL_TASKS + taskId, {withCredentials:true})

    let newCards = this.state.currentlyRendering.cards.slice(0)
    newCards.forEach((item, i) => {
      if (item.id === cardId) {
        item.tasks.splice(cardIndex, 1)
      }
    });

    this.setState( {
      currentlyRendering: {
        ...this.state.currentlyRendering,
        cards: newCards
      }
    })
  }

  async deleteCard(cardIndex, index) {
    await axios.delete(SERVER_URL_CARDS + cardIndex, {withCredentials:true})

    let newCards = this.state.currentlyRendering.cards.slice(0)
    newCards = newCards.filter(c => c.id !== cardIndex)
    console.log(cardIndex, newCards)

    this.setState( {
      currentlyRendering: {
        ...this.state.currentlyRendering,
        cards: newCards
      }
    })
  }

  changeCurrentlyRenderingCards(card) {
    this.setState(prevState => ({
      ...prevState,
      currentlyRendering: {
        ...prevState.currentlyRendering,
          cards: [
            ...prevState.currentlyRendering.cards, card
          ]
        }
    }));this.fetchProjects()
  }

  saveProject(data) {
      axios.post(SERVER_URL_PROJECTS, {name: data}, {withCredentials: true}).then((res) => {
        this.setState({name: res.data})
        console.log(res.data)
      })
    }

  changeCurrentlyRendering(index) {
    this.setState({ name: this.state.name, currentlyRendering: this.state.name[index] })
  }

  deleteProject(index){
    const deleteURL = SERVER_URL_PROJECTS + `/${ index }`
    fetch(deleteURL, {
      method: "DELETE"
    }).then(() => {
      for (let i = 0; i < this.state.name.length; i++) {
        if (this.state.name[i].id === index){
          let projects = this.state.name;
          projects.splice(i, 1)
          this.setState({name: projects})
        }
      }
    })
  }

  render() {
    return(
      <div class="aside">
        <div className="aside_title_container">
          <ProjectForm
            onSubmit={ this.saveProject }
            className="aside-form" />
        </div>

        <ProjectList
          name={ this.state.name }
          pickProject={ this.changeCurrentlyRendering }
          projectInFocus={ this.state.currentlyRendering }
          deleteProject={ this.deleteProject }
          updateCards={ this.changeCurrentlyRenderingCards }
          deleteCard={ this.deleteCard }
          updateTasks={ this.changeCurrentlyRenderingTasks }
          deleteTask={ this.deleteTask }
        />

      </div>
    );
  }
}


class ProjectForm extends Component {
  constructor() {
    super();
    this.state = { newProject: '' };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange(event) {
    this.setState({ newProject: event.target.value} );
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit( this.state.newProject );
    this.setState({ newProject: '' });
  }

  render() {
    return (
      <form onSubmit={ this._handleSubmit }>
        <TextField
          id="standard-basic"
          value={ this.state.newProject }
          onChange={ this._handleChange }
          placeholder="Remodel the Kitchen"
          required />
          <IconButton type="submit">
            <Icon>add_circle</Icon>
          </IconButton>
      </form>
    );
  }
}


const ProjectList = (props) => {
  return (
    <List component="nav" className="main_aside">
      <div class="projects">
          { props.name.map( (p, i) =>
            <div>
              <ListItem
                button
                onClick={ () => props.pickProject(i) }
                key={ p.id }>
              <ListItemText primary={ p.name } />
                 <IconButton aria-label="delete" onClick={ () => props.deleteProject(p.id) }>
                   <DeleteIcon />
                 </IconButton>
              </ListItem>

            </div> )}
      </div>
          <CardDeck
            allCards={ props.name }
            projectCards={ props.projectInFocus }
            updateCards={ props.updateCards }
            deleteCard={ props.deleteCard }
            updateTasks={ props.updateTasks }
            deleteTask={ props.deleteTask }
          />
    </List>
  );
};

export default Lattice;
