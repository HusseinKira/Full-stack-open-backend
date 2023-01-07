import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
 
}

const create= async object => {
const config = {
    headers: { Authorization: token },
  }

const response= await axios.post(baseUrl,object,config)
return response.data

}

export default { getAll, create,setToken }