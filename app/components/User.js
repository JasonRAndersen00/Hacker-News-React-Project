import React from "react";
import Loading from './Loading'
import queryString from 'query-string'
import { fetchPosts, fetchUser } from '../utils/api'
import { formatAMPM } from '../utils/utils'
import Listing from './Listing'


export default class User extends React.Component {

  state = {
    id: null,
    user: null,
    posts: null,
    error: null,
    loading: true
  }

  componentDidMount () {
    const {id} = queryString.parse(this.props.location.search)

    fetchUser(id)
      .then((user) =>{
        fetchPosts(user.submitted.slice(0,30))
          .then((posts) => {

            this.setState({
              id:id,
              user:user,
              posts: posts,
              loading: false
            })
          }).catch(({ message }) => {
            this.setState({
              error:message,
              loading: false
            })
          })
      }).catch(({ message }) => {
        this.setState({
          error:message,
          loading: false
        })
      })

  }



  render() {
    const {id, user, posts, error, loading} = this.state

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
        <h1>{id}</h1>
        <div>
          <span>
            {'joined '}
            <b>{formatAMPM(user.created)}</b>
          </span>
          <span>
            {' has '}
            <b>{user.karma}</b>
            {' karma'}
          </span>
          <p dangerouslySetInnerHTML={{__html: user.about}}/>
        </div>
        <h2>Posts</h2>
        <ul>
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