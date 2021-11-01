import React from "react";
import Loading from './Loading'
import queryString from 'query-string'
import { fetchItem, fetchComments } from '../utils/api'
import { formatAMPM } from '../utils/utils'
import { Link } from 'react-router-dom'
import { ThemeConsumer } from "../contexts/theme";
import PropTypes from 'prop-types'


function Comment ({by, time, text}) {
  return(
    <ThemeConsumer>
      {({ theme }) => (
        <React.Fragment>
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
          </div>
          <p dangerouslySetInnerHTML={{__html: text}}/>
        </React.Fragment>
      )}
    </ThemeConsumer>
  )

}

Comment.propTypes = {
  by: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired

}


export default class User extends React.Component {

  state = {
    id: null,
    post: null,
    comments: null,
    error: null,
    loading: true
  }

  componentDidMount () {
    const {id} = queryString.parse(this.props.location.search)
    fetchItem(id)
      .then((post) => {
        if(post.descendants !== 0){
          fetchComments(post.kids)
            .then((comments) => {
              this.setState({
                id,
                post,
                comments,
                loading:false
              })
            })
        }
        this.setState({
          id,
          post,
          comments:null,
          loading:false
        })

      })

  }



  render() {
    const {id, post, comments, error, loading} = this.state

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
        <h1>
          {post.url !== undefined
            ?<a href={post.url} dangerouslySetInnerHTML={{__html: post.title}}/>
            :<Link
              to={{
                pathname: '/post',
                search: `?id=${id}`
              }}
              dangerouslySetInnerHTML={{__html: post.title}}
            />
          }
        </h1>
        <div className='details'>
          <span>
            {'by '}
            <Link
              to={{
                pathname: '/user',
                search: `?id=${post.by}`
              }}>
                {post.by}
              </Link>
          </span>
          <span>
            {' on '}
            <a>{formatAMPM(post.time)}</a>
          </span>
          <span>
            {' with '}
            <Link
              to={{
                pathname: '/post',
                search: `?id=${id}`
              }}>
                {post.descendants}
              </Link>
            {' comments'}
          </span>
        </div>

        {comments !== null
          ?<ul>
          {comments && comments.map((comment) => {
            const {by, time, text, id} = comment
            return (
              <li key={id} className='comment'>
                <Comment
                by = {by}
                time = {time}
                text = {text}
                />
              </li>
            )
          })}
        </ul>
        :<p></p>}


      </React.Fragment>
    )
  }
}