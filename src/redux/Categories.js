
const START = 'categories/fetch-start'
const SUCCESS = 'categories/fetch-success'
const ERROR = 'categories/fetch-error'

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


export const fetchCategories= () =>
async (dispatch, getState,{auth, db}) =>{
    dispatch(fetchStart())

    try {
        const uid= auth.currentUser.uid 
        const snaps= await db.collection('categories').where('uid',"==",uid).get()
        const categories ={}
        snaps.forEach(x=>
            categories[x.id] = x.data()
        )
        dispatch(fetchSucess(categories))
       
    } catch (error) {
        console.log(error);
        
        dispatch(fetchError(error))
    }

}


export const addCategory= (payload) =>
async (dispatch, getState,{auth, db}) =>{

    try {
        const title = payload.title
        const color = payload.color
        const uid = auth.currentUser.uid 

        const newcategory ={
            title,
            color,
            uid
        }
        console.log(newcategory);
        
        await db.collection('categories').doc().set(newcategory)
        dispatch(fetchCategories())

    } catch (error) {
        console.log(error);
        
    }

}

export const removeCategory= (payload) =>
async (dispatch, getState,{auth, db}) =>{

    try {
        const id = payload
       
        await db.collection('categories').doc(id).delete()

        dispatch(fetchCategories())


    } catch (error) {
        console.log(error);
        
    }

}