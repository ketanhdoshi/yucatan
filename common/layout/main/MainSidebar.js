/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "./img/reactlogo.png";
import s from './scss/MainSidebar.scss'

function MainSidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? s.active : "";
  };
  return (
    <div className={s.sidebar} data-image={image} data-color={color}>
      <div
        className={s.sidebarBackground}
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className={s.sidebarWrapper}>
        <div className={s.logo + " d-flex align-items-center justify-content-start"}>
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className={s.simpleText + " logo-mini mx-1"}
          >
            <div className={s.logoImg}>
              {<img src={logo} alt="..." className={s.logoImg}/>}
            </div>
          </a>
          <a className={s.simpleText} href="http://www.creative-tim.com">
            Creative Tim
          </a>
        </div>
        <Nav className={s.nav}>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? s.activePro
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className={s.navLink}
                    activeClassName="active"
                  >
                    <i className={prop.icon + " " + s.sidebarNavIcon} />
                    <p className={s.sidebarNavName}>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default MainSidebar;
