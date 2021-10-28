import * as React from 'react'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import { useLocation } from 'react-router-dom'
import { formatAMPM } from '../utils/utils'




export default class Stories extends React.Component {
  state = {
    posts: null,
    loading:true,
    error:null
  }

  componentDidMount () {
    // console.log(this.props.location.pathname)
    fetchMainPosts('top')
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


  render() {
    const {posts, error, loading} = this.state

    if (loading === true){
      return <Loading text='Battling' />
    }

    if (error) {
      return (
        <p className='center-text error'>{error}</p>
      )
    }

    return(
      <React.Fragment>
        <ul className='column space-between'>
          {posts.map((post) => {
            const {by, descendants, title, url, time} = post



            //need to deal with url sometimes not there
            return (
              <li key={title}>
                {/* header */}
                <h4>{title}</h4>
                {/* info */}
                <div className='details'>
                  <span>
                    {'by '}
                    <a>{by}</a>
                  </span>
                  <span>
                    {' on '}
                    <a>{formatAMPM(time)}</a>
                  </span>
                  <span>
                    {' with '}
                    <a>{descendants}</a>
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