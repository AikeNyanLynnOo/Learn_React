import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

class Menu extends React.Component {
  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={()=>this.props.onClick(dish.id)}>
            <CardImg
              top
              width="100%"
              src={dish.image}
              alt={dish.name}
            />
            <CardBody>
              <CardTitle tag="h5">{dish.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {dish.label}
              </CardSubtitle>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </div>
      );
    });
    return menu
  }
}

export default Menu;
