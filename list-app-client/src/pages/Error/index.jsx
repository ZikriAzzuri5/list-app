import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <Link to="/">Kembali ke Halaman Utama</Link>
    </div>
  );
};

export default NotFound;
