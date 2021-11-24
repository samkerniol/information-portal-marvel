import {useState, useEffect, useMemo} from 'react'

import './charList.scss';

import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import decoration from '../../resources/img/vision.png'

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

const CharList = props => {
    const [charList, setCharList] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [charEnded, setCharEnded] = useState(false),
        [charId, setCharId] = useState(''),
        {getAllItemsData, process, setProcess} = useMarvelService()
    
    useEffect(() => {
        onRequest(offset, true)
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true) 
        
        getAllItemsData('characters', 9, offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = newCharList => {
        let ended = false

        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(false)
        setOffset(offset => offset  + 9)
        setCharEnded(ended)
    }

    const eventOnItem = (e, id) => {
        if (e['type'] === 'click' || 'keypress') {
            const target = e.target.closest('.char__item'),
                actives = target.parentNode.getElementsByClassName('char__item_selected')

            if (actives[0]) {
                actives[0].classList.remove('char__item_selected')
                target.classList.add('char__item_selected')
            } else {
                target.classList.add('char__item_selected')
            }

            props.onCharSelected(id)
            setCharId(id)
        }
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const style = {objectFit: item.thumbnail.match(/image_not/) ? 'unset' : 'cover'}
            let fadeIn = process !== 'loading' ? ' fadeIn' : ''

            if (arr.length > 9 && i < arr.length - 9) {
                fadeIn = ''
            }
            
            return (
                <li 
                    key={item.id}
                    className={'char__item' + fadeIn + (item.id === charId ? ' char__item_selected' : '')}
                    tabIndex={0}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            eventOnItem(e, item.id)
                        }
                    }}
                    onClick={e => eventOnItem(e, item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={style}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading)
        // eslint-disable-next-line
    }, [process])

    const display = {display: charEnded || ('loading' === process && !newItemLoading) ? 'none' : 'block'}

    return (
        <>
            <div className="char__list">
                {elements}
                {process !== 'loading' || newItemLoading  ?
                    <button
                        className="button button__main button__long"
                        disabled={newItemLoading}
                        onClick={() => onRequest(offset)}
                    >
                        <div className="inner">load more</div>
                    </button>
                : null}
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" style={display}/>
        </>
    )
}

export default CharList