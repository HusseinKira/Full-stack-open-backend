import { createSlice } from '@reduxjs/toolkit'


const initialState=null

const Notificationslice= createSlice({

name: 'notification',
initialState,
reducers:{
setmessage(state,action){

return action.payload

},
clearmessage(){
 return null
}


}


})



export const{ setmessage,clearmessage} = Notificationslice.actions

export const setNotification = (message,timer)=>{

return async dispatch =>{
dispatch(setmessage(message))
setTimeout(() => {

  dispatch(clearmessage())  
    
}, timer*1000);

}

}

export default Notificationslice.reducer
