import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import useMarvelService from '../../services/MarvelService'
import SingleComicLayout from './singleComicLayout/SingleComicLayout'
import SingleCharacterLayout from './singleCharacterLayout/SingleCharacterLayout'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

const SinglePage = () => {
    const {id} = useParams(),
        [data, setData] = useState(null),
        {loading, error, getItemData, clearError} = useMarvelService(),
        category = id.length === 7 ? 'characters' : 'comics'

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError()
        getItemData(category, id).then(onDataLoaded)
    }

    const onDataLoaded = data => {
        setData(data)
    }

    const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        page = category === 'characters' ? <SingleCharacterLayout data={data}/> : <SingleComicLayout data={data}/>,
        content = !(loading || error || !data) ? page : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage