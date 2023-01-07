

const Loginform =(props)=>{ 
   
return( 
<div>
<form onSubmit={props.handler}>
  <h3> Login: </h3>
  {props.children}
<button type="submit">Login</button>
</form></div>)

  }

export default Loginform