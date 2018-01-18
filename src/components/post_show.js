import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { fetchPost, deletePost, updatePost } from "../actions";

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  onSubmit(updateValues) {
    const { id } = this.props.match.params;
    updateValues["id"] = id;
    this.props.updatePost(updateValues, () => {
      this.props.history.push("/");
    });
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "text-danger" : ""}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  renderOrigin(post) {
    return (
      <div className="py-5 ">
        <h2 className="text-dark black index-title">{post.title}</h2>
        <p className=" text-muted"> {post.categories} </p>
        <p>{post.content}</p>
      </div>
    );
  }
  render() {
    const { handleSubmit, post } = this.props;

    if (!post) {
      return <div>Loading</div>;
    }
    return (
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={"SlideIn"}
      >
        <form
          className="px-4"
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          <section id="action">
            <div className="d-flex justify-content-between">
              <Link to="/" className="btn btn-warning sharp">
                <i className="fa fa-arrow-left sharp" /> Back
              </Link>
              <button type="submit" className="btn btn-primary sharp">
                <i className="fa fa-refresh" /> Update Post
              </button>
              <button
                className="btn btn-danger sharp "
                onClick={this.onDeleteClick.bind(this)}
              >
                <i className="fa fa-remove" /> Delete Post
              </button>
            </div>
          </section>
          {this.renderOrigin(post)}
          <h2 className="text-dark black index-title pb-3">Edit Here</h2>
          <Field label="Title" name="title" component={this.renderField} />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <label className="pr-3">Category</label>
          <Field name="categories" component="select">
            <option />
            <option value="Movie">Movie</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Music">Music</option>
          </Field>
          <br />
          <br />
        </form>
      </ReactCSSTransitionGroup>
    );
  }
}
function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id],
    initialValues: posts[ownProps.match.params.id]
  };
}
// export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(PostsShow);
function validate(values) {
  const errors = {};
  //validate the input from "values"
  if (!values.title) {
    errors.title = "Enter a title";
  }

  if (!values.content) {
    errors.content = "Enter some content";
  }
  if (!values.categories) {
    errors.categories = "Select a category";
  }

  //if errors is empty, then form is fine to submit
  //if errors has any propoties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsUpdateForm",
  enableReinitialize: true
})(connect(mapStateToProps, { fetchPost, deletePost, updatePost })(PostsShow));
