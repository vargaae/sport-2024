import "./event-page.styles.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
// import { makeStyles } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import {
  footballApi,
  useGetMatchDetailsQuery,
} from "../features/Api/FootballApi";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 600,
//     backgroundColor: "#2B2D2F",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   heading: {
//     fontWeight: "bold",
//     marginBottom: 20,
//     fontFamily: "Montserrat",
//     textAlign: "center",
//     color: "white",
//   },
//   description: {
//     width: "100%",
//     fontFamily: "Montserrat",
//     padding: 25,
//     paddingBottom: 15,
//     paddingTop: 0,
//     textAlign: "center",
//     color: "white",
//   },
// }));

const EventPage = (matchId) => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: match,
    isFetching,
    error,
    refetch,
  } = useGetMatchDetailsQuery(id);
  const [count, setCount] = useState(0);

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

  if (isFetching) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <>
      <Typography
        variant="subtitle1"
        className="breadcrumbs"
        style={{
          fontWeight: "bold",
          fontFamily: "Montserrat",
          color: "white",
        }}
      >
        <Link to="/">COMPETITONS</Link> {">"}{" "}
        <Link to={`/${match?.competition?.id}`}>
          {match?.competition?.name}
        </Link>{" "}
        {">"} {match?.group} {match?.homeTeam?.name} - {match?.awayTeam?.name}{" "}
        MATCH'S DETAILS
      </Typography>
      <div className="container">
        <Card className="root" style={{ maxWidth: 600 }}>
          <CardActionArea>
            <CardContent>
              <Typography
                variant="h4"
                className="title"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "#2B2D2F",
                }}
              >
                <a href="">
                  {match?.group} {match?.homeTeam?.name} -{" "}
                  {match?.awayTeam?.name}
                </a>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Typography variant="subtitle1" className="title">
          {new Date(match?.utcDate).toLocaleString()}
        </Typography>
        <Typography variant="h5" className="description">
          MATCH STATUS: {match?.status}
        </Typography>
        <Typography variant="subtitle1" className="title">
          Match Clock
        </Typography>
        <Typography variant="h5" className="description">
          {match?.score?.duration}{" "}
        </Typography>
        <Typography variant="subtitle1" className="title">
          SCORE
        </Typography>
        <Typography variant="h5" className="description">
          {match?.homeTeam?.name}{" "}
          <span className="score">
            {match?.score?.fullTime.home} - {match?.score?.fullTime.away}
          </span>{" "}
          {match?.awayTeam?.name}
        </Typography>
        <Typography variant="subtitle1" className="title">
          First Half
        </Typography>
        <Typography variant="h5" className="description">
          {match?.homeTeam?.name}{" "}
          <span className="score">
            {match?.score?.halfTime.home} - {match?.score?.halfTime.away}
          </span>{" "}
          {match?.awayTeam?.name}
        </Typography>
        <Typography variant="subtitle1" className="title">
          Second Half
        </Typography>
        <Typography variant="h5" className="description">
          {match?.homeTeam?.name}{" "}
          <span className="score">
            {match?.score?.fullTime.home} - {match?.score?.fullTime.away}
          </span>{" "}
          {match?.awayTeam?.name}
        </Typography>
      </div>
    </>
  );
};

export default EventPage;
