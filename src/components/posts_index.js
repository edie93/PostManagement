import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { fetchPosts, searchPosts } from "../actions";

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <div key={post.id} className="pb-5 pr-5">
          <Link to={`/posts/${post.id}`} className="text-dark">
            <h2 className="black index-title">{post.title}</h2>
            <p className=" text-muted pb-5">
              {post.publishedAt} by{" "}
              <span className="font-italic">{post.publishedBy}</span>
            </p>
          </Link>

          <div className="row">
            <div className="col-md-4">
              <img
                src={"../img/" + post.categories + ".png"}
                alt=""
                className=" d-block img-fluid center-block"
              />
              <p className="text-dark text-center index-categories">
                <br />
                {post.categories}
              </p>
            </div>
            <div className="col-md-8">
              <p className="index-content">{post.content}</p>
            </div>
          </div>
        </div>
      );
    });
  }
  renderClearFilter() {
    return (
      <btn
        className="btn index-clearFilter"
        onClick={this.handleClearFilter.bind(this)}
      >
        Clear Filter
      </btn>
    );
  }
  renderCategory(categories) {
    if (this.props.posts) {
      _.map(this.props.posts, post => {
        let cat = post.categories;
        categories[cat] += 1;
      });
      return Object.keys(categories).map(cate => {
        return (
          <li
            className="px-3 "
            key={cate}
            onClick={this.handleSelectCategory.bind(this, cate)}
          >
            <a href="#" className="categories d-inline text-dark float-left">
              {cate}
            </a>
            <div className="d-inline float-right">{categories[cate]}</div>
          </li>
        );
      });
    }
  }
  handleSelectCategory(category) {
    this.props.searchPosts(category);
  }
  handleClearFilter() {
    this.props.fetchPosts();
  }
  initCategory() {
    let categories = {};
    _.map(this.props.posts, post => {
      categories[post.categories] = 0;
    });
    return categories;
  }

  render() {
    let categories = this.initCategory();
    const blogLength = Object.keys(this.props.posts).length;
    return (
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={"SlideOut"}
      >
        <div>
          <section id="posts">
            <div className="container">
              <div className="row">
                <div className="col-md-9 pt-3">
                  <div className="">{this.renderPosts.bind(this)()}</div>
                </div>
                <div className="col-md-3">
                  <hr align="left" width="100%" />
                  <div>
                    <div className="text-center text-black mb-3">
                      <h3>POSTS</h3>
                      <h1 className="display-4">
                        <i className="fa fa-pencil" /> {blogLength}
                      </h1>
                      <Link
                        to="/posts/new"
                        className="btn btn-outline-dark sharp text-black btn-sm"
                      >
                        <i className="fa fa-plus" /> ADD POST
                      </Link>
                    </div>
                    <hr align="left" width="100%" />
                    <div className="text-black my-3 pb-2">
                      <h6 className="black py-2">ABOUT</h6>
                      <p className="index-about">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nihil aliquid eligendi facere minima, eum
                        explicabo odioeos ad sed animi commodi, labore ullam
                        incidunt oditveniam cumque est saepe itaque. Lorem ipsum
                        dolor sit amet, consectetur adipisicing elit. Nihil
                        aliquid eligendi facere minima, eum explicabo odio eos
                        ad sed animi commodi, labore ullam incidunt odit veniam
                        cumque est saepe itaque.
                      </p>
                    </div>
                  </div>
                  <hr align="left" width="100%" />
                  <div>
                    <div className="pt-2 pb-3 ">
                      <h6 className="black d-inline ">CATEGORIES</h6>
                      <div className="d-inline float-right ">
                        {this.renderClearFilter()}
                      </div>
                    </div>
                    <ul>{this.renderCategory(categories)}</ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
function mapStateToProps(state) {
  return { posts: state.posts, categories: state.categories };
}
export default connect(mapStateToProps, { fetchPosts, searchPosts })(
  PostsIndex
);
