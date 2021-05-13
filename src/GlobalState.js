import React, { useState, createContext, useEffect } from 'react'
import AnimalsAPI from './api/AnimalsAPI'
import UserAPI from './api/UserAPI'

import axios from 'axios'

export const GlobalState = createContext()

export default function DataProvider({children}) {
    const [token, setToken] = useState(false)

    useEffect(() => {
        const previousLogin = localStorage.getItem('previousLogin')

        if (previousLogin) {
            const refreshToken = async () => {
                const res = await axios.get('/users/refresh_token')
        
                setToken(res.data.accessToken)

                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    }, [])


    const state = {
        token: [ token, setToken ],
        userAPI: UserAPI(token),
        animalsAPI: AnimalsAPI()
    }


    return (
        <GlobalState.Provider value={state}>
            { children }
        </GlobalState.Provider>
    )
}
