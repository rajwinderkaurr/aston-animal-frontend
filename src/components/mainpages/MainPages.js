import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

import {GlobalState} from '../../GlobalState'

// Basic
import Home from './home/Home'
import AnimalDetails from './animalDetails/AnimalDetails'
import Adoptions from './adoptions/Adoptions'

// Authorized
import Login from './auth/Login'
import Register from './auth/Register'

// Admin
import AddAnimal from '../mainpages/admin/AddAnimal'
import DeleteAnimal from '../mainpages/admin/DeleteAnimal'

// Utils
import NotFound from './utils/notFound/NotFound'
import Modal from '../components/modal/Modal'

export default function MainPages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Switch>
            {/* User related paths */}
            <Route path="/login" exact component={!isLogged? Login: NotFound} />
            <Route path="/register" exact component={!isLogged? Register: NotFound} />
            <Route path="/adoptions" exact component={Adoptions} />
            <Route path="/animals/:id" exact component={AnimalDetails} />
            <Route path="/modal" exact >
                <Modal title="Hello World">
                    Hello World
                </Modal>
            </Route>

            {/* Normal Paths */}
            <Route path="/" exact component={Home} />

            {/* Admin paths */}
            <Route path="/add_animal" exact component={isAdmin? AddAnimal: NotFound} />
            <Route path="/delete_animal" exact component={isAdmin? DeleteAnimal: NotFound} />
            <Route path="/add_animal" exact component={isAdmin? AddAnimal: NotFound} />
        </Switch>
    )
}
