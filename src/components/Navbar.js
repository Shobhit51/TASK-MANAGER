import React, { Component } from 'react'
import ProfileImage from './ProfileImage'


export default class Navbar extends Component {

    render() {
        const {profileImage, username, out, submitProfileImg, handleProfileImg} = this.props
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="navbar-brand">TaskManager</div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav mx-auto">
                        <li className="nav-item active">
                            <button type="button" className="btn btn-success mx-2" data-toggle="modal" data-target="#AddTaskModal">ADD NEW TASK</button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn btn-info mx-2" data-toggle="modal" data-target="#AddCategoryModal">ADD NEW CATEGORY</button>
                        </li>
                        </ul>
                        <div className="row ml-4" style={{alignItems:"center"}}>
                            <ProfileImage profileImage={profileImage} onSubmit={handleProfileImg} submitProfileImg={submitProfileImg}/>
                            <div className="mx-2 navbar-brand">{username}</div>
                            <i className="fas fa-sign-out-alt mx-2" style={{fontSize: "25px", color: "white", cursor: "pointer"}} onClick={()=>out()}></i>
                        </div>
                    </div>
                </div>
            
            </nav>
        )
    }
}
