import spinner from './spinner.gif';

const Spinner = () => {
    return (
        <div className='randomchar__block' style={{position: 'relative'}}>
            <img src={spinner} alt='spinner' style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}/>
        </div>
    )
}

export default Spinner;