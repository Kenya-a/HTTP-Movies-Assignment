import React, {useState, useEffect} from 'react';

import axios from 'axios';

const MovieForm = ({list, setList, postEdit, setPostEdit, editPost}) => {
    const [post, setPost] = useState({title: '', director: '', metascore: '', actors: ''})

    useEffect (() => {
        if (postEdit) {
            setPost(postEdit)
        }
    }, [postEdit])

    const handleChange = e => {
        const updatePost = {
            ...post, 
            [e.target.name]: e.target.value
        };
        setPost(updatePost)
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(postEdit) {
            editPost(post);
            setPostEdit(null);
        }else if (
            post.title !== '' &&
            post.director !== '' &&
            post.metascore !== '' &&
            post.actors !== ''
        ) {
            const sendPost = () => {
                axios.post(`http://localhost:5000/api/movies`, {
                    title: post.title,
                    director: post.director,
                    metascore: post.metascore,
                    actors: post.actors
                })
                .then(response => {
                    console.log(response)
                    setList([response.data, ...list])
                })
                .catch(error => {
                    console.log(error)
                })
            }
            sendPost();
        }
    }
    return(
        <form onSubmit = {handleSubmit}>
            <legend>{postEdit ? 'Edit Movie': 'Edit Movie'}</legend>
            <label> 
                Title:{" "}
                <input type = 'text' name = 'title' value = {post.title} onChange = {handleChange}/>
            </label>

            <label>
                Director:{" "}
                <input type = 'text' name = 'director' value = {post.director} onChange = {handleChange}/>
            </label>

            <label>
                Metascore:{" "}
                <input type = 'text' name = 'metascore' value = {post.metascore} onChange = {handleChange}/>
            </label>

            <label>
                Actors:{" "}
                <input type = 'text' name = 'actors' value = {post.actors} onChange = {handleChange}/> 
            </label>

            <button type = 'submit' value = 'submit' onSubmit ={handleSubmit}>Submit</button>
        </form>
    );
}

export default MovieForm;
