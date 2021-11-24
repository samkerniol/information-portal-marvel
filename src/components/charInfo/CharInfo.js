import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import useMarvelService from '../../services/MarvelService'
import setContent from '../../utils/setContent'

import './charInfo.scss'

const CharInfo = props => {
    const [char, setChar] = useState(null),
        {getItemData, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        updateChar()
        // eslint-disable-next-line
    }, [props.charId])

    const updateChar = () => {
        if (!props.charId) {
            return
        }

        clearError()
        getItemData('characters', props.charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = char => {
        setChar(char)
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data,

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
                } else {
                    return false
                }
            })
        }
    }

    return (
        <>
            <div className="char__basics fadeIn">
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
            <div className="char__descr fadeIn">
               {!description ? 'For this character not is description.' : description}
            </div>
            <div className="char__comics fadeIn">Comics:</div>
            <ul className="char__comics-list fadeIn">
                {renderComicsList()}
            </ul>
        </>
    )
}

export default CharInfo