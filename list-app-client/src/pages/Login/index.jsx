import { useState } from "react";
import axios from "axios";
import { Container, Form, Row, Col, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../index.css";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const AUTH_URL = process.env.REACT_APP_AUTH_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(`${AUTH_URL}/login`, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setError(err.response.data.message);
      }
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Link to="/register">Don't have an account?</Link>
            <div className="d-flex justify-content-between align-items-center">
              <Button type="submit" className="mt-3  block">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
