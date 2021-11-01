import {useState, useEffect} from 'react'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'

const RandomChar = () => {
    const [char, setChar] = useState({}),
        {loading, error, getItemData, clearError} = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [])

    const updateChar = () => {
        clearError()

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getItemData('characters', id).then(onCharLoaded)
    }

    const onCharLoaded = char => {
        setChar(char)
    }

    const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error) ? <View char={char}/> : null

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char

    let style

    const descr = () => {
        if (!description) {
            return 'For this character not is description.'
        } else if (description.length >= 228) {
            return description.substr(0, 228) + '...'
        } else {
            return description
        }
    }

    if (thumbnail) {
        style = {objectFit: thumbnail.match(/image_not/) ? 'contain' : 'cover'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={{objectFit: style}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {descr()}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar