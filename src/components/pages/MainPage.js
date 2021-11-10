import {useState} from 'react'
import {Helmet} from 'react-helmet'

import RandomChar from "../randomChar/RandomChar"
import CharList from "../charList/CharList"
import CharInfo from "../charInfo/CharInfo"
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import CharSearchForm from '../charSearchForm/CharSearchForm'

const MainPage = () => {
    const [selectedChar, setChar] = useState(null)

    const onCharSelected = id => {
        setChar(id)
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>

            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <div style={{position: 'sticky', top: 0}}>
                        <CharInfo charId={selectedChar}/>
                        <CharSearchForm/>
                    </div>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default MainPage