import React from "react";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__item footer__item--start">
        <ul className="footer__list">
          <li>
            Data from{" "}
            <a
              href="https://www.football-data.org/"
              target="_blank"
              rel="noreferrer"
            >
              football-data.org API
            </a>
          </li>
          <li>Competitions</li>
          <li>Matches</li>
        </ul>
      </div>

      <div className="footer__item footer__item--end">
        <h2>SportDATA Web Application</h2>
        <p>Keep track of information about sport competitions</p>
      </div>
    </section>
  );
};

export default Footer;
