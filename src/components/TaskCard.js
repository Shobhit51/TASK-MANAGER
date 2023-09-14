import React, { Component } from 'react'

export default class TaskCard extends Component {
    render() {
        const {id, task, remove, category} = this.props
        
        const categoryTitle = category ? category.title : null
        const categoryColor = category ? category.color : "black"

        
        return (
        <div className="card p-3 m-4" style={{minWidth:"300px", maxWidth:"300px"}}>
            <div className="row p-3">
                <h5>{task.title}</h5>
                <div className="ml-auto badge p-2" style={{backgroundColor: categoryColor, textTransform: "uppercase" , color:"white"}}>{categoryTitle}</div>
            </div>
            <div className="row p-3">
                <p className="text-justify">{task.description}</p>
            </div>
            <div className="row px-3">
                <div className="btn btn-danger mx-auto" onClick={()=>remove(id)}> <i className="fas fa-check mr-2"></i>DONE</div>
            </div>
        </div>
    )
    }
}
