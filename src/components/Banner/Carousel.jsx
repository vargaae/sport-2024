import React from "react";
import "./carousel.styles.scss";
import { useDispatch } from "react-redux";
// import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import {
  footballApi,
  useGetCompetitionsQuery,
} from "../../features/Api/FootballApi";

// const useStyles = makeStyles((theme) => ({
//   carousel: {
//     height: "50%",
//     display: "flex",
//     alignItems: "center",
//   },
//   carouselItem: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     cursor: "pointer",
//     texTransform: "uppercase",
//     color: "white",
//     paddingTop: "1rem",
//     paddingBottom: "1rem",
//     background: "rgba(0, 0, 0, 0.2)",
//     borderRadius: "1rem",
//   },
// }));

const demoImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlt94EjayRbU_oim_ZJzHHODBNDhCDQzaUIw&usqp=CAU";

const Carousel = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const { data: competitions, error, refetch } = useGetCompetitionsQuery();

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

  const responsive = {
    0: { items: 2 },
    512: { items: 6 },
  };

  const items = competitions?.competitions
    .filter((league) => league?.plan === "TIER_ONE")
    .map((league) => {
      return (
        <Link className="carouselItem" to={`/${league.id}`}>
          <img
            src={league?.emblem || demoImage}
            alt={league.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span>
            {league?.name}
            &nbsp;
          </span>
        </Link>
      );
    });

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        autoPlay
        autoPlayStrategy="none"
        autoPlayInterval={3000}
        animationDuration={1500}
        animationType="fadeout"
        infinite
        disableButtonsControls
        disableDotsControls
      />
    </div>
  );
};

export default Carousel;
