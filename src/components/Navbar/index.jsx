import { Col, Container, Form, Row } from "react-bootstrap";
import SearchIcon from "../../assets/icons/search.svg";
import BellIcon from "../../assets/icons/bell.svg";
import ProfileIcon from "../../assets/icons/person-circle.svg";

import "./index.css";

export default function Navbar() {
  return (
    <Container className="mt-2 mb-4">
      <Row>
        <Col className="navbar-title">Navbar</Col>
        <Col sm={5} style={{ display: "flex" }}>
          <div className="bd-container" style={{width:"100%"}}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 bd-searchbar"
                aria-label="Search"
              />
              <img src={SearchIcon} />
            </Form>
          </div>
          <img src={BellIcon} className="mg-icon"/>
          <img src={ProfileIcon} />
        </Col>
      </Row>
    </Container>
  );
}
