/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Label, Col, Button, Row } from "reactstrap";
import { Control, Form, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => val && val.length <= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    alert("Current state is" + JSON.stringify(values));
    this.props.postFeedback(
      values.firstname,
      values.lastname,
      values.email,
      values.telnum,
      values.agree,
      values.contactType,
      values.message
    );
    this.props.resetFeedbackForm();
  }

  render() {
    return (
      <div className="container">
        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone"></i>: +852 1234 5678
              <br />
              <i className="fa fa-fax"></i>: +852 8765 4321
              <br />
              <i className="fa fa-envelope"></i>:{" "}
              <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone"></i> Call
              </a>
              <a role="button" className="btn btn-info" href="#">
                <i className="fa fa-skype"></i> Skype
              </a>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
              >
                <i className="fa fa-envelope-o"></i> Email
              </a>
            </div>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Send Your Feedback</h3>
          </div>
          <div className="col-10 md-9">
            <Form
              model="feedback"
              onSubmit={(values) => this.handleSubmit(values)}
            >
              <Row className="form-group mt-3 mb-3">
                <Label md={2} htmlFor="firstname">
                  First Name
                </Label>
                <Col md={10}>
                  <Control.text
                    className="form-control"
                    model=".firstname"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".firstname"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Should be at least 2 letters",
                      maxLength: "Should be at most 15 letters",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group mt-3 mb-3">
                <Label md={2} htmlFor="lastname">
                  Last Name
                </Label>
                <Col md={10}>
                  <Control.text
                    className="form-control"
                    model=".lastname"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".lastname"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Should be at least 2 letters",
                      maxLength: "Should be at most 15 letters",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group mt-3 mb-3">
                <Label md={2} htmlFor="email">
                  Email
                </Label>
                <Col md={10}>
                  <Control.text
                    className="form-control"
                    model=".email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    validators={{
                      required,
                      validEmail,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".email"
                    show="touched"
                    messages={{
                      required: "Required ",
                      validEmail: "Invalid Email",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group mt-3 mb-3">
                <Label md={2} htmlFor="telnum">
                  Tel. Num
                </Label>
                <Col md={10}>
                  <Control.text
                    className="form-control"
                    model=".telnum"
                    id="telnum"
                    name="telnum"
                    placeholder="Tel. Number"
                    validators={{
                      required,
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".telnum"
                    show="touched"
                    messages={{
                      required: "Required ",
                      validEmail: "Phone number should include only numbers",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group mt-3 mb-3">
                <Col md={{ size: 6, offset: 2 }}>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox
                        className="form-check-input"
                        model=".agree"
                        name="agree"
                      />{" "}
                      <strong>May we contact you?</strong>
                    </Label>
                  </div>
                </Col>
                <Col md={{ size: 3, offset: 1 }}>
                  <Control.select
                    className="form-select"
                    model=".contactType"
                    name="contactType"
                  >
                    <option>Tel.</option>
                    <option>Email</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group mt-3 mb-3">
                <Label htmlFor="message" md={2}>
                  Your Feedback
                </Label>
                <Col md={10}>
                  <Control.textarea
                    className="form-control"
                    model=".message"
                    id="message"
                    name="message"
                    rows="12"
                  ></Control.textarea>
                </Col>
              </Row>
              <Row className="form-group mt-3 mb-3">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button className="m-1" type="submit" color="primary">
                    Send Feedback
                  </Button>
                  <Button
                    outline
                    color="primary"
                    className="m-1"
                    onClick={this.props.resetFeedbackForm}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
