import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  List,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 col-xs-12 m-1">
      <Card>
        <CardImg top width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle tag="h5">{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  if (comments != null && comments.length > 0) {
    return comments.map((cmt) => {
      return (
        <li key={cmt.id} className="mt-4">
          <div>{cmt.comment}</div>
          <code>
            --{cmt.author},
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(cmt.date))}
          </code>
        </li>
      );
    });
  } else {
    return <li></li>;
  }
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
        </div>

        <RenderDish dish={props.dish} />
        <List type="unstyled" className="col-md-5 col-xs-12 m-1">
          <h4>Comments</h4>
          <RenderComments comments={props.comments} />
        </List>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
