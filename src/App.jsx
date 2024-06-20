import { useEffect, useState } from 'react'
import './App.css'
import { useRef } from 'react' //un método para recuperar datos del input del formulario

function App() {
  const inputRef = useRef() //alternativa para recuperar datos
  const [inputQuery, setQuery] = useState('')
  const [movies, setMovies] = useState()
  const hasMovies = movies?.length > 0
  const isFirstInput = useRef(true)
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const getMovies = () => {
    fetch('https://www.omdbapi.com/?apikey=9132bca6&s=' + inputQuery)
      .then(res => res.json())
      .then(json => {
        setMovies(json.Search)
      }).catch(err => {
        alert('Error al recuperar los datos de la API')
      })
  }

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = inputQuery == ''
      return
    }

    if (inputQuery == '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (inputQuery.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (inputQuery.length < 3) {
      setError('La búsqueda debe contar con al menos tres carácteres')
      return
    }

    setError(null)
  }, [inputQuery])

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={inputQuery} name='query' placeholder='Barra de búsqueda' />
          <button className='boton' type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }} className='error'>{error}</p>}
      </header>
      <main>
        {
          hasMovies ?
            (
              <ul className='movies'>
                {movies.map(movie => (
                  <li className='movie' key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt='Poster correspondiente a la película' />
                  </li>
                ))}
              </ul>
            )
            : (<p>No hay películas</p>)

        }
      </main>
    </div>
  )
}

export default App
