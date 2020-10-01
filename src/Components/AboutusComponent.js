import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Media
} from "reactstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import { Fade, Stagger } from "react-animation-components";
import { Loading } from "./LoadingComponent";

function About(props) {
  const RenderDesigner = ({ designers, designerLoading, designerErrMess }) => {
    console.log(designerLoading, designerErrMess);

    const designers_list = designers.map(designer => {
      return (
        <Fade in key={designer.id}>
          <Media>
            <Media left>
              <Media object src={baseUrl + designer.image} alt={designer.name} />
            </Media>
            <Media body className="ml-2">
              <Media heading>{designer.name}</Media>
              <p>{designer.designation}</p>
              <p>{designer.description}</p>
            </Media>
          </Media>
        </Fade>
      );
    });
    // Returning the complete designer's list
    if (designerLoading) {
      return <Loading />;
    } else if (designerErrMess) {
      return <h4>{designerErrMess}</h4>;
    } else
      return (
        <Media list>
          <Stagger in>{designers_list}</Stagger>
        </Media>
      );
  };

  return (
    <div className="container">
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
            Started in 2020,Havana quickly established itself as a Fasion icon par excellence in India. With its unique brand of world's Fashion design that can be found nowhere else, it enjoys patronage from the A-list clientele in India.  Featuring four of the best Bollywood Fashion Designers in the world, you never know what will arrive in the trend which is availabale with us the next time you visit us.
          </p>
          <p>
            The Brand traces its humble beginnings to <em>Fashion World</em>, a successful chain started by our CEO, Ms. Anshuma Mishra, that featured for the first time the world's best Fashioniesta.
          </p>
        </div>
        <div className="col-12 col-md-5">
          <Card>
            <CardHeader className="bg-primary text-white">
              Facts At a Glance
            </CardHeader>
            <CardBody>
              <dl className="row p-1">
                <dt className="col-6">Started</dt>
                <dd className="col-6">20 Sep. 2020</dd>
                <dt className="col-6">Major Stake Holder</dt>
                <dd className="col-6">Anshuma Inc.</dd>
                <dt className="col-6">Last Year's Turnover</dt>
                <dd className="col-6">$1,250,375</dd>
                <dt className="col-6">Employees</dt>
                <dd className="col-6">40</dd>
              </dl>
            </CardBody>
          </Card>
        </div>
        <div className="col-12">
          <Card>
            <CardBody className="bg-faded">
              <blockquote className="blockquote">
                <p className="mb-0">
                 Live with the Fashion you love.
                </p>
                <footer className="blockquote-footer">
                  Dreamy Fashion,
                  <cite title="Source Title">
                    by THe FASHION HUB, 2020
                  </cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h2>Renowned Fashion Designers</h2>
        </div>

        <div className="col-12">
          <RenderDesigner
            designers={props.designers}
            designerLoading={props.isLoading}
            designerErrMess={props.errMess}
          />
        </div>
      </div>
    </div>
  );
}

export default About;  