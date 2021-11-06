import {useState, useEffect} from 'react'
import useMarvelService from '../../services/MarvelService'
import setContent from '../../utils/setContent'

import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'

const RandomChar = () => {
    const [char, setChar] = useState({}),
        {getItemData, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        updateChar()
        // eslint-disable-next-line
    }, [])

    const updateChar = () => {
        clearError()

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getItemData('characters', id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = char => {
        setChar(char)
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar} disabled={process === 'loading'}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data

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