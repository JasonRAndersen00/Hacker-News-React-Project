import * as React from 'react'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import { formatAMPM } from '../utils/utils'


export default class Stories extends React.Component {
  state = {
    posts: null,
    loading:true,
    error:null
  }

  getPosts = (pathname) => {
    const type = String(pathname).endsWith('new') ? 'new' : 'top'
    this.setState({loading:true})

    fetchMainPosts(type)
    .then((posts) => {
      this.setState({
        posts,
        loading:false
      })
    }).catch(({ message }) => {
      this.setState({
        error:message,
        loading: false
      })
    })

  }

  componentDidMount () {
    this.unlisten = this.props.history.listen((location, action) => {
      this.getPosts(location.pathname)
    });
    this.getPosts(this.props.location.pathname)

  }


  componentWillUnmount() {
    console.log('unmount')
    this.unlisten();
}

  render() {
    const {posts, error, loading} = this.state

    if (loading === true){
      return <Loading text='Loading' />
    }

    if (error) {
      return (
        <p className='center-text error'>{error}</p>
      )
    }

    return(
      <React.Fragment>
        <ul >
          {posts.map((post) => {
            const {by, descendants, title, url, time, id} = post

            console.log(`title: ${title} and url: ${url}`)

            //need to deal with url sometimes not there
            return (
              <li key={title} className='post'>
                {/* header */}
                {url !== undefined
                ?<a href={url}>{title}</a>
              :<Link
                to={{
                  pathname: '/post',
                  search: `?id=${id}`
                }}>
                  {title}
              </Link>}

                {/* info */}
                <div className='details'>
                  <span>
                    {'by '}
                    <Link
                      to={{
                        pathname: '/user',
                        search: `?id=${by}`
                      }}>
                        {by}
                      </Link>
                  </span>
                  <span>
                    {' on '}
                    <a>{formatAMPM(time)}</a>
                  </span>
                  <span>
                    {' with '}
                    <Link
                      to={{
                        pathname: '/post',
                        search: `?id=${id}`
                      }}>
                        {descendants}
                      </Link>
                    {' comments'}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </React.Fragment>
    )
  }
}