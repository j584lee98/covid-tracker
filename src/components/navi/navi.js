import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import styles from "./navi.module.css";
import { goToTop, goToAnchor } from "react-scrollable-anchor";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.navi}>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">COVID-19 Tracker</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#charts">Charts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#stats">Statistics</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/j584lee98/covid-tracker">Source</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;