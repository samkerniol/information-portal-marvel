import {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'

import './comicsList.scss'

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
        case 'confirmed':
            return <Component/>
        default:
            return <ErrorMessage/>
    }
}

const ComicsList = () => {
    const [comicsItems, setComicsItems] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [comicEnded, setComicEnded] = useState(false),
        {pathname} = useLocation(),
        {getAllItemsData, process, setProcess} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true) 

        getAllItemsData('comics', 8, offset)
            .then(onComicsItemsLoaded)
            .then(() => setProcess('confirmed'))
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
            return (
                <li className='comics__item' key={i}>
                    <Link to={`/comics/${id}`}>
                        <img className='comics__item-thumbnail' src={thumbnail} alt={title}/>
                        <h1 className='comics__item-title'>{title}</h1>
                        <h2 className='comics__item-price'>{price}$</h2>
                    </Link>
                </li>
            )
        })

        return (
            <ul className='comics__items'>
                {items}
            </ul>
        )
    }

    return (
        <div className='comics' style={{display: pathname !== '/comics' ? 'none' : 'block'}}>
            {setContent(process, () => renderItems(comicsItems), newItemLoading)}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: comicEnded || ('loading' === process && !newItemLoading) ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList