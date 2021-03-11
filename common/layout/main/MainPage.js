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

import React from "react";
import { useLocation, Link, Route, Switch } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import MainHeader from "./MainHeader"
import MainFooter from "./MainFooter"
import MainSidebar from "./MainSidebar";
import routes from "./routes.js";

/*
import "./assets/css/light-bootstrap-dashboard-react.css";
import "./assets/css/demo.css"; */

import sidebarImage from "./img/sidebar-3.jpg";
import './scss/AppGlobal.scss'
import s from './scss/MainPage.scss'

const MainPage = () => {
  console.log ("MainPage ");
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/main") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className={s.wrapper}>
        <MainSidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className={s.mainPanel} ref={mainPanel}>
          <MainHeader />
          <h1>Main Layout</h1>
          <Link to="/home">Home</Link>
          <Button variant="primary">Main Button</Button>
          <div className={s.content}>
            {/* <Switch>{getRoutes(routes)}</Switch> */}
          </div>
          <MainFooter />
        </div>
      </div>
    </>
  );  
/*   const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className={s.wrapper}>
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <h1>Admin Layout</h1>
          <Link to="/home">Home</Link>
          <Button variant="primary">Primary</Button>
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  ); */
}

/* 
function Admin() {
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
} */

export default MainPage;
