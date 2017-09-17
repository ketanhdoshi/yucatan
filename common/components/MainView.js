// -----------------------------------------------------------------
// Presentational component for all logged-in pages across the app
// Has the basic overall skeleton layout into which all screens are placed
// Layout contains Navbar, Sidebar and a Content area. Most screens
// will populate themselves in the Content area. 
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import App from './widgets/App'
import Header from './widgets/Header'
import AppBody from './widgets/AppBody'
import Footer from './widgets/Footer'

import Navbar from './widgets/Navbar'
import Sidebar from './widgets/Sidebar'
import ContentHeader from './widgets/ContentHeader'

//import s from '../scss/Main.scss'
//import '../scss/General.css'

const MainView = ({ first, children, onDummyClick }) => (
    <App>
        <Header />
        <AppBody />
        <Footer msg="This is my footer"/>
    </App>
)

const OldView = ({ first, children, onDummyClick }) => (
    <div>
        <Navbar brand={first}/>
        <div className="container-fluid">
            <div className={"row " + s.main}>
                <Sidebar />
                <div className={"col-xs-12 col-sm-9 " + s.content}>
                    <ContentHeader header="Stuff"/>
                    {children}
                </div>
            </div>
    
            <Footer msg="This is my footer"/>
        </div>
    </div>
)

MainView.propTypes = {
  first: PropTypes.string.isRequired,
  onDummyClick: PropTypes.func.isRequired
}

export default MainView


// -----------------------------------------------------------------
// Navbar - has two sections: Logo and Menu, and an external Toggle button
//  On Desktop - Logo section collapses on Toggle
//  On Mobile - Logo section becomes full width top row and
//              Menu section becomes full width second row
// 
// Drawer - has an external Toggle button
//  On Desktop - Drawer collapses on Toggle
//  On Mobile - Drawer becomes off-canvas
//              Drawer slides on-canvas on Toggle and "pushes" Content
//              
// Aside - has an external Toggle button
//  On Desktop - Aside slides on-canvas on Toggle and "overlaps" Content
//  On Mobile - Aside slides on-canvas on Toggle and "overlaps" Content

// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Structure of Container components for primary layout
// 
// <Body>
//      <App>
//          <Header>
//              <Navbar>
//                  <NavbarHeader>
//                      <NavbarLogo />
//                      <NavbarToggle />
//                  </NavbarHeader>
//                  <NavbarMain>
//                      <NavbarMenu />  // Contains Dropdown Menus or Tabs
//                      <NavbarStatus />
//                          <Notifications />
//                          <LoggedInUserStatus />
//                          <UserSettings />
//                  </NavbarMain>
//              </Navbar>
//          </Header>
//          <AppBody>
//              <Sidebar Drawer = offCanvas collapsing /> // Use Drawer terminlogy instead of offCanvas
//                  <UserPanel />
//                  <SearchBar />
//                  <SidebarMenu />
//                      <Application />
//                          <Dashboards />
//                          <HousePropertyScreen />
//                      <Forms />
//                          <StandardControls />
//                          <AdvancedControls />
//                              <RichTextEditor />
//                      <StandardWidgets />
//                          <Buttons />
//                          <ProgressBar />
//                          <Modals />
//                          <Alerts and Dialogs />
//                          <Lists />
//                          <Sliders />
//                          <Gauges, Switches and Knobs />
//                          <Tooltips />
//                          <Carousel />
//                          <Slideshow />
//                          <ImageGallery />
//                      <Navigations />
//                          <DropdownMenus />
//                          <Tabs />
//                          <AppLauncher />
//                      <CompositeComponents />
//                          <Social />
//                          <Chat />
//                          <Cards and InfoBoxes />
//                      <Tables />
//                      <Charts />
//                      <AdvancedComponents />
//                          <GoogleCalendar />
//                          <Calendar />
//                          <DatePicker />//                      
//                      <Pages />
//                          <LoginPage />
//                          <RegistrationPage />
//                          <ForgotPasswordPage />
//                          <ResetPasswordPage />
//                          <InvoicePage />
//                          <MailCompose />
//                          <MailList />
//                      <Experiments />
//                          <Redux />
//              <Content>
//                  <ContentHeader>
//                      <Breadcrumb routes={this.props.routes} params={this.props.params} />
//                      <TitleHeading /> 
//                  </ContentHeader>
//                  <ContentMain>
//                  </ContentMain>
//              </Content>
//              <Aside />
//          </AppBody>
//          <Footer />//      
//      </App>
// </Body>
// -----------------------------------------------------------------
