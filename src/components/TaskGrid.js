import React, { Component } from 'react'
import TaskCard from './TaskCard';

export default class TaskGrid extends Component {
    render() {
        const {tasks, remove, categories, currentCategory} = this.props
        
        return (
            <div className="row mt-4">
            {   
                Object.keys(tasks).map((id)=>{      
                    
                    if(currentCategory==="All"){
                        return(
                            <div className="col-auto mx-auto" key={id}>
                                <TaskCard category={categories[tasks[id].category]} task={tasks[id]} remove={remove} id={id}/>
                            </div>
                        )
                    }else if(currentCategory===tasks[id].category){
                        return(
                            <div className="col-auto mx-auto" key={id}>
                                <TaskCard category={categories[tasks[id].category]} task={tasks[id]} remove={remove} id={id}/>
                            </div>
                        )
                    } else return <div></div>
                }
                )

            }
            
        </div>
        )
    }
}
