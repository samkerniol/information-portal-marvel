import {useHistory} from "react-router"
import {useEffect} from "react"

import './singleCharacterLayout.scss'
const SingleCharacterLayout = ({data}) => {
    const {name, description, thumbnail} = data,
        history = useHistory()

    useEffect(() => {
        const link = document.querySelector('.app__menu ul li a')

        link.style.color = 'rgb(159, 0, 19)'

        return () => {
            link.style.color = '#232222'
        }
    }, [])

    return (
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <a onClick={() => history.goBack()} className="single-char__back">Back</a>
        </div>
    )
}

export default SingleCharacterLayout