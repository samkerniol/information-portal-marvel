import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages'

import AppHeader from "../appHeader/AppHeader"

const App = () => {
    return (
       <Router>
            <div className="app">
                <AppHeader/>
                <main>
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
                </main>
            </div>
       </Router>
    )
}

export default App