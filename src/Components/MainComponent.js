import React, { Component } from "react";
import Catalog from "./Catalogcomponent";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutusComponent";
import Footer from "./FooterComponent";
import DressDetail from "./DressDetailcomponent";
import {
  postComment,
  fetchDresses,
  fetchComments,
  fetchPromos,
  fetchDesigners,
  postFeedback
} from "../redux/ActionCreators";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapDispatchToProps = dispatch => ({
  postComment: (dressId, rating, author, comment) =>
    dispatch(postComment(dressId, rating, author, comment)),
  postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ),
  fetchDresses: () => {
    dispatch(fetchDresses());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchDesigners: () => dispatch(fetchDesigners())
});

const mapStateToProps = state => {
  return {
    dresses: state.dresses,
    comments: state.comments,
    promotions: state.promotions,
    designers: state.designers
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDresses();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchDesigners();
  }
  onDressSelect(dressId) {
    this.setState({ selectedDress: dressId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dress={this.props.dresses.dresses.filter(dress => dress.featured)[0]}
          dressesLoading={this.props.dresses.isLoading}
          dressErrMess={this.props.dresses.errMess}
          promotion={
            this.props.promotions.promotions.filter(promo => promo.featured)[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          designer={
            this.props.designers.designers.filter(designer => designer.featured)[0]
          }
          designersLoading={this.props.designers.isLoading}
          designersErrMess={this.props.designers.errMess}
        />
      );
    };

    const DressWithId = ({ match }) => {
      return (
        <DressDetail
          dresses={
            this.props.dresses.dresses.filter(
              dress => dress.id === parseInt(match.params.dressId, 10)
            )[0]
          }
          isLoading={this.props.dresses.isLoading}
          errMess={this.props.dresses.errMess}
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          postComment={this.props.postComment}
        />
      );
    };
    const AboutPage = () => {
      return (
        <About
          designers={this.props.designers.designers}
          isLoading={this.props.designers.isLoading}
          errMess={this.props.designers.errMess}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >//css uses classnames
            <Switch location={this.props.location}>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/catalog"
                component={() => <Catalog dresses={this.props.dresses} />}
              />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />

              <Route path="/aboutus" component={AboutPage} />
              <Route path="/catalog/:dressId" component={DressWithId} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));