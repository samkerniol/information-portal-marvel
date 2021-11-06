import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import useMarvelService from '../../services/MarvelService'
import setContent from '../../utils/setContent'

import SingleComicLayout from './singlePagesLayout/SingleComicLayout'
import SingleCharacterLayout from './singlePagesLayout/SingleCharacterLayout'

const SinglePage = () => {
    const {id} = useParams(),
        [data, setData] = useState(null),
        {getItemData, clearError, process, setProcess} = useMarvelService(),
        category = id.length === 7 ? 'characters' : 'comics'

    useEffect(() => {
        updateData()
        // eslint-disable-next-line
    }, [id])

    const updateData = () => {
        clearError()
        getItemData(category, id)
            .then(onDataLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onDataLoaded = data => {
        setData(data)
    }

    const component = category === 'characters' ? <SingleCharacterLayout data={data}/> : <SingleComicLayout data={data}/>

    return (
        <>
            {setContent(process, () => component, data)}
        </>
    )
}

export default SinglePage