import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import {NavLink} from 'react-router-dom'

const activeStyle = {
  color: 'rgb(187, 46, 31'
}

export default function Nav () {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme}) => (
        <nav className='row space-between'>
          <ul className='row nav'>
            <li>
              <NavLink
                exact
                to='/'
                activeStyle={activeStyle}
                className='nav-link'>
                  Top
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/new'
                activeStyle={activeStyle}
                className='nav-link'>
                  New
              </NavLink>
            </li>
          </ul>

          <button
            style={{fontsize: 50}}
            className='btn-clear'
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🔦': '💡'}
          </button>
        </nav>
      ) }
    </ThemeConsumer>
  )
}