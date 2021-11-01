import {useState, useEffect} from 'react'
import useMarvelService from '../../services/MarvelService'

import './comicsCatalog.scss'

import avengers from '../../resources/img/Avengers.png'
import logo from '../../resources/img/Avengers_logo.png'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

const ComicsCatalog = () => {
    const [comicsItems, setComicsItems] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [comicEnded, setComicEnded] = useState(false),

        {loading, error, getAllItemsData} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)  
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true) 
        
        getAllItemsData('comics', 8, offset).then(onComicsItemsLoaded)
    }

    const onComicsItemsLoaded = newComicsItems => {
        let ended = false

        if (newComicsItems.length < 8) {
            ended = true
        }

        setComicsItems(comicsItem => [...comicsItem, ...newComicsItems])
        setNewItemLoading(false)
        setOffset(offset => offset  + 9)
        setComicEnded(ended)
    }

    function renderItems(arr) {
        const items = arr.map(({id, title, thumbnail, price}, i) => {
            const style = {objectFit: thumbnail.match(/image_not/) ? 'contain' : 'cover'}

            return (
                <div className='comics-catalog__item' key={i}>
                    <img className='comics-catalog__thumbnail' src={thumbnail} alt={title} style={style}/>
                    <h1 className='comics-catalog__title'>{title}</h1>
                    <h2 className='comics-catalog__price'>{price}$</h2>
                </div>
            )
        })

        return items
    }

    const items = renderItems(comicsItems),

        errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading && !newItemLoading ? <Spinner/> : null

    return (
        <div className='comics-catalog'>
            {errorMessage}
            {spinner}
            <div className='comics-catalog__items'>
                {items}
            </div>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: comicEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsCatalog