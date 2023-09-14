import React, { Component } from 'react'

const background = {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    height: "100vh",
}

const spinner={
    margin:"auto",
    width: "4rem", 
    height: "4rem",
}

export default class Loading extends Component {
    render() {
        return (
            <div style={background}>
                <div className="spinner-border" style={spinner} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}
