import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader"
import Spinner from '../spinner/Spinner'

const Page404 = lazy(() => import('../pages/404')),
    MainPage = lazy(() => import('../pages/MainPage')),
    ComicsPage = lazy(() => import('../pages/ComicsPage')),
    SinglePage = lazy(() => import('../pages/SinglePage'))

const App = () => {
    return (
       <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            <Route exact path="/characters/:id" component={SinglePage}/>
                            <Route exact path="/comics" component={ComicsPage}/>
                            <Route exact path="/comics/:id" component={SinglePage}/>
                            <Route path="*" component={Page404}/>
                        </Switch>
                    </Suspense>
                </main>
            </div>
       </Router>
    )
}

export default App