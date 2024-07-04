import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  CloseButton,
  Spinner,
  Alert,
} from "react-bootstrap";
import "./index.css";
import Add from "../Add";

export default function Home() {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/lists/`);
        setLists(response.data.list);
      } catch (error) {
        setError("Error fetching data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLists();
  }, []);

  const updateStatus = async (id, currentStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/lists/${id}`,
        {
          status: !currentStatus,
        }
      );
      setLists(
        lists.map((list) =>
          list._id === id ? { ...list, status: response.data.status } : list
        )
      );
    } catch (error) {
      setError("Error updating status");
      console.error(error);
    }
  };

  const deleteList = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/lists/${id}`);
      setLists(lists.filter((list) => list._id !== id));
    } catch (error) {
      setError("Error deleting task");
      console.error(error);
    }
  };

  return (
    <Container>
      <Row className="pt-5">
        <Col sm={12} className="border-radius p-3">
          <h5 className="mb-0">Tasks</h5>
          {isLoading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            lists.map((list, i) => (
              <div
                className="d-flex justify-content-between align-items-center pt-3"
                key={i}
              >
                <div className="d-flex">
                  <input
                    type="checkbox"
                    checked={list.status}
                    onChange={() => updateStatus(list._id, list.status)}
                    style={{ marginRight: "5px" }}
                  />
                  <p style={{ marginBottom: "0px" }}>{list.name}</p>
                </div>
                <CloseButton onClick={() => deleteList(list._id)} />
              </div>
            ))
          )}
        </Col>
      </Row>
      <Add
        lists={lists}
        name={name}
        error={error}
        setName={setName}
        setError={setError}
        setLists={setLists}
      />
    </Container>
  );
}
