import {
  Card,
  CardImg,
  CardSubtitle,
  CardTitle,
  CardBody,
  CardText,
} from "reactstrap";

import { Loading } from "./LoadingComponent";

function RenderCard({ item, isLoading, errMessage }) {
  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <Loading />
        </CardBody>
      </Card>
    );
  } else if (errMessage) {
    return <p className="alert alert-danger">{errMessage}</p>;
  } else {
    return (
      <Card>
        <CardImg src={item.image} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? (
            <CardSubtitle>{item.designation}</CardSubtitle>
          ) : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    );
  }
}

function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-left">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.isLoading}
            errMessage={props.errMessage}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.promotion} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader} />
        </div>
      </div>
    </div>
  );
}

export default Home;
