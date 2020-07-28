import React, { Component } from 'react';
import axios from 'axios';
import CardDeck from './CardDeck'

//from here is new and is just styling
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// const SERVER_URL_PROJECTS = 'http://localhost:3000/projects'
const SERVER_URL_PROJECTS = 'https://lattice-server.herokuapp.com/projects';

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
    this.fetchProjects = fetchProjects
  }

  changeCurrentlyRenderingTasks(cardIndex, task){
    const newCards = this.state.currentlyRendering.cards.slice(0) //copying
    newCards[cardIndex].tasks.push(task)

    this.setState( {
      currentlyRendering: {
        ...this.state.currentlyRendering,
        cards: newCards
      }
    })
  }

  changeCurrentlyRenderingCards(card){
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

  changeCurrentlyRendering(index){
    this.setState({name: this.state.name, currentlyRendering: this.state.name[index]})
  }

  deleteProject(index){
    const deleteURL = SERVER_URL_PROJECTS + `/${index}`
    fetch(deleteURL, {
      method: "DELETE"
    }).then(() => {
      for (let i = 0; i < this.state.name.length; i++){
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
            pickProject={ this.changeCurrentlyRendering}
            name={ this.state.name }
            projectInFocus={ this.state.currentlyRendering }
            updateTasks={this.changeCurrentlyRenderingTasks}
            updateCards={this.changeCurrentlyRenderingCards}
            deleteProject={this.deleteProject}
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
    this.setState({newProject: event.target.value});
  }

  _handleSubmit(event) {
    console.log(this.state.newProject)
    event.preventDefault();
    this.props.onSubmit( this.state.newProject );
    this.setState({newProject: ''});
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
              <ListItemText
              primary={ p.name} />
               <IconButton aria-label="delete">
                 <DeleteIcon />
               </IconButton>
            </ListItem>

          </div> )}
    </div>
        <CardDeck
          allCards={props.name}
          projectCards={ props.projectInFocus }
          updateTasks={props.updateTasks}
          updateCards={props.updateCards}
        />

  </List>
  );
};

export default Lattice;
