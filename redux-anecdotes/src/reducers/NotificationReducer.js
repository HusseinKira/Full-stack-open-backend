import { createSlice } from '@reduxjs/toolkit'


const initialState=null

const Notificationslice= createSlice({

name: 'notification',
initialState,
reducers:{
setmessage(state,action){
  console.log(action)
if (state!==null){

  
}
return action.payload.message

},
clearmessage(){
 return null
}


}


})



export const{ setmessage,clearmessage} = Notificationslice.actions

export const setNotification = (message,timer)=>{

return async dispatch =>{




const messageTimer= setTimeout(() => {

  dispatch(clearmessage())  
  
}, timer*1000)

dispatch(setmessage({message,messageTimer}))

}

}

export default Notificationslice.reducer
