import {Link, NavLink, useLocation} from 'react-router-dom'

import './appHeader.scss'
import './media.scss'

const AppHeader = () => {
    const {pathname} = useLocation()

    const onBurger = e => {
        const burger = e.target.closest('.app__burger'),
            title = document.querySelector('.app__title'),
            menu = document.querySelector('.app__menu')

        burger.classList.toggle('app__burger_active')

        title.style.display = burger.classList.contains('app__burger_active') ? 'none' : 'block'
        menu.style.display = burger.classList.contains('app__burger_active') ? 'block' : 'none'
    }
    
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
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
            <div className='app__burger' onClick={e => onBurger(e)}>
                <span/>
            </div>
        </header>
    )
}

export default AppHeader