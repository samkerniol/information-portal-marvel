import {Helmet} from 'react-helmet'

import ComicsList from '../comicsList/ComicsList'
import AppBanner from '../appBanner/AppBanner'

const ComicsPage = () => {
    return (
        <>
             <Helmet>
                <meta
                    name="description"
                    content="Pagw with list of our comics"
                />
                <title>Comics page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage