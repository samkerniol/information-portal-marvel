import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import './charList.scss';
import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

const CharList = props => {
    const [charList, setCharList] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [charEnded, setCharEnded] = useState(false),
        {loading, error, getAllItemsData} = useMarvelService()
    
    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true) 
        
        getAllItemsData('characters', 9, offset).then(onCharListLoaded)
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

    const FocusOnItem = elem => {
        elem.target.parentNode.childNodes.forEach(item => item.classList.remove('char__item_selected'))
        elem.target.classList.add('char__item_selected')
    }

    function renderItems(arr) {
        const items = arr.map(item => {
            const style = {objectFit: item.thumbnail.match(/image_not/) ? 'unset' : 'cover'}
            
            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li 
                        className="char__item"
                        tabIndex={0}
                        onFocus={elem => {
                            props.onCharSelected(item.id)
                            FocusOnItem(elem)
                        }}
                        onClick={() => props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={style}/>
                        <div className="char__name">{item.name}</div>
                    </li>
            </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    
    const items = renderItems(charList),

        errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading && !newItemLoading ? <Spinner/> : null

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: charEnded || spinner ? 'none' : 'block'}}
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