import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { baseUrl } from "../shared/baseUrl";

function RenderMenuItem({ dish }) {
  return (
    <Card key={dish.id}>
      <Link to={`/menu/${dish.id}`}>
        <Card.Img src={baseUrl + dish.image} alt={dish.name} />
        <Card.ImgOverlay>
          <Card.Title>{dish.name}</Card.Title>
        </Card.ImgOverlay>
      </Link>
    </Card>
  );
}

export default function Menu({ dishes }) {
  const menu = dishes.dishes?.map((dish) => (
    <div className="col-12 col-md-5 m-1">
      <RenderMenuItem dish={dish} />
    </div>
  ));

  if (dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{dishes.errMess}</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">{menu}</div>
    </div>
  );
}
