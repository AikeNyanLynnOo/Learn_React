import React from "react";
import { Navbar, NavbarBrand, Jumbotron, Button } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar dark>
          <div className="container">
            <NavbarBrand href="/">Hungry Boy - Cake and Bakery</NavbarBrand>
          </div>
        </Navbar>
        <div className="container">
          <Jumbotron>
            <h1 className="display-3">Hello, world!</h1>
            <p className="lead">
              This is a simple hero unit, a simple Jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <hr className="my-2" />
            <p>
              It uses utility classes for typography and spacing to space
              content out within the larger container.
            </p>
            <p className="lead">
              <Button color="primary">Learn More</Button>
            </p>
          </Jumbotron>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
