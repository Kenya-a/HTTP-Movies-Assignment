
import React, { useState } from 'react'
import axios from 'axios'

 const MovieForm = (props) => {

   const id = props.match.params.id
  // console.log('id', id);

   const [movieUpdate, setMovieUpdate] = useState({
    id: id,
    title: "",
    director: "",
    metascore:"",

   });
  const [movieStars, setMovieStars] = useState ({
    stars: []
  })

   const handleChange = (e) => {
    setMovieUpdate({...movieUpdate, [e.target.name]: e.target.value})
    //console.log('movieUpdate', movieUpdate);
  }

   const handleStars = (e) => {
    setMovieStars({...movieStars, [e.target.name]: [e.target.value]})
    console.log('movieStars', movieStars);
  }


   const submitMovie = (e) => {
    e.preventDefault();
    console.log('movieUpdate', movieUpdate);
    console.log('movieStars', movieStars);

     const newMovie = {...movieUpdate, ...movieStars}

     axios
      .put(`http://localhost:5000/api/movies/${id}`, newMovie)
      .catch(error => console.log(error.response))
  }

   return(
    <div className="movie-form">
      <form className="update-form">
      <p>Update Movie Form</p>
        <label>Movie Name</label>
        <input
          type="text"
          name="title"
          value={movieUpdate.title}
          onChange={handleChange}/>

         <label>Movie Director</label>
        <input
          type="text"
          name="director"
          value={movieUpdate.director}
          onChange={handleChange}/>

         <label>Movie Metascore</label>
        <input
          type="text"
          name="metascore"
          value={movieUpdate.metascore}
          onChange={handleChange}/>

         <label>Actors</label>
        <input type="text"
          name="stars"
          value={movieStars.stars}
          onChange={handleStars}/>


         <button type="button" onClick={submitMovie}>Submit Movie!</button>
      </form>
    </div>
    )
  }
export default MovieForm