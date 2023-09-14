import React, { Component } from 'react'

export default class NewTaskModal extends Component {
    constructor(props){
        super(props);
        this.state={
            title:"",
            category:"",
            description:"",
        };
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleClick(add){
        try {
            add(this.state)
            this.setState({
                title:"",
                category:"",
                description:"",
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleInputChange(event) {

        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({
        [name]: value
        });
    }
 
    render() {
        const {add, categories} = this.props;
        return (
            <div className="modal fade" id="AddTaskModal"  role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="p-2" style={{textAlign:"center"}}>ADD NEW TASK</h4>
                    <button id="closeNewTask" type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                        <div className="form-group p-2 row">
                                <div className="col">
                                <label>Title</label>
                                    <input type="text" name="title" className="form-control" value={this.state.title} placeholder="Enter the title" onChange={this.handleInputChange} />
                                    </div>
                                <div className="col">
                                    <label>Category</label>
                                    <select type="text" name="category" className="form-control" value={this.state.category} placeholder="Enter the title" onChange={this.handleInputChange}>
                                        <option></option>
                                        {
                                            Object.keys(categories).map((id)=>{
                                                    return(<option key={id} value={id}>{categories[id].title}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            
                        </div>
                        <div className="form-group p-2">
                            <label>Description</label>
                            <textarea type="text" name="description" className="form-control" value={this.state.description} placeholder="Enter the title" onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-group p-2" style={{textAlign:"center"}}>
                            <button type="submit" className="btn btn-success btn-block" data-dismiss="modal"  onClick={()=>this.handleClick(add)}>CREATE</button>
                        </div>
                </div>
                </div>
            </div>
            </div>
        )
    }
}
