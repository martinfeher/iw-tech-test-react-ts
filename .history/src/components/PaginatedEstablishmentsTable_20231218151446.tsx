import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings } from "../api/ratingsAPI";

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

export const PaginatedEstablishmentsTable = () => {


  useEffect(() => {

    const rqOptions = {
      method: "GET",
      headers: { "x-api-version": "2" },
    };

    const url: string = "http://api.ratings.food.gov.uk/Authorities";

    // Retrieve authorities to select Drop-down list
    const rq = fetch(url, rqOptions)
      .then((response) => response.json())
      .then((data) => {
        const rqAuthorities = data.authorities;

      });
  }, []);
 
    return (
      <div style={tableStyle}>
          <select name="" id=""></select>
      </div>
    );
};
