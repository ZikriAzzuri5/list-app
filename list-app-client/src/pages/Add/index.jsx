import axios from "axios";
import { Row, Col, Form, Button } from "react-bootstrap";
import "../../index.css";

export default function Add({
  lists,
  name,
  error,
  setName,
  setLists,
  setError,
  isLoading,
}) {
  const API_URL = process.env.REACT_APP_API_URL;
  const addList = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/lists/`,
        { name, status: false },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLists([...lists, response.data]);
      setName("");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add item");
      console.error(error);
    }
  };

  return (
    <Row className="pt-5 justify-content-md-center">
      <Col sm={12} md={6} className="content p-3">
        <Form onSubmit={addList} className="minimal-form">
          <Form.Group className="mb-3">
            <Form.Label>New Task</Form.Label>
            <Form.Control
              placeholder="Enter task"
              value={name}
              className="border-bottom-only"
              onChange={(e) => setName(e.target.value)}
              required
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="minimal-button"
            >
              {isLoading ? "Loading..." : "Add"}
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
