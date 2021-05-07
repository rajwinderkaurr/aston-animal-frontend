import React from 'react'
import Loader from 'react-loader-spinner'

export default function Loading() {
    return (
        <div className="center">
            <Loader type="TailSpin" color="#000000" height={80} width={80} />
        </div>
    )
}
