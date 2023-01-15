import { createSlice } from '@reduxjs/toolkit'


const initialState=''

const filterslice= createSlice({

name: 'filter',
initialState,
reducers:{
    
setfilter(state,action){

return action.payload

}

}


})



export const{setfilter} = filterslice.actions

export default filterslice.reducer