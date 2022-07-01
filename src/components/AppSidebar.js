import "./AppSidebar.css";
import { Nav, ListGroup, NavLink } from "react-bootstrap";
import {
  AboutMeBtn,
  SkillsBtn,
  PortfolioBtn,
  StudentCardBtn,
  SocialsBtn,
} from "./SideBarButton";

function AppSidebar(props) {
  
  return (
    <div className = "ms-3">
      <Nav id="filters-nav">
        <ListGroup as="ul" id="filters-nav-list">
          
          <NavLink as="li" className="myContainer">
            <AboutMeBtn title={props.title}/>
          </NavLink>
          <NavLink as="li" className="myContainer">
            <SkillsBtn title={props.title}/>
          </NavLink>
          <NavLink as="li" className="myContainer">
            <PortfolioBtn title={props.title}/>
          </NavLink>
          <NavLink as="li" className="myContainer">
            <StudentCardBtn title={props.title}/>
          </NavLink>
          <NavLink as="li" className="myContainer">
            <SocialsBtn title={props.title}/>
          </NavLink>
        </ListGroup>
      </Nav>
    </div>
  );
}

export default AppSidebar;
