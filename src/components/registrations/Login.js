import React, { Component } from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';

const LOGIN_URL = 'https://lattice-server.herokuapp.com/login'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: 'aaa@ga.co',
      password: 'chicken',
      errors: ''
     };
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }

  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    };

  handleSubmit = (event) => {
      event.preventDefault()
      const {username, email, password} = this.state
      let user = {
        username: username,
        email: email,
        password: password
      }

  axios.post(LOGIN_URL, {user}, {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data)
          this.redirect()
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))
    };

  redirect = () => {
      this.props.history.push('/')
    }

  handleErrors = () => {
      return (
        <div>
          <ul>
          {this.state.errors.map(error => {
          return <li key={error}>{error}</li>
            })}
          </ul>
        </div>
      )
    }

render() {
    const {/*name,*/ email, password} = this.state
  return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <Button variant="contained" type="submit" placeholder="submit" color="action">
            Log In
          </Button>
         </form>
         <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}

export default Login;
