import React from 'react';
import Popular from './Popular';
import ReactRouter from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route path="/battle/results" component={Results} />
            <Route render={()=>{
              return <div>Sorry, address not Found</div>
            }}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
