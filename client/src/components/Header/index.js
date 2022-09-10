import { NavLink } from 'react-router-dom';
import { useState, useRef } from "react";
import propTypes from 'prop-types';
import AuthService from '../../services/auth.service';
import './styles.scss';

export default function Header({ currentUser, setCurrentUser }) {
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  const [isChecked, setCheck] = useState(false);

  const toggleMobileNav = () => {
    setCheck(!isChecked)
  };

  const logoutProcess = () => {
    logOut()
    toggleMobileNav();
  };

  return (
    <div className="nav_container">
      <span className="logo"><img className="logo__img" src="https://i89.servimg.com/u/f89/09/02/66/41/logo-p10.png" alt="Logo Ofood" /></span>
      <nav className="nav">
        <input type="checkbox"  onChange={toggleMobileNav} checked={isChecked} id="toggle-nav" />
        <label htmlFor="toggle-nav">
          <span className="bar bar-one" />
          <span className="bar bar-two" />
          <span className="bar bar-three" />
        </label>

        <ul className="nav__list">
          {!currentUser && (
          <NavLink className="nav__link" to="users/login">
            <li onClick={toggleMobileNav}>Se connecter</li>
          </NavLink>
          )}

          {!currentUser && (
          <NavLink className="nav__link" to="users/register">
            <li onClick={toggleMobileNav}>S'inscrire</li>
          </NavLink>
          )}

          {currentUser && (
          <NavLink className="nav__link" to="users/Dashboard">
            <li onClick={toggleMobileNav}>Dashboard</li>
          </NavLink>
          )}

          {currentUser && (
          <NavLink className="nav__link" to="profil/1">
            <li onClick={toggleMobileNav}>Profil</li>
          </NavLink>
          )}

          {currentUser && (
          <NavLink className="nav__link" to="users/login" onClick={logoutProcess}>
            <li onClick={toggleMobileNav}>Déconnexion</li>
          </NavLink>
          )}
        </ul>
      </nav>
    </div>
  );
}

Header.propTypes = {
  currentUser: propTypes.object.isRequired,
  setCurrentUser: propTypes.func.isRequired,
};
