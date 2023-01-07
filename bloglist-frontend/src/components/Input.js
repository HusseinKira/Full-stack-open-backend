const Input = ({text,type,name,value,setfn}) => {
return(
<div>
     {text} <input type={type} name={name} value={value} onChange={({target})=>{setfn(target.value)}}></input>

 </div>
 )
   
}

export default Input