import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import MovieItem from '../MovieItem'

class SearchRoute extends Component {
  state = {
    searchResultMoviesList: [],
    resultApiStatus: 'initial',
    searchText: '',
  }

  onChangeSearchText = text => {
    if (text === '') {
      this.setState({searchText: text}, this.getSearchedMovies)
      //  this.setState({searchText: text}, this.getSearchedMovies())  --> don't write like this
    } else {
      this.setState({searchText: text})
    }
  }

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.getSearchedMovies()
    }
  }

  onClickSearchButton = () => {
    this.getSearchedMovies()
  }

  componentDidMount = () => {
    this.getSearchedMovies()
  }

  getSearchedMovies = async () => {
    const {searchText} = this.state
    const Api_key="11f4cc8a2ddf36eb6a332d37520e0d48"
    this.setState({resultApiStatus: 'loader'})
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${searchText}&page=1`

    const fetchedData = await fetch(url)

    const data = await fetchedData.json()
    if (fetchedData.ok) {
      const updatedData = data.results.map(each => ({
        backdropImageUrl: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterUrl: each.poster_path,
        title: each.title,
      }))
      this.setState({
        searchResultMoviesList: updatedData,
        resultApiStatus: 'success',
      })
    } else {
      this.setState({resultApiStatus: 'failure'})
    }
  }

  renderSearchResultSuccessView = () => {
    const {searchResultMoviesList} = this.state
    const moviesCount = searchResultMoviesList.length

    if (moviesCount === 0) {
      return (
        <div className="no-result-view-container">
          
          <p className="no-result-text">
            {`
          Enter the text in Search box for searching.`}
          </p>
        </div>
      )
    }

    return (
      <ul className="search-videoItem-container">
        {searchResultMoviesList.map(each => (
          <MovieItem movieData={each} key={each.id} />
        ))}
      </ul>
    )
  }

  retryPopular = () => {
    this.getSearchedMovies()
  }

  renderFailureView = () => (
    <div className="popular-failure-container">
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
          onClick={this.retryPopular}
        >
          Try Again{' '}
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  switchSearchResult = () => {
    const {resultApiStatus} = this.state
    switch (resultApiStatus) {
      case 'loader':
        return this.renderLoadingView()

      case 'success':
        return this.renderSearchResultSuccessView()

      case 'failure':
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {searchText} = this.props
    return (
      <div className="popular-bg-container">
        <Header
          isSearch
          onChangeSearch={this.onChangeSearchText}
          search={this.onClickSearchButton}
          searchText={searchText}
          onKeyPress={this.onKeyPress}
        />
        {this.switchSearchResult()}
      </div>
    )
  }
}

export default SearchRoute