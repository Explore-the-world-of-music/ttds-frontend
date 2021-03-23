import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTimes, faAngleDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Spin from '@semcore/ui/spin'

const MainPage = lazy(() => import('./components/MainPage'))
const LyricsPage = lazy(() => import('./components/LyricsPage'))
const ErrorPage = lazy(() => import('./components/ErrorPage'))

library.add(faSearch, faTimes, faAngleDown, faInfoCircle)

function App () {
    return (
        <Suspense fallback={<div className="spinner-wrapper"><Spin centered size="xxl" theme="invert" /></div> }>
            <Switch>
                <Route path="/" component={MainPage} exact />
                <Route path="/song/:id" component={LyricsPage} />
                <Route component={ErrorPage} />
            </Switch>
        </Suspense>
    )
}

export default App
