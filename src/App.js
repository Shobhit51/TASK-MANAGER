import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'

import Login from './views/Login';
import Register from './views/Register';
import Manager from './views/Manager';
import services from './services'
import Loading from './components/Loading';

import {fetchSucess, loadImage} from './redux/Users'


class App extends Component {

  state = {
    loading: true,
  }

  componentDidMount(){
    const {auth} = services;
    const {history, success, loadImage} = this.props

    auth.onAuthStateChanged(async (user) =>{
      if(user){
        success(user)
        loadImage()
        if(window.location.pathname === '/login' || window.location.pathname === '/register'){
          history.push('/')
        }
      }else{
        if(window.location.pathname === '/'){
          history.push('/login')
        }
      }
      this.setState({
        loading:false,
      })
      
    })
  }
  render(){
    const {loading}= this.state;

    return ( 
      loading ? 
      <Loading/> :
        <Switch>
          <Route exact path='/' component={Manager}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
        </Switch>
    );
  }
}
const mapStateToProps = state =>  ({})

const mapDispatchToProps = dispatch => ({
  success: payload => dispatch(fetchSucess(payload)),
  loadImage: payload => dispatch(loadImage(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(App)