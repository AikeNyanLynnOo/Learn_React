/* eslint-disable react/jsx-pascal-case */
import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  List,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";

import { LocalForm, Control, Errors } from "react-redux-form";

import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && val.length >= 3;
const maxLength = (len) => (val) => !val || val.length <= 15;

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 col-xs-12 m-1">
      <Card>
        <CardImg top width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle tag="h5">{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, postComment, dishId, errMessage }) {
  if (!errMessage) {
    const Comments = comments.map((cmt) => {
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
    return (
      <React.Fragment>
        {Comments}
        <CommentForm postComment={postComment} dishId={dishId} />
      </React.Fragment>
    );
  }
  return <p className="alert alert-danger">{errMessage}</p>;
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    // alert("Current state is " + JSON.stringify(values));
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <div className="mt-5">
        <Button outline color="primary" onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span>
          Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  className="form-select"
                  model=".rating"
                  id="rating"
                  name="rating"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>

              <div className="form-group mt-3">
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  className="form-control"
                  model=".author"
                  id="author"
                  name="author"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                ></Control.text>
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "This field is required ! ",
                    minLength: "Name should include at least 3 letters",
                    maxLength: "Name must include at most 15 letters",
                  }}
                ></Errors>
              </div>
              <div className="form-group mt-3">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  className="form-control"
                  model=".comment"
                  rows="6"
                  id="comment"
                  name="comment"
                ></Control.textarea>
              </div>
              <Button className="mt-3" color="primary" type="submit">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMessage) {
    return (
      <div className="container">
        <div className="row">
          <p className="alert alert-danger">{props.errMessage}</p>
        </div>
      </div>
    );
  } else if (props.dish != null) {
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
          <RenderComments
            comments={props.comments}
            errMessage={props.commentErrMessage}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </List>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
