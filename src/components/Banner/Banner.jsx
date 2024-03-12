import React from "react";
import "./banner.styles.scss";
// import { makeStyles } from "@mui/styles";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

// const useStyles = makeStyles(() => ({
//   banner: {
//     backgroundImage: "url(./banner.jpg)",
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center",
//     backgroundSize: "cover",
//   },
//   bannerContent: {
//     display: "flex",
//     flexDirection: "column",
//     paddingTop: 25,
//     justifyContent: "space-around",
//   },
//   tagline: {
//     display: "flex",
//     height: "40%",
//     flexDirection: "column",
//     justifyContent: "center",
//     textAlign: "center",
//   },
// }));

const Banner = () => {
  // const classes = useStyles();
  return (
    <div
      className="banner"
      style={{
        backgroundImage: "url(./banner.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>
      <Container className="bannerContent">
        <div className="tagline">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            SportDATA Application
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              color: "white",
            }}
          >
            Keep track of information about sport competitions
          </Typography>
          <Carousel />
        </div>
      </Container>
    </div>
  );
};

export default Banner;
