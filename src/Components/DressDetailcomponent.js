import React,{Component} from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    Label
} from "reactstrap";
import {Link} from "react-router-dom";
import {Control, LocalForm, Errors} from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDress({dress}) {
    
    if(dress != null) {
        return (<div>
             <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
            <CardImg top src={baseUrl + dress.image} alt={dress.name} />
                <CardBody>
                    <CardTitle> {
                        dress.name
                    }</CardTitle>
                    <CardText> {
                        dress.description
                    }</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        </div>);
    } else {
        return <div></div>;
    }
}

function RenderComments({comments, postComment, dressId}) {
    if (comments == null) {
        return <div></div>;
    }
    let comments_list = comments;
    const cmnts =   comments_list.map(comment => {
        return ( <Fade in><li key={
            comment.id
        }>
            <p> {
                comment.comment
            }</p>
            <p>
                -- {
                comment.author
            }, &nbsp;{" "}
                {
                new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                }).format(new Date(comment.date))
            }
                {" "} </p>
        </li> </Fade>);
    });
    return (<div>
        <h4>Comments</h4>
      
        <ul className="list-unstyled">
        <Stagger in>
             {cmnts}
             </Stagger> 
             
              </ul>
    </div>);
}

const DressDetail = props => {
   
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } 
    else{
        return (<div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/catalog">Catalog</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active> {
                    props.dress.name
                }</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3> {
                    props.dress.name
                }</h3>
                <hr/>
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDress dress={
                    props.dress
                }/>
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={
                    props.comments
                }/>
                <CommentForm dressId={
                        props.dress.id
                    }
                    postComment={
                        props.postComment
                    }/>
            </div>
        </div>
    </div>);
    }   
   
   
   
};
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) { // console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        this.toggleModal();

        this.props.postComment(this.props.dressId, values.rating, values.author, values.comment);
    }

    render() {
        return (<div>
            <Button outline
                onClick={
                    this.toggleModal
            }>
                <span className="fa fa-pencil"></span>
                Submit Comment
            </Button>

            <Modal isOpen={
                    this.state.isModalOpen
                }
                toggle={
                    this.toggleModal
            }>
                <ModalHeader toggle={
                    this.toggleModal
                }>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={
                        values => this.handleSubmit(values)
                    }>
                        <Row className="form-group">
                            <Label htmlFor="rating"
                                md={2}>Rating</Label>
                            <Col md={10}>
                                <Control.select className="form-control" defaultValue="1" id="rating" model=".rating" name="rating">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author"
                                md={2}>
                                Your Name
                            </Label>
                            <Col md={10}>
                                <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                    validators={
                                        {
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }
                                    }/>
                                <Errors className="text-danger" model=".author" show="touched"
                                    messages={
                                        {
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }
                                    }/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="message"
                                md={2}>
                                Comment
                            </Label>
                            <Col md={10}>
                                <Control.textarea className="form-control" id="comment" model=".comment" name="comment" rows="6"/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col md={
                                {size: 12}
                            }>
                                <Button color="primary" value="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>);
    }
}

export default DressDetail;