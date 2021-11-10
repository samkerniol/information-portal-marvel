import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

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
        {getAllItemsData, process, setProcess} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true) 

        getAllItemsData('comics', 8, offset)
            .then(onComicsItemsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsItemsLoaded = newComicsItems => {
        setComicsItems(comicsItem => [...comicsItem, ...newComicsItems])
        setNewItemLoading(false)
        setOffset(offset => offset  + 9)
    }

    function renderItems(arr) {
        const items = arr.map(({id, title, thumbnail, price}, i) => {
            let fadeIn = process !== 'loading' ? ' fadeIn' : ''

            if (arr.length > 8 && i < arr.length - 8) {
                fadeIn = ''
            }

            return (
                <li className={'comics__item' + fadeIn} key={i}>
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
        <div className='comics'>
            {setContent(process, () => renderItems(comicsItems), newItemLoading)}
            {process !== 'loading' || newItemLoading ?
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            : null}
        </div>
    )
}

export default ComicsList