import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'

import ErrorMessage from "../errorMessage/ErrorMessage"

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content='Page not found'
                />
                <title>Page not found</title>
            </Helmet>
            <ErrorMessage/>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10}}>Page doesn't exist</p>
            <Link style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginTop: 30}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404