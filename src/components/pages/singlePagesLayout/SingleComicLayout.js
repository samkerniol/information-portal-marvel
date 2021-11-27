import {useHistory} from "react-router"
import {Helmet} from 'react-helmet'

import './singlePageLayout.scss'
import './media.scss'

const SingleComicLayout = ({data}) => {
    const {title, description, pageCount, thumbnail, language, price} = data,
        history = useHistory()

    return (
        <div className="single-page fadeIn">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-page__img"/>
            <div className="single-page__info">
                <h2 className="single-page__name">{title}</h2>
                <p className="single-page__descr">{description}</p>
                <p className="single-page__descr">{pageCount}</p>
                <p className="single-page__descr">Language: {language}</p>
                <div className="single-page__price">{typeof(price) === 'number'? `${price}$` : price}</div>
            </div>
            <button onClick={() => history.goBack()} className="single-page__back">Back</button>
        </div>
    )
}

export default SingleComicLayout