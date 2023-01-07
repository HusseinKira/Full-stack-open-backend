import axios from 'axios'
import blogservice from './blogservices'
const baseUrl = '/api/login'


const login=async credentials =>{
    
const response = await axios.post(baseUrl,credentials)
return response.data

}


const logout = ()=>{
    window.localStorage.removeItem('loggedbloguser')
    window.location.reload()
  }


const handlelogin = async({username,password,setuser,setusername,setpassword,setMessage,settype}) =>{
    
    try{
      const user = await login({
        username, password })

      blogservice.setToken(user.token)
      window.localStorage.setItem(
        'loggedbloguser', JSON.stringify(user))

  setuser(user)
 setusername('')
 setpassword('')
}
catch(exception){
  settype('error')
  setMessage('Wrong username or password')
      setTimeout(() => {
        settype(null)
        setMessage(null)
      }, 5000)
}
  }

export default { logout,handlelogin  }