import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Loading from './components/Loading'


class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }

  render() {
    return (
      <Loading/>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)