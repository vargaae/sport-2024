import React, { useState } from "react";

import "./leagues-page.styles.scss";

import { useDispatch } from "react-redux";
import {
  sportApi,
  useGetCompetitionsQuery,
  useGetMatchesQuery
} from "./../features/Api/SportApi";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";

const LeaguesPage = (matchId) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: competitions,
    isFetching,
    error,
    refetch,
  } = useGetCompetitionsQuery(id);

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
      sportApi.endpoints.getCompetitions.initiate(
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
        {competitions?.Ccg
          .map((league) => {
            return (
              <Link to={`/${id}/${league.Ccd}`} key={league.Cid}>
                <div className="competitionlist">
                  <span>{league?.Cnm}</span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default LeaguesPage;
