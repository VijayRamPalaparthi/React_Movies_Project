import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class MovieItemDetail extends Component {
  state = {
    movieItemDetail: {},
    movieDetailApiStatus: 'initial',
    castList: [],
  
  }

  componentDidMount = () => {
    this.getMovieDetail()
  }

  getMovieDetail = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const Api_key="11f4cc8a2ddf36eb6a332d37520e0d48"
    this.setState({movieDetailApiStatus: 'loader'})
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${Api_key}&language=en-US`
    const fetchedData = await fetch(url)
    const data = await fetchedData.json()

    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${Api_key}&language=en-US`
    const fetchedCastData = await fetch(castUrl)
    const castData = await fetchedCastData.json()

    console.log(data)
    if (fetchedData.ok) {
      const moviesObject = data
      const updatedObject = {
        adult: moviesObject.adult,
        budget: moviesObject.budget,
        genresList: moviesObject.genres,
        backdropImageUrl: moviesObject.backdrop_path,
        id: moviesObject.id,
        overview: moviesObject.overview,
        posterUrl: moviesObject.poster_path,
        title: moviesObject.title,
        runtime: moviesObject.runtime,
        releaseDate: moviesObject.release_date,
        ratingAverage: moviesObject.vote_average,
        ratingCount: moviesObject.vote_count,
      }

      const cast=castData.cast
      const updatedCastList = cast.map(
        each => ({
          profileUrl: each.profile_path,
          id: each.id,
          character: each.character,
          name: each.name,
        }),
      )
      console.log(updatedCastList)
      this.setState({
        movieItemDetail: updatedObject,
        movieDetailApiStatus: 'success',
        castList: updatedCastList,
      })
    } else {
      this.setState({movieDetailApiStatus: 'failure'})
    }
  }

  renderMovieItemSuccessView = () => {

    return (
      <div className="slider-container">
        {this.renderBannerSuccessView()}
        {this.renderCast()}
        
      </div>
    )
  }


  renderBannerSuccessView = () => {
    const {movieItemDetail} = this.state
    const time = movieItemDetail.runtime / 60
    const timeInHr = parseInt(time)
    const timeInMin = parseInt((time - timeInHr) * 60)

    const date = new Date(movieItemDetail.releaseDate)
    const year = date.getFullYear()
    const image=`https://image.tmdb.org/t/p/w500/${movieItemDetail.posterUrl}`

    return (
      <div
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieItemDetail.backdropImageUrl})`}}
        className="banner-image-container"
      >
        <div className='banner-top-container'>
          <img src={image} alt="poster" className='poster'/>

          <div className="banner-content">
            <h1 className="banner-content-heading">{movieItemDetail.title}</h1>
            <div className="movie-details-container">
              <h1 className='rate'>Rating: {movieItemDetail.ratingAverage}</h1>
              <p className="time">
                {timeInHr}h {timeInMin}m
              </p>
              <p className="time">{year}</p>
              <h1 className='date'>Release Date: {movieItemDetail.releaseDate}</h1>
            </div>
          </div>
        </div>
        

        <h1 className='banner-content-heading'> overview </h1>
        <p className="banner-content-desc">{movieItemDetail.overview}</p>
        
      </div>
    )
  }

  renderCast=()=>{
    const{castList}=this.state
    return(
      <div>
        <h1 className="banner-content-heading"> Cast </h1>
      <ul className='cast-list-container'>
        {castList.map(each=>{
          const image=`https://image.tmdb.org/t/p/w500/${each.profileUrl}`
          return(
          <li>
            <img src={image} alt={each.name} className='cast-image'/>
            <p className='name'>{each.name}</p>
            <p className='name'>character: {each.character}</p>
          </li>
          )
      }
        )}
      </ul>
      </div>
      
    )
    
  }

  retryOriginal = () => {
    this.getMovieDetail()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <div className="failure-desc-container">
        <img
          src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670002135/Movies%20App/Failure_l6kgfg.png"
          alt="failure view"
          className="failure-image"
        />
        <p className="failure-content">
          Something went wrong. Please try again
        </p>
        <button
          className="try-button"
          type="button"
          onClick={this.retryOriginal}
        >
          Try Again{' '}
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <>
      <div className="banner-loader-container" >
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  switchMovieItem = () => {
    const {movieDetailApiStatus} = this.state
    switch (movieDetailApiStatus) {
      case 'loader':
        return this.renderLoadingView()

      case 'success':
        return this.renderMovieItemSuccessView()

      case 'failure':
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header/>
        {this.switchMovieItem()}
        
      </div>
    )
  }
}

export default MovieItemDetail