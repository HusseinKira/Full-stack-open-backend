const Input = ({text,type,name,value,setfn,id}) => {
return(
<div>
     {text} <input type={type} name={name} value={value} id={id} onChange={({target})=>{setfn(target.value)}} ></input>

 </div>
 )
   
}

export default Input