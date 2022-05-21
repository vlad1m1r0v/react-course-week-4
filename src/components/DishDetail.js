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
import { baseUrl } from "../shared/baseUrl";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/ActionCreators";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const RenderDish = ({ dish }) => (
  <Card key={dish.id}>
    <Card.Img src={baseUrl + dish.image} alt={dish.author} />
    <Card.Body>
      <Card.Title>{dish.author}</Card.Title>
      <Card.Text>{dish.description}</Card.Text>
    </Card.Body>
  </Card>
);

const CommentForm = ({ isModalOpen, toggleModal }) => {
  const dispatch = useDispatch();

  const { dishId } = useParams();

  const initialValues = {
    rating: 1,
    author: "",
    comment: "",
  };

  const validationSchema = object({
    rating: number("Must be number").required(),
    author: string("Must be string")
      .required()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    comment: string("Must be string").required(),
  });

  const onSubmit = (values) => {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    dispatch(
      addComment({
        dishId: Number(dishId),
        rating: Number(values.rating),
        comment: values.comment,
        author: values.author,
      })
    );
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
                <b>Your author</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your author"
                name="author"
                isValid={!formik.errors.author}
                isInvalid={formik.errors.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.author}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.author}
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
      {comments.map((comment, index) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, position: "absolute" }}
          animate={{ opacity: 1, position: "static" }}
          transition={{ duration: 0.3, delay: 0.3 * index }}
        >
          <div>{comment.comment}</div>
          <div>
            --{comment.author}, {new Date(comment.date).toDateString()}
          </div>
        </motion.div>
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
          <BreadcrumbItem active>{dish.author}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.author}</h3>
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
