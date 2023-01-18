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

export const setNotification = (message,timer,notifstate)=>{

return async dispatch =>{
 var notclear= false 
 if(notifstate!==null){
  notclear=true
 } 

dispatch(setmessage(message))

const messageTimer= setTimeout(() => {

  dispatch(clearmessage())  
  
}, timer*1000)


if (notclear) {
  clearTimeout(messageTimer);
}
}

}

export default Notificationslice.reducer
