import React, { Component } from 'react'
import {connect} from 'react-redux'
import {submit} from 'redux-form'

import NewTaskModal from '../components/NewTaskModal'
import Navbar from '../components/Navbar'
import TabList from '../components/TabList'
import TaskGrid from '../components/TaskGrid'
import NewCategoryModal from '../components/NewCategoryModal'
import SelectorInfo from '../components/SelectorInfo'

import {fetchTasks, addTask, removeTask, removeTasksByCategory} from '../redux/Tasks'
import {fetchCategories, addCategory, removeCategory} from '../redux/Categories'
import {logout, handleProfileImg} from '../redux/Users'



const background={
    height: "100vh",
}


class Manager extends Component {

    constructor(props){
        super(props);

        this.state={
            currentCategory: "All",
        }

        this.updateCategory = this.updateCategory.bind(this);

        const {fetchTasks, tasksFetched} = props
        if(tasksFetched){
            return
        }else fetchTasks()

        const {fetchCategories, categoriesFetched} = props
        if(categoriesFetched){
            return
        }else fetchCategories()
    }

    updateCategory(category){

        this.setState({ currentCategory: category });     

    }

    render() {
        const {username , profileImage, tasks, addTask, remove, out, categories, addCategory, removeCategory, removeTasksByCategory, submitProfileImg, handleProfileImg }= this.props
        const {currentCategory}= this.state
        return (
            <div style={background}>
                <Navbar profileImage={profileImage} username={username} out={out} submitProfileImg={submitProfileImg} handleProfileImg={handleProfileImg}/>
                <div className="container pt-5">
                <TabList categories={categories} currentCategory={currentCategory} updateCategory={this.updateCategory}/>
                <SelectorInfo updateCategory={this.updateCategory} currentCategory={currentCategory} removeCategory={removeCategory} removeTasksByCategory={removeTasksByCategory}/>
                <TaskGrid categories={categories} currentCategory={currentCategory} tasks={tasks} remove={remove}/>                
                </div>
                <NewTaskModal add={addTask} categories={categories} />
                <NewCategoryModal add={addCategory} />
            </div>

        )
    }
}


const mapStateToProps = state =>  {
    const {Tasks, Categories}= state
    const {Users:{ user, profileImage:tempPI }}= state

    return{
        username: user.displayName,
        profileImage: tempPI || 'https://www.w3schools.com/howto/img_avatar.png',
        tasks : Tasks.data,
        tasksFetched: Tasks.fetched,
        categories : Categories.data,
        categoriesFetched: Categories.fetched,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTasks: () => dispatch(fetchTasks()),
    addTask: payload => dispatch(addTask(payload)),
    remove: payload => dispatch(removeTask(payload)),
    out: () => dispatch(logout()),
    fetchCategories: () => dispatch(fetchCategories()),
    addCategory: payload => dispatch(addCategory(payload)),
    removeCategory: payload => dispatch(removeCategory(payload)),
    removeTasksByCategory: payload => dispatch(removeTasksByCategory(payload)),
    submitProfileImg: () => dispatch(submit('profileImg')),
    handleProfileImg: payload => dispatch(handleProfileImg(payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Manager)