import axios from 'axios'

const instance = axios.create({
    // this is where backend server URL goes (Cloud Function/Express API)
    baseURL : "https://us-central1-clone-cb45d.cloudfunctions.net/api"
})

export default instance;