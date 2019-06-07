import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.cache = {};
    this.state = {
      joke: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.getRandomID = this.getRandomID.bind(this);
    this.getJoke = this.getJoke.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  getRandomID(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  getJoke(id) {
    const jokeID = id || this.getRandomID();
    if (this.cache.hasOwnProperty(jokeID)) {
      this.setState({joke: this.cache[jokeID]})
    } else {
      axios.get(`https://jokes-api.herokuapp.com/api/joke/${jokeID}`)
        .then(response => {
          console.log(this.cache);
          this.cache[jokeID] = response.data.value.joke;
          this.setState({joke: response.data.value.joke})
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  componentDidMount() {
    this.getJoke();
    // setInterval(this.getJoke, 10000);
  }
  
  handleClick() {
    this.getJoke();
  }

  handleInput() {
    const id = document.getElementById('jokeIDinput').value;
    this.getJoke(id);
  }

  render() {
    return (
      <div>
        <div>{this.state.joke}</div>
        <input id='jokeIDinput' placeholder='Insert joke ID'/>
        <button onClick={this.handleInput}>Get this joke</button>
        <button onClick={this.handleClick}>New joke</button>
      </div>
    )
  }
}

export default App;