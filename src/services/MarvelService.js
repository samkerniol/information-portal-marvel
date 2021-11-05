import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp(),

        _apiBase = 'https://gateway.marvel.com:443/v1/public/',
        _apiKey = 'apikey=86c58ed3f484a46ec12e92e0d04548ab',
        _baseOffset = 210

    const getAllItemsData = async (get, viewLimit, offset = _baseOffset) => {
        const res = await request(`${_apiBase + get}?${viewLimit ? 'limit=' + viewLimit : ''}&offset=${offset}&${_apiKey}`)
        return res.data.results.map(item => _transformItemsData(get, item))
    }

    const getItemData = async (get, id) => {
        if (typeof(id) === 'number' || id.match(/\d/)) {
            id = `/${id}?`
        } else {
            id = `?name=${id.replace(' ', '%20')}`
        }

        const res = await request(`${_apiBase + get}${id}&${_apiKey}`)
        return _transformItemsData(get, res.data.results[0])
    }

    const _transformItemsData = (get, item) => {
        if (get === 'comics') {
            return {
                id: item.id,
                title: item.title,
                description: item.description || 'There is no description',
                pageCount: item.pageCount ? `${item.pageCount} p.` : 'No information about the number of pages',
                thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
                language: item.textObjects.language || 'en-us',
                price: item.prices[0].price || 'not available'
            }
        } else {
            let comicsData = []

            if (item.comics.items.length !== 0) {
                for (let i = 0; i < 10; i++) {
                    comicsData.push(item.comics.items[i])
                }
            }

            return {
                id: item.id,
                name: item.name,
                description: item.description,
                thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
                homepage: item.urls[0].url,
                wiki: item.urls[1].url,
                comics: comicsData
            }   
        }
    }

    return {loading, error, getAllItemsData, getItemData, clearError}
}

export default useMarvelService