import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/theme'
import { formatAMPM } from '../utils/utils'
import { Link } from 'react-router-dom'

export default function Listing ({username, comments, title, url, time, id}) {
  return(
    <ThemeConsumer>
      {({ theme }) => (
        <React.Fragment>
          {/* header */}
          {url !== undefined
            ?<a className='link'
            href={url} dangerouslySetInnerHTML={{__html: title}}/>
            :<Link
              className='link'
              to={{
                pathname: '/post',
                search: `?id=${id}`
              }}
              dangerouslySetInnerHTML={{__html: title}}
              />
            }
            {/* info */}
            <div className={`details-${theme}`}>
              <span>
                {'by '}
                <Link
                  to={{
                    pathname: '/user',
                    search: `?id=${username}`
                  }}>
                    {username}
                  </Link>
              </span>
              <span>
                {' on '}
                {formatAMPM(time)}
              </span>
              <span>
                {' with '}
                <Link
                  to={{
                    pathname: '/post',
                    search: `?id=${id}`
                  }}>
                    {comments}
                  </Link>
                {' comments'}
              </span>
            </div>
        </React.Fragment>
      )}
    </ThemeConsumer>
  )
}

Listing.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string,
  username: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired
}