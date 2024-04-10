import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieData} = props
  const {id, title, posterUrl,rating} = movieData
  const imageUrl=`https://image.tmdb.org/t/p/w500/${posterUrl}`

  return (
    <li className="movie-item">
      <Link to={`/movies/${id}`}>
        <img src={imageUrl} alt={title} className="movie-item-image" />
      </Link>
      <p className='movies-title'>{title}</p>
      <p className='movies-title'>Rating: {Math.round(rating,1)}</p>
    </li>
  )
}

export default MovieItem