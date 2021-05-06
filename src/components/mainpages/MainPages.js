import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Home from './home/Home'
import AnimalDetails from './animalDetails/AnimalDetails'
import Adoptions from './adoptions/Adoptions'
import Register from './auth/Register'

export default function MainPages() {
    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/adoptions" exact component={Adoptions} />
            <Route path="/animals/:id" exact component={AnimalDetails} />
            <Route path="/" exact component={Home} />
        </Switch>
    )
}
