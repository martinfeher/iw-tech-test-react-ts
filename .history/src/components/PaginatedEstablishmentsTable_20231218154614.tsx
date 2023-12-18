import { useState, useEffect } from "react";
import Select from 'react-select';

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

export const PaginatedEstablishmentsTable = () => {

  const [authorities, setAuthorities] = useState([{}]);

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

        interface ISelectAuthority {
          label: string;
          value: number;
          schemeType: number;
        }

        const selectAuthorities: ISelectAuthority[] = [];

        rqAuthorities.map((item: any) => {
          selectAuthorities.push({
            label: item.Name,
            value: item.LocalAuthorityId,
            schemeType: item.SchemeType,
          });
        });

        setAuthorities(selectAuthorities);
       
      });

  }, []);
 
    return (
      <div style={tableStyle}>
        <h2 className="mb-[10px] text-[22px]">Food Hygiene Ratings</h2>
        <div>
          <div className="mb-[10px] text-gray-300 text-[12px]">
            Select the local Authority
          </div>
          <Select
            options={authorities && authorities}
            value={selectedAuthority}
            id="selectAuthority"
            className=" w-[180px] text-black text-[13px] cursor-pointer"
            placeholder="Authority select"
          />
        </div>
      </div>
    );
};
