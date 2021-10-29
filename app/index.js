import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Loading from './components/Loading'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'

const Stories = React.lazy(() => import('./components/Stories'))


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
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <React.Suspense fallback={<Loading/>}>
                <Switch>
                  <Route exact path='/' component={Stories} />
                  <Route path='/new' component={Stories} />
                  {/* <Route exact path='/battle' component={Battle} />
                  <Route path='/battle/results' component={Results} /> */}
                  <Route render={() => <h1>404 Page Not Found</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)