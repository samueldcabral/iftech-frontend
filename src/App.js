import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Artists from './components/Artists'
import Albums from './components/Albums'
import Songs from './components/Songs'
import Lyrics from './components/Lyrics'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Artists} />
          <Route path="/albums/:artistId" exact component={Albums} />
          <Route path="/songs/:albumId/:artistId" exact component={Songs} />
          <Route path="/lyrics/:artist/:song" exact component={Lyrics} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
