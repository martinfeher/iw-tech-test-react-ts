import { useState, useEffect } from "react";
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import LoaderTable from './Loaders/LoaderTable'

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

export const PaginatedEstablishmentsTable = () => {

  const [authorities, setAuthorities] = useState([{}]);
  const [selectedAuthority, setSelectedAuthority] = useState({});
  const [tableEstablishments, setTableEstablishments] = useState([{}]);
  const [loadingEstablishments, setLoadingEstablishments] =
    useState<boolean>(true);

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

  const handleSelectAuthority = (selectedItem: any) => {
    setLoadingEstablishments(true);
    setSelectedAuthority(selectedItem);
    loadEstablishmentData(selectedItem.value, selectedItem.schemeType);
  };

  interface IEstablishmentItem {
    BusinessName: string;
    RatingPercentage: string;
    RatingValue: string;
  }

  const loadEstablishmentData = (
    localAUthorityId: number,
    schemeTypeNational: number
  ) => {
    const rqOptions = {
      method: "GET",
      headers: { "x-api-version": "2" },
    };
    const url: string =
      "http://api.ratings.food.gov.uk/Establishments?localAuthorityId=" +
      localAUthorityId.toString();

    const rq = fetch(url, rqOptions)
      .then((response) => response.json())
      .then((data) => {
        let establishmentItems: IEstablishmentItem[] = [];

        data.establishments.map((item: any) => {
          establishmentItems.push({
            BusinessName: item.BusinessName,
            RatingValue: item.RatingValue,
            RatingPercentage: calcRatingPercentage(
              item.RatingValue,
              item.SchemeType
            ),
          });
        });

        setTableEstablishments(establishmentItems);
        setLoadingEstablishments(false);
      });
  };


  type calcRatingPercentageReturnType = string | any;

  const calcRatingPercentage = (
    ratingValue: string,
    schemeType: string
  ): calcRatingPercentageReturnType => {
    if (schemeType === "FHRS") {
      if (ratingValue === "5") {
        return "50%";
      } else if (ratingValue === "4") {
        return "0%";
      } else if (ratingValue === "3") {
        return "0%";
      } else if (ratingValue === "2") {
        return "0%";
      } else if (ratingValue === "1") {
        return "20%";
      } else if (ratingValue === "Exempt") {
        return "30%";
      }
    } else if (schemeType === "FHIS") {
      if (ratingValue === "Pass and Eat Safe") {
        return "50%";
      } else if (ratingValue === "Pass") {
        return "15%";
      } else if (ratingValue === "Improvement Required") {
        return "35%";
      }
    } else {
      return null;
    }
  };

  const columnsDataTable = [
    {
      name: "Business Name",
      selector: (row: any) => row.BusinessName,
      sortable: true,
      width: "350px",
    },
    {
      name: "Rating Percentage",
      selector: (row: any) => row.RatingPercentage,
      sortable: true,
      center: true,
      width: "150px",
    },
    {
      name: "Rating Value",
      selector: (row: any) => row.RatingValue,
      sortable: false,
      center: true,
      width: "200px",
    },
  ];
 
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
          onChange={(e) => handleSelectAuthority(e)}
          className=" w-[180px] text-black text-[13px] cursor-pointer"
          placeholder="Authority select"
        />
      </div>
      <div className="mt-[10px]">
        <DataTable
          columns={columnsDataTable}
          data={tableEstablishments}
          progressPending={loadingEstablishments}
          progressComponent={<LoaderTable />}
          noDataComponent="No Establishments found"
          pagination
          dense
          className="text-[13px] tableEstablishments"
        />
      </div>
    </div>
  );
};
