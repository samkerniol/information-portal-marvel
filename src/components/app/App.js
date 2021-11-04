import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader"
import Spinner from '../spinner/Spinner'

const Page404 = lazy(() => import('../pages/404')),
    MainPage = lazy(() => import('../pages/MainPage')),
    ComicsPage = lazy(() => import('../pages/ComicsPage')),
    SingleComicPage = lazy(() => import('../pages/SingleComicPage'))

const App = () => {
    return (
       <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>

                            <Route path="/comics">
                                <ComicsPage/>

                                <Route path="/comics/:comicId">
                                    <SingleComicPage/>
                                </Route>
                            </Route>
                            
                            <Route path="*">
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
       </Router>
    )
}

export default App