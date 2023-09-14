import React, { Component } from 'react'

export default class TabList extends Component {

    render() {
        const {categories, updateCategory}= this.props

        return (
            <ul className="nav nav-tabs" id="tablist">
                <li className="nav-item" key="All">
                    <div className="nav-link active" data-toggle="tab" onClick={()=>updateCategory("All")}>All</div>
                </li>
                {
                    Object.keys(categories).map((id)=>{
                            return(  
                            <li className="nav-item" key={id}>
                                <div className="nav-link" data-toggle="tab" onClick={()=>updateCategory(id)}>{categories[id].title}</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
