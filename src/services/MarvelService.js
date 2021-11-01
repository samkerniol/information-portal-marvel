import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp(),

        _apiBase = 'https://gateway.marvel.com:443/v1/public/',
        _apiKey = 'apikey=86c58ed3f484a46ec12e92e0d04548ab',
        _baseOffset = 210

    const getAllItemsData = async (get, viewLimit, offset = _baseOffset) => {
        const res = await request(`${_apiBase + get}?limit=${viewLimit}&offset=${offset}&${_apiKey}`)
        return res.data.results.map(item => _transformItemsData(item, get))
    }

    const getItemData = async (id, get) => {
        const res = await request(`${_apiBase + get}/${id}?&${_apiKey}`)
        return _transformItemsData(res.data.results[0])
    }

    const _transformItemsData = (item, get) => {
        if (get === 'comics') {
            return {
                id: item.id,
                title: item.title,
                thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
                price: item.prices[0].price
            }
        }

        return {
            id: item.id,
            name: item.name,
            description: item.description,
            thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
            homepage: item.urls[0].url,
            wiki: item.urls[1].url,
            comics: item.comics.items
        }
    }

    return {loading, error, getAllItemsData, getItemData, clearError}
}

export default useMarvelService