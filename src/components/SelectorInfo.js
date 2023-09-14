import React, { Component } from 'react'

export default class SelectorInfo extends Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(){
        const {currentCategory, updateCategory, removeCategory, removeTasksByCategory}= this.props

        removeCategory(currentCategory)
        removeTasksByCategory(currentCategory)
        updateCategory("All")

    }
    render() {
        const {currentCategory }= this.props

        const defaultMessage = <h5 className="">Here you can see all the tasks</h5>
        const deleteButton = <div className="btn btn-danger" data-toggle="modal" data-target="#alertModal"> <i className="fas fa-trash-alt mr-2"></i>DELETE THIS CATEGORY</div>

        var display
        if (currentCategory==="All") {
            display = defaultMessage
        }else display=deleteButton

        return (
            <div className="row">
                <div className="col my-4 text-right">
                    {display}
                </div>
                <div className="modal fade" id="alertModal" role="dialog" aria-labelledby="alertModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"style={{textTransform:"uppercase"}}>You are going to delete this category</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="col">
                            <div className="row">
                                When you delete this category: the associated tasks will be also deleted. 
                            </div>
                            <div className="row">
                                <div style={{marginLeft: "auto", fontWeight: "bold"}}>Do you want to continue?</div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">NO</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleClick}>YES</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
        )
    }
}
