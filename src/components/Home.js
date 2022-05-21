import { Card } from "react-bootstrap";
import { Loading } from "./Loading";
import { baseUrl } from "../shared/baseUrl";

function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  }

  if (errMess) {
    return <h4>{errMess}</h4>;
  }

  return (
    <Card>
      <Card.Img src={baseUrl + item.image} alt={item.name} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        {item.designation ? (
          <Card.Subtitle>{item.designation}</Card.Subtitle>
        ) : null}
        <Card.Text>{item.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default function Home({
  dish,
  dishesLoading,
  dishesErrMess,
  promotion,
  promotionsLoading,
  promotionsErrMess,
  leader,
  leadersLoading,
  leadersErrMess,
}) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={dish}
            isLoading={dishesLoading}
            errMess={dishesErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={promotion}
            isLoading={promotionsLoading}
            errMess={promotionsErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={leader}
            isLoading={leadersLoading}
            errMess={leadersErrMess}
          />
        </div>
      </div>
    </div>
  );
}
