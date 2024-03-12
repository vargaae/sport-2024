import React, { useState } from "react";
import "./competitions.styles.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { makeStyles } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";
import {
  footballApi,
  useGetCompetitionsQuery,
} from "./../features/Api/FootballApi";

import axios from 'axios'

const Competitions = () => {
  // const classes = useStyles();

  const dispatch = useDispatch();
  const {
    data: competitions,
    isFetching,
    error,
    refetch,
  } = useGetCompetitionsQuery();
  // Avaible Competitions' data -> FREE TIER: fetch football-data.org API
  // -> features/Api/competitions.json -> filter data-> "plan": "TIER_ONE"


  const [players, setPlayers] = useState(0);




  const [count, setCount] = useState('');

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
    </div>
  );
};

export default Competitions;
