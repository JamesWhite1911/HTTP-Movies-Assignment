import axios from 'axios';
import React, { useEffect, useState } from 'react'

const initialMovie = {
    director: "",
    id: '',
    metascore: "",
    stars: [],
    title: ""
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie)
    const id = props.match.params.id;

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log("response: ", res.data)
                setMovie(res.data)
                console.log("movie: ", movie)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                setMovie(res.data)
                props.history.push(`/movies/${id}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="update-movie">
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                value={movie.title}
                />
                <input 
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director"
                value={movie.director}
                />
                <input 
                type="text"
                name="metascore"
                onChange={handleChange}
                placeholder="Metascore"
                value={movie.metascore}
                />
                {/* <input 
                type="text"
                name="stars"
                onChange={handleChange}
                placeholder="Stars"
                /> */}
            <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie;