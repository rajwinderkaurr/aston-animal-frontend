import { useState, useEffect } from 'react'
import axios from 'axios'

export default function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [userAdoptions, setUserAdoptions] = useState([])
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/users/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setUserDetails(res.data)
                    // setIsAdmin(res.data)
                } catch (err) {
                    alert(err || err.response.data.msg)
                }
            }

            const userAdoptions = async () => {
                try {
                    const res = await axios.get('/api/adoption', {
                        headers: {Authorization: token}
                    })

                    setUserAdoptions(res.data)
                } catch (err) {
                    alert(err || err.response.data.msg)
                }
            }

            getUser()
            userAdoptions()
        }
    }, [token])

    return {
        isLogged: [ isLogged, setIsLogged ],
        isAdmin: [ isAdmin, setIsAdmin ],
        userDetails: [userDetails, setUserDetails],
        userAdoptions: [userAdoptions, setUserAdoptions]
    }
}

