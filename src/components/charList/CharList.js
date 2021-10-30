import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import './charList.scss';
import MarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

const CharList = props => {
    const [charList, setCharList] = useState([]),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(false),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [charEnded, setCharEnded] = useState(false),

        marvelService = new MarvelService()
    
    useEffect(() => {
        onRequest()  
    }, [])

    const onRequest = offset => {
        onCharListLoading()
        
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onCharListLoaded = newCharList => {
        let ended = false

        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        setLoading(false)
        setNewItemLoading(false)
        setOffset(offset => offset  + 9)
        setCharEnded(ended)
    }

    const onError = () => {
        setError(true)
        setLoading(false)
    }

    const FocusOnItem = elem => {
        elem.target.parentNode.childNodes.forEach(item => item.classList.remove('char__item_selected'))
        elem.target.classList.add('char__item_selected')
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            const objFit = item.thumbnail.match(/image_not/) ? 'unset' : 'cover';
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    onFocus={elem => {
                        props.onCharSelected(item.id)
                        FocusOnItem(elem)
                    }}
                    key={item.id}
                    onClick={() => props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={{objectFit: objFit}}/>
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
    
    const items = renderItems(charList),

        errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error) ? items : null

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList