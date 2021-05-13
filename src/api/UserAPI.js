import { useState, useEffect } from 'react'
import axios from 'axios'

export default function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
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

            getUser()
            
        }
    }, [token])

    const adoptAnimal = async () => {
        if (!isLogged) return alert("Please Login before raising adoption")
        if (isAdmin) return alert("Admins cannot adopt animals")

        await axios.get("")
    }

    return {
        isLogged: [ isLogged, setIsLogged ],
        isAdmin: [ isAdmin, setIsAdmin ],
        userDetails: [userDetails, setUserDetails],
        adoptAnimal: [ adoptAnimal ]
    }
}

