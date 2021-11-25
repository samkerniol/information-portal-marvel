import {useForm} from "react-hook-form"
import {useState, useCallback} from 'react'
import {Link} from 'react-router-dom'

import useMarvelService from '../../services/MarvelService'

import './charSearchForm.scss'
import './media.scss'

const CharSearchForm = () => {
    const {register, formState: {errors}, handleSubmit} = useForm(),
        [charId, setCharId] = useState(''),
        [charName, setCharName] = useState(''),
        {getItemData} = useMarvelService(),
        [valueInput, setValueInput] = useState('')

    const onSubmit = useCallback(value => {
        if (valueInput['name'] === value['name']) {
            return
        }
        
        getItemData('characters', value['name'])
            .then(res => {
                setCharId(res['id'])
                setCharName(res['name'])
            })
            .catch(err => setCharId(null))
            .finally(setValueInput(value))
        // eslint-disable-next-line
    }, [valueInput])

    const renderResult = () => {
        if (charId) {
            return (
                <div className='char__search-btn'>
                    <Link to={`/characters/${charId}`} className='button button__secondary fadeIn'>
                        <div className="inner">TO PAGE</div>
                    </Link>
                    <div className='char__search-msg char__search-msg_found fadeIn'>There is! Visit {charName} page?</div>
                </div>
            )
        } else if (charId === null) {
            return <div className='char__search-msg'>The character was not found. Check the name and try again</div>
        }
    }

    return (
        <form className='char__search' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className='char__search-label'>Or find a character by name:</label>
            <div className='char__search-wrapper'>
                <input 
                    placeholder='Enter name' 
                    className='char__search-input'
                    {...register('name', {required: true, pattern: /^[A-Za-z]/i})}
                />
                <button className='button button__main' type="submit">
                    <div className="inner">FIND</div>
                </button>
                {renderResult()}
            </div>
            {errors.name?.type === 'required' && <div className='char__search-msg'>This field is required!</div>}
            {errors.name?.type === 'pattern' && <div className='char__search-msg'>Only latin letters!</div>}
        </form>
    )
}

export default CharSearchForm