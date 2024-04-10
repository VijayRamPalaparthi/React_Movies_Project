import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieItem from "../MovieItem"
import Header from '../Header'
import './index.css'



class UpComingRoute extends Component {
    state={moviesList:[], moviesApiStatus:"intial"}

    componentDidMount = () => {
        this.getMovies()
    }

    getMovies=async()=>{
        const Api_key= "11f4cc8a2ddf36eb6a332d37520e0d48"
        const url=`https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=1`
        const fetchedData = await fetch(url)
        const data= await fetchedData.json()
        console.log(fetchedData)
        console.log(data)

        if (fetchedData.ok) {
            const updatedData = data.results.map(each => ({
              backdropImageUrl: each.backdrop_path,
              id: each.id,
              overview: each.overview,
              posterUrl: each.poster_path,
              title: each.title,
              rating:each.vote_average
            }))
            this.setState({
              moviesList: updatedData,
              moviesApiStatus: 'success',
            })
          } else {
            this.setState({moviesApiStatus: 'failure'})
          }
    }


    renderLoadingView = () => (
        <div className="popular-loader-container" testid="loader">
          <Loader type="TailSpin" color="red" height={50} width={50} />
        </div>
      )

    renderSuccessView=()=>{
        const{moviesList}=this.state
        return (
            <ul className="popular-videoItem-container">
              {moviesList.map(each => (
                <MovieItem movieData={each} key={each.id} />
              ))}
            </ul>
          )
    }
        
    switchMovies = () => {
        const {moviesApiStatus} = this.state
        switch (moviesApiStatus) {
          case 'loader':
            return this.renderLoadingView()
    
          case 'success':
            return this.renderSuccessView()
    
          case 'failure':
            return this.renderFailureView()
    
          default:
            return null
        }
      }

    render(){
        return(
            <div className='home-bg-container'>
                <Header isUpcoming/>
                {this.switchMovies()}     
            </div>
        )
    }

}

export default UpComingRoute