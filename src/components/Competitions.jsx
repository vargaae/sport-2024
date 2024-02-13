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

// const useStyles = makeStyles({
//   root: {
//     textAlign: "center",
//     color: "#3f51b5",
//   },
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     width: "100%",
//     fontFamily: "Montserrat",
//     padding: 25,
//     paddingBottom: 15,
//     paddingTop: 10,
//     textAlign: "justify",
//   },
//   competitionlist: {
//     padding: 32,
//     paddingBottom: 10,
//     paddingTop: 10,
//   },
//   codelist: {
//     lineHeight: 2,
//   },
// });

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
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          fontFamily: "Montserrat",
          padding: 25,
          paddingBottom: 15,
          paddingTop: 10,
          textAlign: "justify",
        }}
      >
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

     {/* <ul class="brands ">
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/CL/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/logo_cl.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Champions League</div>
                                        <div class="brand-item-type">Europe</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/PPL/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/portugueseprimeradivision.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Primeira Liga</div>
                                        <div class="brand-item-type">Portugal</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/PL/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/logo_premier_league.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Premier League</div>
                                        <div class="brand-item-type">England</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/DED/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/logo_eredivisie.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Eredivisie</div>
                                        <div class="brand-item-type">Netherlands</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/BL1/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/logo_bundesliga.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Bundesliga</div>
                                        <div class="brand-item-type">Germany</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/FL1/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/logo_ligue_1.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Ligue 1</div>
                                        <div class="brand-item-type">France</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/SA/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/logo_serie_a.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Serie A</div>
                                        <div class="brand-item-type">Italy</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/PD/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/logo_laliga.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">La Liga</div>
                                        <div class="brand-item-type">Spain</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/ELC/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/championship.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Championship</div>
                                        <div class="brand-item-type">England</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/BSA/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/logo_brazil_serie_a.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Serie A</div>
                                        <div class="brand-item-type">Brazil</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/WC/');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(https://crests.football-data.org/qatar.png)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Worldcup</div>
                                        <div class="brand-item-type">World</div>
                                    </div>
                                </div>
                            </li>
                            <li class="brand-item">
                                <div onclick="window.open('https://native-stats.org/competition/EC/2021');" style="cursor: pointer;" class="brand-item-link">
                                    <div class="brand-item-image" style="background-image:url(/assets/logo-euro_2020.svg)"></div>
                                    <div class="brand-item-footer helper center">
                                        <div class="brand-item-name">Europe</div>
                                        <div class="brand-item-type">European Championships</div>
                                    </div>
                                </div>
                            </li>
        </ul> */}
        <img height="15px" width="20px" src="" /> | WC | FIFA World Cup
        <br />
        <img height="15px" width="20px" src="" /> | CL | UEFA Champions League
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
        />{" "}
        | BL1 | Bundesliga
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg"
        />{" "}
        | DED | Eredivisie
        <br />
        <img height="15px" width="20px" src="" /> | BSA | Campeonato Brasileiro
        Série A
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"
        />{" "}
        | PD | Primera Division
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg"
        />{" "}
        | FL1 | Ligue 1
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
        />{" "}
        | ELC | Championship
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"
        />{" "}
        | PPL | Primeira Liga
        <br />
        <img height="15px" width="20px" src="" /> | EC | European Championship
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
        />{" "}
        | SA | Serie A
        <br />
        <img
          height="15px"
          width="20px"
          src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
        />{" "}
        | PL | Premier League
        <br />
        <img height="15px" width="20px" src="" /> | CLI | Copa Libertadores
      </div>
    </div>
  );
};

export default Competitions;
