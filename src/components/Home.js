import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Login from './registrations/Login'
import Signup from './registrations/Signup'
import Lattice from './Lattice';

const LOGOUT_URL = 'https://lattice-server.herokuapp.com/logout'


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingLogin: false,
      showingSignup: false,
    }
  }

  handleClick = () => {
    axios.delete(LOGOUT_URL, {withCredentials: true})
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

              <header class="titlebar">
                <h1 class="title">LATTICE: Trello Clone Project</h1>

                <div class="loginbuttons">
                  <Button onClick={ this.toggleLogin } variant="contained" type="submit" placeholder="submit" color="action">
                    Log In
                  </Button>
                  <Button onClick={ this.toggleSignup } variant="contained" type="submit" placeholder="submit" color="secondary">
                    Sign Up
                  </Button>
                </div>
              </header>

              <br></br>

              <div class="login-input">
                { this.state.showingLogin && <Login handleLogin={this.props.handleLogin}/> }
                { this.state.showingSignup && <Signup handleLogin={ this.props.handleLogin }/> }
              </div>
            </div>
        }

        {
          this.props.loggedInStatus
          ? <div>
              <header class="titlebar">
                <div class="title">
                  <h1>LATTICE: Trello Clone Project</h1>
                </div>

                <div class="loginbuttons">
                  <Button
                    variant="contained"
                    to='/logout'
                    onClick={ this.handleClick }>
                    Log Out
                  </Button>
                </div>
              </header>

              <Lattice />
            </div>
          : null
        }
      </div>
    );
  }
};

export default Home;
