import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {reduxForm , Field} from 'redux-form'


class RegisterForm extends Component {
    render() {
        const {handleSubmit } = this.props
        return (
            <form className="card px-5 py-3" style={{minWidth:"372px"}} onSubmit={handleSubmit}>
                <h3 className="p-2 display-4" style={{textAlign:"center"}}>REGISTER</h3>
                <div className="form-group p-2">
                    <label>NAME AND SURNAME</label>
                    <Field type="text" name="name" placeholder="Enter your name" className="form-control" component="input"/>
                </div>
                <div className="form-group p-2">
                    <label>EMAIL ADRESS</label>
                    <Field type="email" name="email" placeholder="Enter your email" className="form-control" component="input"/>
                </div>
                <div className="form-group p-2">
                    <label>PASSWORD</label>
                    <Field type="password" name="password" placeholder="Enter your password" className="form-control" component="input"/>
                </div>
                <div className="form-group p-2" style={{textAlign:"center"}}>
                    <button type="submit" className="btn btn-primary btn-block mb-3">Register with email</button>
                    <Link to="/login">Go to Login</Link>
                </div>
            </form>
        )
    }
}


export default reduxForm({
    form:'register',
})(RegisterForm)