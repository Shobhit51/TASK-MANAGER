import React, { Component } from 'react'
import { CirclePicker } from 'react-color';


export default class NewCategoryModal extends Component {

    constructor(props){
        super(props);
        this.state={
            title:"",
            color:"#fff",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);

    }

    handleChangeComplete(color){
        this.setState({ color: color.hex });
    };

    handleClick(add){
        try {
            add(this.state)
            this.setState({
                title:"",
                background:"#fff",
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
        const {add} = this.props;

        return (
            <div className="modal fade" id="AddCategoryModal"  role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="p-2" style={{textAlign:"center"}}>ADD NEW CATEGORY</h4>
                    <button id="closeNewCategory" type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                        <div className="form-group p-2">
                            <label>Title</label>
                            <input type="text" name="title" className="form-control" value={this.state.title} placeholder="Enter the title" onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group p-2 text-center">
                            <label>Select the color</label>
                            <CirclePicker
                                className="mx-auto"
                                color={ this.state.background }
                                onChangeComplete={ this.handleChangeComplete }
                            />
                        </div>
                        <div className="form-group p-2" style={{textAlign:"center"}}>
                            <button type="submit" className="btn btn-success btn-block" data-dismiss="modal" onClick={()=>this.handleClick(add)}>CREATE</button>
                        </div>
                </div>
                </div>
            </div>
            </div>
        )
    }
}
