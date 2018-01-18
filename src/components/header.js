import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
export default class Header extends Component {
  render() {
    return (
      <header id="main-header" className="py-5 text-black">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6">
              <h2 className="black">
                <Link className="text-dark" to="/">
                  Company Name{" "}
                  <i className=" text-warning fa fa-star" aria-hidden="true" />
                </Link>
              </h2>
              <p className="text-muted">Created by Meng Xiao in 2018</p>
            </div>
            <div className="col-md-4 col-sm-6 text-md-right text-sm-left">
              <ul className="list-inline">
                <li className="list-inline-item px-3">
                  <Link className="text-dark" to="/">
                    <p className="black">Home </p>
                  </Link>
                </li>
                <li className="list-inline-item px-3">
                  <p className="black">
                    <Link className="text-dark" to="#">
                      About
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
