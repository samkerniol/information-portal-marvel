import {useParams, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'

import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './singleComicPage.scss'

const SingleComicPage = () => {
    const {comicId} = useParams(),
        [comic, setComic] = useState(null),

        {loading, error, getItemData, clearError} = useMarvelService()

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError()
        getItemData('comics', comicId).then(onComicLoaded)
    }

    const onComicLoaded = comic => {
        setComic(comic)
    }

    const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error || !comic) ? <View comic={comic}/> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic,
        history = useHistory()

    return (
        <div className="single-comic">
        <img src={thumbnail} alt={title} className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">Language: {language}</p>
            <div className="single-comic__price">{typeof(price) === 'number'? `${price}$` : price}</div>
        </div>
        <a onClick={() => history.goBack()} className="single-comic__back">Back to all</a>
    </div>
    )
}

export default SingleComicPage;