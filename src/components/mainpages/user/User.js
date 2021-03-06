import React, { useContext, useState } from "react";
import AdoptionComponent from "../../components/adoptionComponent/AdoptionComponent";
import { GlobalState } from "../../../GlobalState";
import NotFound from "../utils/notFound/NotFound";

export default function Adoptions() {
  const state = useContext(GlobalState);
  const [userAdoptions] = state.userAPI.userAdoptions;
  const [searchTerm, setSearchTerm] = useState("");

  if (userAdoptions.length === 0)
    return (
      <div className="relative">
        <input
          autoFocus
          type="text"
          className="inp absolute r-0 -mt-6"
          placeholder="Search Adoptions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <NotFound message="Sorry, there are no user adoptions as of now." />
      </div>
    );

  console.log("adoption", userAdoptions)
  return (
    <>
      <h1>Your Adoptions</h1>
      {userAdoptions.map((adoption, index) => {
        return (
          <AdoptionComponent
            key={adoption.adoption._id}
            animal={adoption.animal}
            requester={adoption.requester}
            allower={adoption.allower}
            adoption={adoption.adoption}
            index={index}
          />
        );
      })}
    </>
  );
}
