import {
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { object, string, number } from "yup";

const RenderDish = ({ dish }) => (
  <Card key={dish.id}>
    <Card.Img src={dish.image} alt={dish.name} />
    <Card.Body>
      <Card.Title>{dish.name}</Card.Title>
      <Card.Text>{dish.description}</Card.Text>
    </Card.Body>
  </Card>
);

const CommentForm = ({ isModalOpen, toggleModal }) => {
  const initialValues = {
    rating: 1,
    name: "",
    comment: "",
  };

  const validationSchema = object({
    rating: number("Must be number").required(),
    name: string("Must be string")
      .required()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    comment: string("Must be string").required(),
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
    <>
      <Button
        variant="outline-secondary"
        onClick={toggleModal}
        className="mt-2"
      >
        <i className="fa fa-pencil me-2" aria-hidden="true"></i>
        Submit Comment
      </Button>
      <Modal show={isModalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Rating</b>
              </Form.Label>
              <Form.Select
                name="rating"
                isValid={!formik.errors.rating}
                isInvalid={formik.errors.rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rating}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.rating}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Your Name</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                name="name"
                isValid={!formik.errors.name}
                isInvalid={formik.errors.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Comment</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="comment"
                isValid={!formik.errors.comment}
                isInvalid={formik.errors.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comment}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {formik.errors.comment}
            </Form.Control.Feedback>
            <Button type="submit" color="primary" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const RenderComments = ({ comments }) => {
  const [state, setState] = useState({ isModalOpen: false });

  const toggleModal = () => setState({ isModalOpen: !state.isModalOpen });

  return (
    <>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div>{comment.comment}</div>
          <div>
            --{comment.author}, {new Date(comment.date).toDateString()}
          </div>
        </div>
      ))}
      <CommentForm isModalOpen={state.isModalOpen} toggleModal={toggleModal} />
    </>
  );
};

export default function DishDetail({ dish, comments }) {
  if (!dish) return <></>;

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={comments} />
        </div>
      </div>
    </div>
  );
}
