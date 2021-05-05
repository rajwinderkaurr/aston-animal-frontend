import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Home from './home/Home'
import AnimalDetails from './animalDetails/AnimalDetails'

export default function MainPages() {
    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/animals/:id" exact component={AnimalDetails} />
            <Route path="/" exact component={Home} />
        </Switch>
    )
}
