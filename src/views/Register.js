import React, { Component } from 'react'
import {connect} from 'react-redux'

import {register as registerThunk} from '../redux/Users'
import RegisterForm from '../components/RegisterForm';

const background={
    height: "100vh",
    backgroundColor: "#eee",
    display:"flex",
    justifyContent:"center",
    alignItems: "center"
}

class Register extends Component {
    render() {
        const { register } = this.props

        return (
            <div style={background} >
                <RegisterForm onSubmit={register}/>
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    register: payload => dispatch(registerThunk(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(Register)