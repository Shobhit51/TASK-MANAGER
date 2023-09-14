
const START = 'tasks/fetch-start'
const SUCCESS = 'tasks/fetch-success'
const ERROR = 'tasks/fetch-error'

const fetchStart= () =>({
    type: START
})
const fetchSucess = payload => ({
    type: SUCCESS,
    payload
})
const fetchError = error =>({
    type: ERROR,
    error
})


const initialState={
    data: {},
    fetched: false,
    fetching:false,
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case START:
            return {
                ...state,
                fetching: true
            }
        case SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetched: true,
                fetching: false

            }
        case ERROR:
            return {
                ...state,
                error: action.error,
                fetched: false,
                fetching: false
            }
        default:
            return state
        }
}


export const fetchTasks= () =>
async (dispatch, getState,{auth, db}) =>{
    dispatch(fetchStart())

    try {
        const uid= auth.currentUser.uid 
        const snaps= await db.collection('tasks').where('uid',"==",uid).get()
        const tasks ={}
        snaps.forEach(x=>
            tasks[x.id] = x.data()
        )
        dispatch(fetchSucess(tasks))
       
    } catch (error) {
        console.log(error);
        
        dispatch(fetchError(error))
    }

}

export const addTask= (payload) =>
async (dispatch, getState,{auth, db}) =>{

    try {
        const title = payload.title
        const category = payload.category
        const description = payload.description
        const uid = auth.currentUser.uid 

        const newtask ={
            title,
            category,
            description,
            uid
        }

        await db.collection('tasks').doc().set(newtask)
        dispatch(fetchTasks())

    } catch (error) {
        console.log(error);
        
    }

}

export const removeTask= (payload) =>
async (dispatch, getState,{auth, db}) =>{

    try {
        const id = payload
       
        await db.collection('tasks').doc(id).delete()
        dispatch(fetchTasks())


    } catch (error) {
        console.log(error);
        
    }

}

export const removeTasksByCategory= (payload) =>
async (dispatch, getState,{auth, db}) =>{

    try {
        const id = payload
       
        const  snap = await db.collection('tasks').where('category',"==",id).get()

        snap.forEach(async doc=>{
            await doc.ref.delete()
        });

        dispatch(fetchTasks())


    } catch (error) {
        console.log(error);
        
    }

}