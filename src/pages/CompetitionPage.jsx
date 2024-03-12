import React, { useState } from "react";
import "./competition-page.styles.scss";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { sportApi, useGetMatchesQuery } from "../features/Api/SportApi";
// import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

// const useStyles = makeStyles((theme) => ({
//   card: {
//     backgroundColor: "gold",
//     margin: 10,
//   },
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
// }));

const CompetitionPage = () => {
  // const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: matches, isFetching, error, refetch } = useGetMatchesQuery(id);
  const [count, setCount] = useState(0);

  const [pageUpcomingMatches, setPageUpcomingMatches] = React.useState(0);
  const [rowsPerPageUpcomingMatches, setRowsPerPageUpcomingMatches] =
    React.useState(10);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePageUpcomingMatches = (event, newPage) => {
    setPageUpcomingMatches(newPage);
  };

  const handleChangeRowsPerPageUpcomingMatches = (event) => {
    setRowsPerPageUpcomingMatches(+event.target.value);
    setPageUpcomingMatches(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
        <Link to="/">COMPETITONS</Link> {">"} {matches?.competition?.name}{" "}
        MATCHES
      </Typography>
      <div className="container">
        <span className="live">
          {matches?.matches.filter((league) => league?.status === "LIVE") == ""
            ? "There is no Live Match"
            : "LIVE Matches"}
        </span>

        {matches?.matches
          .filter((league) => league?.status === "LIVE")
          .map((league) => {
            return (
              <Link to={`${league.id}`} key={league?.id}>
                <Card className="card">
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {league?.homeTeam?.name}{" "}
                        <span className="score">
                          {league?.score?.fullTime.home} -{" "}
                          {league?.score?.fullTime.away}
                        </span>{" "}
                        {league?.awayTeam?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {league?.group}{" "}
                        {new Date(league?.utcDate).toLocaleString()}
                        <span className="status live">{league?.status}</span>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            );
          })}
        <Paper
          sx={{
            width: "95%",
            overflow: "hidden",
            backgroundColor: "#2B2D2F",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="competitions table">
              <TableHead>
                <TableRow>
                  <TableCell>Upcoming Matches</TableCell>
                  <TableCell align="right">Score</TableCell>
                  <TableCell align="right">Group</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matches?.matches
                  .filter((league) => league?.status === "SCHEDULED")
                  .slice(
                    pageUpcomingMatches * rowsPerPageUpcomingMatches,
                    pageUpcomingMatches * rowsPerPageUpcomingMatches +
                      rowsPerPageUpcomingMatches
                  )
                  .map((league) => {
                    return (
                      <TableRow
                      hover
                      role="checkbox"
                        tabIndex={-1}
                        key={league?.id}
                      >
                        <TableCell component="th" scope="row">
                          <Link to={`${league.id}`}>
                            {league?.homeTeam?.name} - {league?.awayTeam?.name}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`${league.id}`}>
                            {league?.score?.fullTime.home} -{" "}
                            {league?.score?.fullTime.away}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`${league.id}`}>{league?.group}</Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`${league.id}`}>
                            {new Date(league?.utcDate).toLocaleString()}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`${league.id}`} className="status">
                            {league?.status}
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={
              matches?.matches.filter(
                (league) => league?.status === "SCHEDULED"
              ).length
            }
            rowsPerPage={rowsPerPageUpcomingMatches}
            page={pageUpcomingMatches}
            onPageChange={handleChangePageUpcomingMatches}
            onRowsPerPageChange={handleChangeRowsPerPageUpcomingMatches}
          />
        </Paper>
        <Paper
          sx={{ width: "95%", overflow: "hidden", backgroundColor: "#2B2D2F" }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="competitions table">
              <TableHead>
                <TableRow>
                  <TableCell>Ongoing Matches</TableCell>
                  <TableCell align="right">Score</TableCell>
                  <TableCell align="right">Group</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matches?.matches
                  .filter((league) => league?.status === "FINISHED")
                  .slice()
                  .sort(function (a, b) {
                    return new Date(b.utcDate) - new Date(a.utcDate);
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((league) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={league?.id}
                      >
                        <TableCell component="th" scope="row">
                          <Link to={`${league.id}`}>
                            {league?.homeTeam?.name} - {league?.awayTeam?.name}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`${league.id}`}>
                            {league?.score?.fullTime.home} -{" "}
                            {league?.score?.fullTime.away}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`${league.id}`}>{league?.group}</Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`${league.id}`}>
                            {new Date(league?.utcDate).toLocaleString()}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`${league.id}`} className="status">
                            {league?.status}
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={
              matches?.matches.filter((league) => league?.status === "FINISHED")
                .length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default CompetitionPage;
