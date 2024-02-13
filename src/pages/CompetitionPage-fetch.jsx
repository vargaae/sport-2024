import React, { useState, useEffect } from "react";
import "./competition-page.styles.scss";
import { Link } from "react-router-dom";
// import { footballApi, useGetMatchesQuery } from "../features/Api/FootballApi";

const returnRequestOptions = () => {
  const requestOptions = {
    mode: "cors",
    method: "GET",
    headers: {
      "X-Auth-Token": "7d521de6fca840418e1b20adaa7c4ebc",
      Accept: "application/json",
    },
  };

  return requestOptions;
};

const CompetitionPage = () => {
  // const { data: matches, isFetching, error, refetch } = useGetMatchesQuery(id);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    console.log("hi");

    fetch(
      "https://api.football-data.org/v4/" , "/competitions",
      returnRequestOptions()
    )
      .then((response) => response.json())
      .then((response) => setMatches(response))
    }, []);
    return (
      <>
      console.log(response)
      <h1 
      style={{
        fontWeight: "bold",
        fontFamily: "Montserrat",
        color: "gold",
      }}>COMPETITIONS</h1>
      {matches?.matches
        .filter((league) => league?.status === "FINISHED")
        .map((league) => {
          return (
            <Link to={`${league.id}`} key={league?.id}>
              <div className="card">{league?.homeTeam?.name}</div>
            </Link>
          );
        })}
    </>
  );
};

export default CompetitionPage;
