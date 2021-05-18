import React, { useContext } from 'react'
import AdoptionComponent from '../../components/adoptionComponent/AdoptionComponent'
import { GlobalState } from '../../../GlobalState'

export default function Adoptions() {
    const state = useContext(GlobalState)
    const [ adoptions ]  = state.userAPI.userAdoptions

    return (
        <div>
            {!adoptions || adoptions.length === 0? null: 
                <>
                    <h1>Your Adoptions</h1>
                    {
                        adoptions.map((adoption, index) => {
                            return (<AdoptionComponent key={adoption.adoption._id} animal={adoption.animal} requester={adoption.requester} allower={adoption.allower} adoption={adoption.adoption} index={index} />)
                        })
                    }
                </>
            }
        </div>
    )
}
