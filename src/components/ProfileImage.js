import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'


const handleChange=  (submitProfileImg, input) => async e =>{
    e.preventDefault()
    const {onChange} = input
    const {files} =e.target
    if (files) {
        await onChange(files[0])
        submitProfileImg()
    }
}

const RenderField = ({input, submitProfileImg}) => <input onChange={handleChange(submitProfileImg, input)} type='file' id='profileInput' style={{display:"none"}}/>


class ProfileImage extends Component {
    render() {
        const {profileImage, handleSubmit, submitProfileImg}= this.props
        return (
            <form className="mx-2 profile-container" onSubmit={handleSubmit}>
                <Field name='profileInput' component={RenderField} submitProfileImg={submitProfileImg}/>
                <label htmlFor="profileInput" style={{margin:"0px", cursor:"pointer"}}>
                    <img className="profile-image"src={profileImage}  alt=""/>
                    <div className="profile-middle">
                        <i className="fas fa-upload"></i>
                    </div>
                </label>

            </form>
        )
    }
}

export default reduxForm({
    form:'profileImg'
})(ProfileImage)
