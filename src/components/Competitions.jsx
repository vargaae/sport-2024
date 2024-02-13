import React, { useState } from "react";
import "./competitions.styles.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import {
  footballApi,
  useGetCompetitionsQuery,
} from "./../features/Api/FootballApi";
const Competitions = () => {
  const dispatch = useDispatch();
  const {
    data: competitions,
    isFetching,
    error,
    refetch,
  } = useGetCompetitionsQuery();
  // Avaible Competitions' data -> FREE TIER: fetch football-data.org API
  // -> features/Api/competitions.json -> filter data-> "plan": "TIER_ONE"

  const [count, setCount] = useState(0);

  if (error) {
    const timer = setTimeout(() => {
      setCount("Timeout called!");
      console.log("fetch API Error, Refetch in 15s");
      refetch();
    }, 15000);
    return () => clearTimeout(timer);
  }

  if (error)
    return (
      <div>
        <button onClick={handleRefetchOne}>Force re-fetch 1</button>
        <button onClick={handleRefetchTwo}>Force re-fetch 2</button>
      </div>
    );

  function handleRefetchOne() {
    // force re-fetches the data
    refetch();
  }

  function handleRefetchTwo() {
    // has the same effect as `refetch` for the associated query
    dispatch(
      footballApi.endpoints.getCompetitions.initiate(
        { count: 5 },
        { subscribe: false, forceRefetch: true }
      )
    );
  }

  if (isFetching) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className="root">
      <div className="container">
        <h2>Available Competitions</h2>
        {competitions?.competitions
          .filter((league) => league?.plan === "TIER_ONE")
          .map((league) => {
            return (
              <Link to={`/${league.id}`} key={league.id}>
                <div className="competitionlist">
                  <span>{league?.name}</span>
                </div>
              </Link>
            );
          })}
      </div>
      <div className="codelist">
        <h2>Available Competitions Code List</h2>
        <img
          height="15px"
          width="20px"
          src="https://crests.football-data.org/qatar.png"
        />{" "}
        | WC | FIFA World Cup | WORLD | CUP
        <br />
        <img height="15px" width="20px" src="" /> | CL | UEFA Champions League |
        EUROPE | CUP
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
        />{" "}
        | BL1 | Bundesliga | GERMANY | LEAGUE
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg"
        />{" "}
        | DED | Eredivisie | NETHERLANDS | LEAGUE
        <br />
        <img height="15px" width="20px" src="" /> | BSA | Campeonato Brasileiro
        Série A | BRAZIL | LEAGUE
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"
        />{" "}
        | PD | Primera Division | SPAIN | LEAGUE
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg"
        />{" "}
        | FL1 | Ligue 1 | FRANCE | LEAGUE
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
        />{" "}
        | ELC | Championship | ENGLAND | LEAGUE
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"
        />{" "}
        | PPL | Primeira Liga | PORTUGAL | LEAGUE
        <br />
        <img height="15px" width="20px" src="" /> | EC | European Championship
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
        />{" "}
        | SA | Serie A | ITALY | LEAGUE
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
        />{" "}
        | PL | Premier League | ENGLAND | LEAGUE
        <br />
        <img height="15px" width="20px" src="" /> | CLI | Copa Libertadores |
        SOUTH AMERICA | CUP
      </div>
    </div>
  );
};

export default Competitions;
