import React, { Component } from 'react'
import {connect} from 'react-redux'

import LoginForm from '../components/LoginForm';

import {login as loginThunk} from '../redux/Users'

const background={
    height: "100vh",
    backgroundColor: "#eee",
    display:"flex",
    justifyContent:"center",
    alignItems: "center"
}

class Login extends Component {
    render() {
        const { login } = this.props

        return (
            <div style={background} >
                <LoginForm onSubmit={login}/>
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    login: payload => dispatch(loginThunk(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(Login)