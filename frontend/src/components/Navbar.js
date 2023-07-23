import * as React from "react";
import navbar from '../styles/navbar.module.css'

const Navbar = () => {


  return (
    <>
      <div className={navbar.navbar__section}>
        <div className="nav__list">
          <ul className={navbar.nav__items}>
            <li className={`${navbar.nav__item} ${navbar.pseudo_border}`}>HOME</li>
            <li className={navbar.nav__item}>IDE</li>
            <li className={navbar.nav__item}>ABOUT US</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
