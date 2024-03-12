import "./competitions.styles.scss";
import { Link } from "react-router-dom";
import { sports } from "../constants/sports";

const Competitions = () => {
  return (
    <div className="root">
    <div className="container">
      <h2>Available Competitions</h2>
      {sports?.competitions
        .filter((league) => league?.plan === "ready")
        .map((league) => {
          return (
            <Link to={`/${league.name}`} key={league.name}>
              <div className="competitionlist">
                <span>{league?.name}</span>
              </div>
            </Link>
          );
        })}
    </div>
  </div>
  )
}

export default Competitions
