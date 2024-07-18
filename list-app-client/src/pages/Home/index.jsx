import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "../../index.css";
import Add from "../Add";
import List from "../../components/List";
import ModalComponent from "../../components/ModalComponent";

export default function Home() {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentList, setCurrentList] = useState(null);
  const [modalAction, setModalAction] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(`${API_URL}/lists`);
        setLists(response.data.list);
      } catch (error) {
        setError("Error fetching data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLists();
  }, [API_URL]);

  const handleModalConfirm = async () => {
    if (modalAction === "update") {
      try {
        const response = await axios.put(
          `${API_URL}/lists/${currentList._id}`,
          {
            status: !currentList.status,
          }
        );
        setLists(
          lists.map((list) =>
            list._id === currentList._id
              ? { ...list, status: response.data.status }
              : list
          )
        );
      } catch (error) {
        setError("Error updating status");
        console.error(error);
      }
    } else if (modalAction === "delete") {
      try {
        await axios.delete(`${API_URL}/lists/${currentList._id}`);
        setLists(lists.filter((list) => list._id !== currentList._id));
      } catch (error) {
        setError("Error deleting task");
        console.error(error);
      }
    }
    setShowModal(false);
    setCurrentList(null);
    setModalAction("");
  };

  const handleUpdateStatus = (list) => {
    setCurrentList(list);
    setModalAction("update");
    setShowModal(true);
  };

  const handleDelete = (list) => {
    setCurrentList(list);
    setModalAction("delete");
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentList(null);
    setModalAction("");
  };

  return (
    <Container>
      <Row className="mt-5 content">
        <Col sm={12} className=" p-3">
          <h5 className="mb-0">Tasks</h5>
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <List
              lists={lists}
              isLoading={isLoading}
              handleUpdateStatus={handleUpdateStatus}
              handleDelete={handleDelete}
            />
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
        isLoading={isLoading}
      />
      <ModalComponent
        show={showModal}
        handleClose={handleModalClose}
        handleConfirm={handleModalConfirm}
        modalAction={modalAction}
      />
    </Container>
  );
}
