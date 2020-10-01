import React from 'react';

import {
    Card,
    CardImg,
    CardImgOverlay,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderCatItem({dress}) {


    return (
        <Card>
            <Link to={
                `/menu/${dress.id}`
            }>
                <CardImg width="100%" src={ baseUrl + dress.image} alt={dress.name} />
                <CardImgOverlay>
                    <CardTitle>{
                        dress.name
                    }</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Catalog = (props) => {

    if (props.dresses.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }

    const catalog = props.dresses.dresses.map((dress) => {

        return (
            <div className="col-12 col-md-5 m-1"
                key={
                    dress.id}>
                <RenderCatItem dress={dress}
                    isLoading
                    ={props.dresses.isLoading}/>
            </div>
        );

    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Catalog</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Catalog</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                {catalog} </div>
        </div>
    );
}

export default Catalog;