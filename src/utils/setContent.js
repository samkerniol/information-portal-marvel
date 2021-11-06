import Spinner from '../components/spinner/Spinner'
import ErrorMessage from '../components/errorMessage/ErrorMessage'
import Skeleton from '../components/skeleton/Skeleton'

const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return <Skeleton/>
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>
        default:
            return <ErrorMessage/>
    }
}

export default setContent