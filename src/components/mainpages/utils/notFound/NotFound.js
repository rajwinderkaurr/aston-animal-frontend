import React from 'react'
import NotFoundSVG from '../../../../assets/images/not_found.svg'
import './notFound.css'

export default function NotFound({message}) {
    return (
        <div className="not-found container center">
            <div className="">
                <img src={NotFoundSVG} alt="404: Not Found" />
                <span>{message || "Sorry, we got an empty dataset :("}</span>
            </div>
        </div>
    )
}
