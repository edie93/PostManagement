import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${
      touched && error ? "text-danger text-help" : ""
    }`;
    return (
      <div>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className={className}>{touched ? error : ""}</div>
      </div>
    );
  }

  addInfoOnSubmit(values) {
    const id = Math.floor(Math.random() * 10000000000);
    values["id"] = id;
    const date = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    values["publishedAt"] = `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
    return values;
  }
  onSubmit(values) {
    values = this.addInfoOnSubmit(values);
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }
  render() {
    const { handleSubmit } = this.props;
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
          <Field label="Title" name="title" component={this.renderField} />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <Field
            label="Published By"
            name="publishedBy"
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
          <Link to="/" className="btn btn-warning sharp">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary sharp float-right">
            Submit
          </button>
        </form>
      </ReactCSSTransitionGroup>
    );
  }
}
function validate(values) {
  const errors = {};
  //validate the input from "values"
  if (!values.title) {
    errors.title = "Enter a title";
  }

  if (!values.publishedBy) {
    errors.publishedBy = "Enter your name";
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
  form: "PostsNewForm"
})(connect(null, { createPost })(PostsNew));
