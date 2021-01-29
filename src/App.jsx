import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Error from './components/Error'
import MainPage from './components/MainPage'
import LyricsPage from './components/LyricsPage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTimes, faAngleDown} from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faTimes, faAngleDown);

function App() {
  return (
      <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/song/:id" component={LyricsPage} />
          <Route component={Error} />
      </Switch>
  )
}

export default App;