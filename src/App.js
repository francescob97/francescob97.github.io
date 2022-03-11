import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";
import { useState } from 'react';
import AppSidebar from "./components/AppSidebar";
import { AppNavbar } from "./components/AppNavbar";
import { AboutMePage } from "./components/AboutMe";
import { SkillsPage } from "./components/Skills";
import { PortfolioPage } from "./components/Portfolio";
import { StudentCardPage } from "./components/StudentCard";
import { SocialsPage } from "./components/Socials";
import { ProjectPage } from "./components/Project";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import projectsThumbnail from "./components/projectsThumbnails.json";
import projects from "./components/projects.json";

function App() {
  const [title, setTitle] = useState("AboutMe");

  const updateTitle = (newTitle) => {
    setTitle(newTitle);
  };


  return (
    <Router >
      <Container fluid className="AppBk m-0 p-0">
        <div id="body" class="pt-3 px-3">
          <AppNavbar />
          <Row>
            <Col md={3}>
              <AppSidebar title={title}/>
            </Col>

            <Switch>
              <Col md={7}>

              <h2><b>{title}</b></h2>

              <Route exact path="/" render={() => (
                <Redirect to='/AboutMe' />
              )} />

              <Route path="/AboutMe" render={() => (
                  <AboutMePage updateTitle={updateTitle}/>                  
              )} />

              <Route path="/Skills" render={() => (
                  <SkillsPage updateTitle={updateTitle}/>              
              )} />

              <Route exact path="/Portfolio" render={() => (
                  <PortfolioPage updateTitle={updateTitle} projects ={projectsThumbnail}/>              
              )} />

              <Route path="/StudentCard" render={() => (
                  <StudentCardPage updateTitle={updateTitle}/>              
              )} />

              <Route path="/Socials" render={() => (
                  <SocialsPage updateTitle={updateTitle}/>              
              )} />

              <Route exact path="/Portfolio/:ID" render={({ match }) => (
                <>{projects.length === 0 ? <Redirect to="/" /> :   
                        <ProjectPage updateTitle={updateTitle} project={projects.filter((p) => p.id === match.params.ID)[0]}/>
                }
                </>
              )}/>         
                
              </Col>
              <Route>
                <Redirect to='/AboutMe'/>
              </Route>
            </Switch>
          </Row>
        </div>
      </Container>
    </Router>
  );
}

export default App;
