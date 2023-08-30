import React from "react";
import { Col, Row } from "antd";
import "../../../../styles/header/header.scss";
import { BiLogInCircle } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";

const HeaderComponent: React.FC = () => {
  return (
    <div>
      <Row className="header">
        <Col className="logo" xs={24} sm={24} md={6}>
          <NavLink to="/" className="custom-logo">
            <p>OnlineComic</p>
            <div className="space-color">
              <div className="red"></div>
              <div className="yellow"></div>
              <div className="blue"></div>
            </div>
          </NavLink>
        </Col>
        <Col className="option" xs={24} sm={24} md={18}>
          <Col className="home" xs={8} sm={8} md={8}>
            <NavLink to="/">Home</NavLink>
          </Col>
          <Col className="home" xs={8} sm={8} md={8}>
            <NavLink to="/comic">Comic</NavLink>
          </Col>
          <Col className="login" xs={8} sm={8} md={8}>
            <div className="div-login">
              <div className="login-left">
                <div className="signin">
                  <BiLogInCircle className="BiIcons" />
                  <Link to="/comic/login">
                    <p>Sign in</p>
                  </Link>
                </div>
                <div className="join">
                  <Link to="/comic/register">
                    <p>Join</p>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
