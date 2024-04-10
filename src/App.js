import { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import TopRatedRoute from "./components/TopRatedRoute"
import UpComingRoute from './components/UpComingRoute'
import MovieItemDetail from './components/MovieItemDetailRoute';
import SearchRoute from './components/SearchRoute';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomeRoute} />
        <Route exact path="/top_rated" component={TopRatedRoute} />
        <Route exact path="/upcoming" component={UpComingRoute} />
        <Route exact
          path="/movies/:id"
          component={MovieItemDetail} />
        <Route exact path="/search" component={SearchRoute}/>  
      </Switch>
    )
  }
}

export default App;

