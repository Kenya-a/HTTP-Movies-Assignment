import React, { Component } from 'react';
import axios from 'axios';
class AddMovie extends Component {
  state = {
    title: '',
    director: '',
    metascore: '',
    actor: '',
    stars: []
  };

  handleAddstars = () => {
    const { stars } = this.state;
    stars.push(this.state.actor);
    this.setState({ actor: '', stars });
  };

  handleTextInput = e => {
    //console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitMovie = () => {
    const { stars, title, metascore, director } = this.state;
    const newMovie = { stars, title, metascore, director };
    const saveMovie = axios
      .post('http://localhost:5000/api/movies', newMovie)
      .then(response => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className = 'add-movie'>
        Add a New Movie
        <input
          type="text"
          placeholder="Movie Title"
          value={this.state.title}
          onChange={this.handleTextInput}
          name="title"
        />
        <input
          type="text"
          placeholder="Director"
          value={this.state.director}
          onChange={this.handleTextInput}
          name="director"
        />
        <input
          type="text"
          placeholder="Meta Score"
          value={this.state.metascore}
          onChange={this.handleTextInput}
          name="metascore"
        />
        <input
          type="text"
          placeholder="..Add actor"
          value={this.state.actor}
          onChange={this.handleTextInput}
          name="actor"
        />
        <button onClick={this.handleAddstars}>Add Actor to List</button>
        <button onClick={this.handleSubmitMovie}>Add New Movie</button>
        {this.state.stars.map(actor => {
          return <div>{actor}</div>;
        })}
      </div>
    );
  }
}

export default AddMovie;