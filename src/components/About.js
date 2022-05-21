import { Breadcrumb, BreadcrumbItem, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { baseUrl } from "../shared/baseUrl";
import { motion } from "framer-motion";

export default function About({ leaders }) {
  function RenderLeader({ leader }) {
    return (
      <div className="m-4">
        <div className="d-flex">
          <div className="flex-shrink-0">
            <img src={baseUrl + leader.image} alt={leader.name} />
          </div>
          <div className="flex-grow-1 ms-3">
            <h5>{leader.name}</h5>
            <h6>{leader.designation}</h6>
            <p>{leader.description}</p>
          </div>
        </div>
      </div>
    );
  }

  function RenderContent({ leaders, isLoading, errMess }) {
    if (isLoading) {
      return <Loading />;
    }

    if (errMess) {
      return <h4>{errMess}</h4>;
    }

    return leaders.map((leader, index) => (
      <motion.div
        initial={{ opacity: 0, position: "absolute" }}
        animate={{ opacity: 1, position: "static" }}
        transition={{ duration: 0.3, delay: 0.3 * index }}
      >
        <RenderLeader leader={leader} />
      </motion.div>
    ));
  }

  return (
    <motion.div
      className="container"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
    >
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>About Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>About Us</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12 col-md-6">
          <h2>Our History</h2>
          <p>
            Started in 2010, Ristorante con Fusion quickly established itself as
            a culinary icon par excellence in Hong Kong. With its unique brand
            of world fusion cuisine that can be found nowhere else, it enjoys
            patronage from the A-list clientele in Hong Kong. Featuring four of
            the best three-star Michelin chefs in the world, you never know what
            will arrive on your plate the next time you visit us.
          </p>
          <p>
            The restaurant traces its humble beginnings to{" "}
            <em>The Frying Pan</em>, a successful chain started by our CEO, Mr.
            Peter Pan, that featured for the first time the world's best
            cuisines in a pan.
          </p>
        </div>
        <div className="col-12 col-md-5">
          <Card>
            <Card.Body className="bg-primary text-white">
              Facts At a Glance
            </Card.Body>
            <Card.Body>
              <dl className="row p-1">
                <dt className="col-6">Started</dt>
                <dd className="col-6">3 Feb. 2013</dd>
                <dt className="col-6">Major Stake Holder</dt>
                <dd className="col-6">HK Fine Foods Inc.</dd>
                <dt className="col-6">Last Year's Turnover</dt>
                <dd className="col-6">$1,250,375</dd>
                <dt className="col-6">Employees</dt>
                <dd className="col-6">40</dd>
              </dl>
            </Card.Body>
          </Card>
        </div>
        <div className="col-12">
          <Card>
            <Card.Body className="bg-faded">
              <blockquote className="blockquote">
                <p className="mb-3">
                  You better cut the pizza in four pieces because I'm not hungry
                  enough to eat six.
                </p>
                <footer className="blockquote-footer">
                  Yogi Berra,
                  <cite title="Source Title">
                    The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books,
                    2014
                  </cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h2>Corporate Leadership</h2>
        </div>
        <div className="col-12">
          <div className="row">
            <RenderContent
              leaders={leaders.leaders}
              isLoading={leaders.isLoading}
              errMess={leaders.errMess}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
