import { FadeTransform } from "react-animation-components";
import {
  Card,
  CardImg,
  CardSubtitle,
  CardTitle,
  CardBody,
  CardText,
} from "reactstrap";

import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

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
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? (
              <CardSubtitle>{item.designation}</CardSubtitle>
            ) : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
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
            isLoading={props.isDishesLoading}
            errMessage={props.dishesErrMessage}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.isPromosLoading}
            errMessage={props.dishesErrMessage}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leader}
            isLoading={props.isLeadersLoading}
            errMessage={props.leadersErrMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
