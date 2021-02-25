import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    // stars: ["data", "data", "data"],
}

const MovieForm = props => {
    const [movie, setMovie] = useState(initialMovie)
    const id = props.movies.length + 1;
    const { push } = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleChange = e => {
        e.persist();
        let value = e.target.value;
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(id)
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                props.setMovieList(res.data)
                push(`/movies/${id}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="add-movie">
            <h2>Add Movie</h2>
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
                    value={movie.stars}
                /> */}
                <button>Submit</button>
            </form>
        </div>
    );
}

export default MovieForm;