import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";

const NotFound = () => {
  return (
    <Container>
      <Row className="pt-5">
        <Col sm={12} className="border-radius p-3">
          <div className="not-found">
            <h1>404 - Halaman Tidak Ditemukan</h1>
            <Link to="/">Kembali ke Halaman Utama</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
