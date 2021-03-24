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

// Reimplement nav-open in a React-like way - where nav-open is a state of the component, and maybe gets passed as a prop
// See where we can use simple react-bootstrap settings without customization, especially in the css. eg. Navbar Toggle doesn't need our own burger-lines and stuff.

import React from "react";
import { useLocation, Link, Route, Switch } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import MainHeader from "./MainHeader"
import MainFooter from "./MainFooter"
import MainSidebar from "./MainSidebar";
import routes from "./routes.js";

import sidebarImage from "./img/sidebar-3.jpg";
import './scss/NucleoFont.css'
import './scss/AppGlobal.scss'
import s from './scss/MainPage.scss'

const MainPage = () => {
  console.log ("MainPage ");
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
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

  // Slide the Sidebar out of view on mobile devices when you click on a menu
  // item in the Sidebar. This works in partnership with the mobileSidebarToggle
  // function in the MainHeader - that function is primarily responsible for sliding
  // the Sidebar in and out. That function slides the Sidebar out if you click in the
  // body, but it doesn't do anything if you click in the Sidebar itself to select a
  // menu item. So we take care of that case here. THe Effect gets triggered only if the
  // 'location' changes - this happens if you select a menu item in the Sidebar that
  // now routes to a different page.
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    // If we are on mobile and the Sidebar is open
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("navopen") !== -1
    ) {
      // Slide the Sidebar out by removing the 'navopen' class from the <html> tag and 
      // the 'bodyClick' div from the <body> tag
      document.documentElement.classList.toggle("navopen");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  // Tell the Effect to fire only if 'location' changes
  }, [location]);

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
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <MainFooter />
        </div>
      </div>
    </>
  );  
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
