import React, { useContext, useState } from "react";
import AdoptionComponent from "../../components/adoptionComponent/AdoptionComponent";
import { GlobalState } from "../../../GlobalState";
import NotFound from "../utils/notFound/NotFound";

export default function AdminAdoptions() {
  const state = useContext(GlobalState);
  const [publicAdoptions] = state.userAPI.publicAdoptions;
  const [searchTerm, setSearchTerm] = useState("");

  if (publicAdoptions.length === 0)
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
        <NotFound message="Sorry, there are no public adoptions as of now." />
      </div>
    );

  return (
    <>
      <div className="flex justify-between relative">
        <h1>Review Adoptions</h1>
        <input
          autoFocus
          type="text"
          className="inp absolute r-0 -mt-6"
          placeholder="Search Adoptions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {publicAdoptions.map((adoption, index) => {
        return (
          <AdoptionComponent
            key={adoption.adoption._id}
            animal={adoption.animal}
            requester={adoption.requester}
            allower={adoption.allower}
            adoption={adoption.adoption}
            index={index}
            isPublic
          />
        );
      })}
    </>
  );
}
