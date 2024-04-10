import {Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {
    isHome,
    isTopRated,
    isUpcoming,
    onChangeSearch,
    isSearch,
    search,
    searchText,
    onKeyPress
  } = props
  const home = isHome ? 'header-name home-active' : 'header-name'
  const toprate = isTopRated ? 'header-name home-active' : 'header-name'
  const upcoming= isUpcoming ? 'header-name home-active' : 'header-name'

  const onChangeSearchInput = event => {
    onChangeSearch(event.target.value)
  }
  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left-part">
          <Link to="/" className="link-container">
            <h1
              className="header-logo"
            > MovieDb </h1>
          </Link>
          <ul className="header-list">
            <Link to="/" className="link-container">
              <li className={home}>Popular</li>
            </Link>

            <Link to="/top_rated" className="link-container">
              <li className={toprate}>TopRated</li>
            </Link>

            <Link to="/upcoming" className="link-container">
              <li className={upcoming}>Upcoming</li>
            </Link>
          </ul>
        </div>

        <div className="header-right-part">
        {isSearch && (
            <div className="search-container search-large">
              <input
                type="search"
                value={searchText}
                className="search"
                placeholder="Search"
                onChange={onChangeSearchInput}
                onKeyPress={onKeyPress}
              />
            </div>
          )}
          
          <Link to="/search">
            <button
              className="search-button"
              type="button"
              onClick={search}
            >
            search
            </button>
          </Link>
        </div>
      </div>

      {isSearch && (
        <div className="search-container search-md">
          <input
            type="search"
            value={searchText}
            className="search"
            placeholder="Search"
            onChange={onChangeSearchInput}
            onKeyPress={onKeyPress}
          />
        </div>
      )}
     
     
    </div>
  )
}

export default Header