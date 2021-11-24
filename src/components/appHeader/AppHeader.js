import {Link, NavLink, useLocation} from 'react-router-dom'

import './appHeader.scss'
import './media.scss'

const AppHeader = () => {
    const {pathname} = useLocation()
    
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <hr className='app__line'/>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink 
                        exact 
                        activeStyle={{color: '#9f0013'}} 
                        isActive={() => pathname.search(/characters/) === 1 || pathname === '/'} 
                        to='/'
                        >
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li><NavLink activeStyle={{color: '#9f0013'}}  to='/comics'>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader