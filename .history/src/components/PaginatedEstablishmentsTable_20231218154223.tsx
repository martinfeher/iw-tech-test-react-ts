import { useEffect } from "react";


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

        // Preselect the first authority
        if (selectAuthorities.length > 0) {
          setSelectedAuthority(selectAuthorities[0]);
          handleSelectAuthority(selectAuthorities[0]);
        }
      });

  }, []);
 
    return (
      <div style={tableStyle}>
          <select name="" id="">
          </select>
      </div>
    );
};
