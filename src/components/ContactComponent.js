import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      agree: true,
      contactType: "Tel.",
      message: "",
      blur: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleBlur = (field) => (event) => {
    this.setState({
      blur: {
        ...this.state.blur,
        [field]: true,
      },
    });
  };

  validate(firstname, lastname, telnum, email) {
    const errors = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      btn: false,
    };
    const reg = /^\d+$/;

    if (this.state.blur.firstname && this.state.firstname.length < 3) {
      errors.firstname = "First Name should contains at least 3 letters";
    }
    if (this.state.blur.lastname && this.state.lastname.length < 3) {
      errors.lastname = "Last Name should contains at least 3 letters";
    }
    if (this.state.blur.telnum && !reg.test(this.state.telnum)) {
      errors.telnum = "Tel. Number must contain only numbers";
    }
    if (
      this.state.blur.email &&
      this.state.email.split("").filter((ch) => ch === "@").length !== 1
    ) {
      errors.email = "Email should contain @ sign";
    }
    if (
      this.state.blur.email &&
      this.state.email.split("").filter((ch) => ch === ".").length < 1
    ) {
      errors.email = "Email should contain at least 1 dot sign";
    }
    if (errors.firstname || errors.lastname || errors.telnum || errors.email) {
      errors.btn = true;
    }
    return errors;
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Current state is" + JSON.stringify(this.state));
  }

  render() {
    const errors = this.validate(
      this.state.firstname,
      this.state.lastname,
      this.state.telnum,
      this.state.email
    );
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
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label md={2} htmlFor="firstname">
                  First Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    value={this.state.fastname}
                    valid={errors.firstname === ""}
                    invalid={errors.firstname !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur("firstname")}
                  />
                  <FormFeedback>{errors.firstname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={2} htmlFor="lastname">
                  Last Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    value={this.state.lastname}
                    valid={errors.lastname === ""}
                    invalid={errors.lastname !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur("lastname")}
                  />
                  <FormFeedback>{errors.lastname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={2} htmlFor="email">
                  Email
                </Label>
                <Col md={10}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    valid={errors.email === ""}
                    invalid={errors.email !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur("email")}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={2} htmlFor="telnum">
                  Tel. Num
                </Label>
                <Col md={10}>
                  <Input
                    type="tel"
                    id="telnum"
                    name="telnum"
                    placeholder="Tel. Number"
                    value={this.state.telnum}
                    valid={errors.telnum === ""}
                    invalid={errors.telnum !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur("telnum")}
                  />
                  <FormFeedback>{errors.telnum}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 6, offset: 2 }}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="agree"
                        checked={this.state.agree}
                        onChange={this.handleInputChange}
                      />{" "}
                      <strong>May we contact you?</strong>
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={{ size: 3, offset: 1 }}>
                  <Input
                    type="select"
                    name="contactType"
                    value={this.state.contactType}
                    onChange={this.handleInputChange}
                  >
                    <option>Tel.</option>
                    <option>Email</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="message" md={2}>
                  Your Feedback
                </Label>
                <Col md={10}>
                  <Input
                    type="textarea"
                    id="message"
                    name="message"
                    rows="12"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                  ></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary" disabled={errors.btn}>
                    Send Feedback
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
