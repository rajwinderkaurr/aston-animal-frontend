import React, { useState, createContext } from 'react'
import AnimalsAPI from './api/AnimalsAPI'
import UserAPI from './api/UserAPI'
import axios from 'axios'


const GlobalState = createContext()

export default function DataProvider({children}) {

    const [token, setToken] = useState(false)

    const state = {
        token: [ token, setToken ],
        animalsAPI: AnimalsAPI(),
        userAPI: UserAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            { children }
        </GlobalState.Provider>
    )
}
