import React from "react";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__item footer__item--start">
        <ul className="footer__list">
          <li>
            Data from{" "}
            <a
              href="https://rapidapi.com/"
              target="_blank"
              rel="noreferrer"
            >
              RAPID API
            </a>
          </li>
          <li>Competitions</li>
          <li>Matches</li>
          <li>by Andras Varga</li>
          <li>2024</li>
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
