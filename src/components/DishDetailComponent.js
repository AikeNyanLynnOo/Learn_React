import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, List } from "reactstrap";

class DishDetail extends React.Component {
  renderDish(dish) {
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

  renderComments(comments) {
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

  render() {
    if (this.props.dish != null) {
      return (
        <div className="row">
          {this.renderDish(this.props.dish)}

          <List type="unstyled" className="col-md-5 col-xs-12 m-1">
            <h4>Comments</h4>
            {this.renderComments(this.props.dish.comments)}
          </List>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
