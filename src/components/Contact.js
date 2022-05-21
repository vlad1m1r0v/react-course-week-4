import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { object, string, number, bool } from "yup";

export default function Contact() {
  const initialValues = {
    firstname: "",
    lastname: "",
    telnum: "",
    email: "",
    agree: false,
    contactType: "Tel.",
    message: "",
  };

  const validationSchema = object({
    firstname: string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastname: string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    telnum: number("Only numbers allowed").required("Required"),
    email: string().email().required("Required"),
    agree: bool().default(false).required(),
    contactType: string().matches(/(Tel.|Email)/),
    message: string().nullable().notRequired(),
  });

  const onSubmit = (values) => {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Contact Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Contact Us</h3>
          <hr />
        </div>
      </div>
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
            <a role="button" className="btn btn-info">
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
      {/*form*/}
      <div className="row row-content">
        <div className="col-12">
          <h3>Send us your Feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formFirstName">
              <Form.Label column sm={2}>
                First name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  name="firstname"
                  isValid={!formik.errors.firstname}
                  isInvalid={formik.errors.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstname}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formLastName">
              <Form.Label column sm={2}>
                Last name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  isValid={!formik.errors.lastname}
                  isInvalid={formik.errors.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastname}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formLastName">
              <Form.Label column sm={2}>
                Contact Tel.
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="tel"
                  placeholder="Tel. Number"
                  name="telnum"
                  isValid={!formik.errors.telnum}
                  isInvalid={formik.errors.telnum}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.telnum}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.telnum}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formEmail">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  isValid={!formik.errors.email}
                  isInvalid={formik.errors.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formCheckBox">
              <Col md={{ size: 6, offset: 2 }}>
                <Form.Check
                  type="checkbox"
                  id={`default-checkbox`}
                  label={<strong>May we contact you?</strong>}
                  name="agree"
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={{ size: 2, offset: 1 }}>
                <Form.Select
                  aria-label="Default select example"
                  name="contactType"
                  onChange={formik.handleChange}
                >
                  <option>Tel.</option>
                  <option>Email</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formMessage">
              <Form.Label column sm={2}>
                Your Feedback
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="message"
                  onChange={formik.handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}
