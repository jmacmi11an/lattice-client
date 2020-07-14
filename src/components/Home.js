import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Login from './registrations/Login'
import Signup from './registrations/Signup'
import Lattice from './Lattice';



class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingLogin: false,
      showingSignup: false,
    }
  }

    handleClick = () => {
      axios.delete('http://localhost:3000/logout', {withCredentials: true})
       .then(response => {
         this.props.handleLogout()
         this.props.history.push('/')
       })
     .catch(error => console.log(error))
    }

    toggleSignup = () => this.setState({showingSignup: true, showingLogin: false })
    toggleLogin = () => this.setState({showingSignup: false, showingLogin: true })


  render() {
  return (

      <div>
        {
          this.props.loggedInStatus
          ? null
          :  <div>
              <Button onClick={ this.toggleLogin } variant="contained" type="submit" placeholder="submit" color="primary">
                Log In
              </Button>
              <Button onClick={ this.toggleSignup } variant="contained" type="submit" placeholder="submit" color="secondary">
                Sign Up
              </Button>
              <br></br>
              { this.state.showingLogin && <Login handleLogin={this.props.handleLogin}/> }
              { this.state.showingSignup && <Signup handleLogin={ this.props.handleLogin }/> }
            </div>
        }

        {
          this.props.loggedInStatus
          ? <div>
              <Button variant="contained" to='/logout' onClick={this.handleClick}>Log Out</Button>
              <Lattice />
            </div>
          : null
        }
      </div>
    );
  }
};

export default Home;

// I want to put this on line 33 conditionally
// <Login />
// <Signup />


//I need to handle the click event for eithe the login or signup buttons.
//They will need to be two different buttons, onLogin and onSignup
//Will I need to create a boolean? in a state that starts as false, and when true renders the next component?
