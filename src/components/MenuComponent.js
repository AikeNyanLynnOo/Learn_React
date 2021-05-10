import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDish: null };
  }

  onSelectDish(dish) {
    this.setState({
      selectedDish: dish,
    });
  }

  renderDish(dish) {
    if (dish != null) {
      return (
        <Card>
          <CardImg top width="50%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardText>{dish.description}</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onSelectDish(dish)}>
            <CardImg top width="100%" src={dish.image} alt={dish.name} />
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
    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">{this.renderDish(this.state.selectedDish)}</div>
      </div>
    );
  }
}

export default Menu;
