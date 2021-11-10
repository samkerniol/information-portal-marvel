import {useHistory} from "react-router"
import {Helmet} from 'react-helmet'

import './singlePageLayout.scss'

const SingleCharacterLayout = ({data}) => {
    const {name, description, thumbnail} = data,
        history = useHistory()

    return (
        <div className="single-page fadeIn">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} characters information`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-page__img single-page__img_height"/>
            <div className="single-page__info">
                <h2 className="single-page__name">{name}</h2>
                <p className="single-page__descr">{description}</p>
            </div>
            <button onClick={() => history.goBack()} className="single-page__back">Back</button>
        </div>
    )
}

export default SingleCharacterLayout