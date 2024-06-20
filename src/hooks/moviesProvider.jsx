import { useState } from "react";

export function useMovies(inputQuery) {
    const [movies, setMovies] = useState([])

    const getMovies = () => {
        fetch('https://www.omdbapi.com/?apikey=9132bca6&s=' + inputQuery)
            .then(res => res.json())
            .then(json => {
                setMovies(json.Search)
            }).catch(err => {
                alert('Error al recuperar los datos de la API')
            })
    }

    return { movies, getMovies }
}