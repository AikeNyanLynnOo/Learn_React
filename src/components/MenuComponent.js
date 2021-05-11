import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card onClick={() => onClick(dish.id)}>
      <CardImg top width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle tag="h5">{dish.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {dish.label}
        </CardSubtitle>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
}

const Menu = (props) => {
  const menu = props.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    );
  });
  return menu;
};

export default Menu;
