import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss'

const CharInfo = props => {
    const [char, setChar] = useState(null),
        {loading, error, getItemData, clearError} = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        if (!props.charId) {
            return
        }

        clearError()
        getItemData('characters', props.charId).then(onCharLoaded)
    }

    const onCharLoaded = char => {
        setChar(char)
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

        style = {objectFit: thumbnail.match(/image_not/) ? 'contain' : 'cover'}

    const renderComicsList = () => {
        if (comics.length === 0 ) {
            return 'Comics with this character is not.'
        } else {
            return comics.map((comic, i) => {
                if (comic) {
                    let id = comic['resourceURI'].substr(comic['resourceURI'].indexOf('comics/') + 'comics/'.length)

                    return (
                        <li key={i} className="char__comics-item">
                            <Link to={`/comics/${id}`}>{comic.name}</Link>
                        </li>
                    )
                }
            })
        }
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={style}/>
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
                {renderComicsList()}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo