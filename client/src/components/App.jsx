import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: ''
    }
  }

  getJoke() {
    axios.get('https://jokes-api.herokuapp.com/api/joke')
      .then(response => {
        console.log(response);
        this.setState({joke: response.data.value.joke})
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getJoke();
  }
  
  render() {
    return (
      <div>
        <div>{this.state.joke}</div>
        <button onClick={this.getJoke.bind(this)}>New joke</button>
      </div>
    )
  }
}

export default App;