import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss'

const CharInfo = props => {
    const [char, setChar] = useState(null),
        [loading, setLoading] = useState(false),
        [error, setError] = useState(false),

        marvelService = new MarvelService()

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        if (!props.charId) {
            return
        }

        onCharLoading()

        marvelService.getCharacter(props.charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoading = () => {
        setLoading(true)
    }

    const onCharLoaded = char => {
        setLoading(false)
        setChar(char)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const skeleton = char || loading || error ? null : <Skeleton/>,
        errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error || !char) ? <View char={char}/> : null

    
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char,

        objFit = thumbnail.match(/image_not/) ? 'contain' : 'cover'

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{objectFit: objFit}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {!description ? 'For this character not is description.' : description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'Comics with this character is not.' : null}
                {
                    // eslint-disable-next-line
                    comics.map((item, i) => {
                        if (i < 10) {
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo