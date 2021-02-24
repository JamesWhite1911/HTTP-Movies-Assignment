import React from 'react'

export default function UpdateMovie(props) {
    const { movies } = props;

    const initialData = {
        director: "",
        id: "",
        metascore: "",
        stars: [],
        title: ""
    }

    const handleSubmit = () => {
        console.log("submitted")
    }

    return (
        <div className="update-movie">
            <form>
            <input placeholder="Title"></input>
            <input placeholder="Director"></input>
            <input placeholder="Metascore"></input>
            <input placeholder="Stars"></input>
            </form>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}