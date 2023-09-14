
const START = 'users/fetch-start'
const SUCCESS = 'users/fetch-success'
const ERROR = 'users/fetch-error'
const OUT = 'users/fetch-out'
const SET_IMAGE = 'users/set-image'

export const fetchStart= () =>({
    type: START
})
export const fetchSucess = payload => ({
    type: SUCCESS,
    payload,
})
export const fetchError = error =>({
    type: ERROR,
    error
})

export const signOut= () =>({
    type: OUT
})

export const setImage = payload => ({
    type: SET_IMAGE,
    payload,
})

const initialState={
    user: {},
    username:"",
    logined: false,
    loging:false,
    profileImage:""
}

export default function reducer(state=initialState, action){
    switch (action.type) {
        case START:
            
            return{
                ...state,
                loging:true,
            }
    
        case SUCCESS:
            return{
                ...state,
                user: action.payload,
                logined: true,
                loging: false
            };

        case ERROR:
    
            return {
                ...state,
                error: action.error,
                logined: false,
                loging: false
            }

        case OUT:

            return {
                user: {},
                username:"",
                logined: false,
                loging:false,
            }

        case SET_IMAGE:

            return {
                ...state,
                profileImage: action.payload
            }

        default:
            return state;
    }
}


export const login = (payload) =>
async (dispatch, getState,{auth,db})=>{

    const {email, password} = payload
    dispatch(fetchStart())
    try {
        const answer = await auth.signInWithEmailAndPassword(email,password)
        const payload = answer.user
        dispatch(fetchSucess(payload))
    } catch (error) {
        console.log(error);
        
        dispatch(fetchError(error))
    }
        
}

export const register = (payload) =>
async (dispatch, getState,{auth, db})=>{
    dispatch(fetchStart())
    const {email, password, name} = payload
    try {
        const answer = await auth.createUserWithEmailAndPassword(email,password)
        const {uid}=answer.user;

        var user = auth.currentUser;

        await user.updateProfile({
            displayName: name
        })

        await db.collection('users').doc(uid).set({role:'user'})
        dispatch(fetchSucess(answer.user))
    } catch (error) {
        dispatch(fetchError(error))
    }


}

export const logout = () =>
async (dispatch, getState,{auth, db})=>{

    try {
        await auth.signOut()
        dispatch(signOut())
    } catch (error) {
        dispatch(fetchError(error))
    }


}


export const handleProfileImg = (payload)=>
async (dispatch, getState,{auth, storage})=>{

    const {profileInput} = payload;

    if(!auth.currentUser || !profileInput.type.includes("image")){
        return
    }
    const {uid}= auth.currentUser
    const storageRef = storage.ref()

    const response= await storageRef
                    .child(`profileImages`)
                    .child(`${uid}.jpg`)
                    .put(profileInput)
    const url=  await response.ref.getDownloadURL()
    
    dispatch(setImage(url))

}

export const loadImage = ()=>
async (dispatch, getState,{auth, storage})=>{

    
    if(!auth.currentUser){
        return
    }    
    const {uid}= auth.currentUser
    const storageRef = storage.ref()

    const response= await storageRef
                    .child(`profileImages`)
                    .child(`${uid}.jpg`)

    const url=  await response.getDownloadURL()
    dispatch(setImage(url))

}