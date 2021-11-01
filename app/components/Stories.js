import * as React from 'react'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import Listing from './Listing'


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
      if(String(location.pathname).endsWith('new') ||
         String(location.pathname).endsWith('/')) {
          this.getPosts(location.pathname)
        }
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

            //need to deal with url sometimes not there
            return (
              <li key={id} className='post'>
                <Listing
                  title={title}
                  id={id}
                  url={url}
                  username={by}
                  comments={descendants}
                  time={time}
                />
              </li>

            )
          })}
        </ul>
      </React.Fragment>
    )
  }
}