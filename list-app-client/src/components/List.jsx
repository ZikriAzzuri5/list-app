import { CloseButton } from "react-bootstrap";

export default function List({
  lists,
  isLoading,
  handleUpdateStatus,
  handleDelete,
}) {
  return (
    <>
      {lists.map((list) => (
        <div
          className="d-flex justify-content-between align-items-center pt-3"
          key={list._id}
        >
          <div className="d-flex">
            <input
              type="checkbox"
              checked={list.status}
              onChange={() => handleUpdateStatus(list)}
              style={{ marginRight: "5px" }}
              disabled={isLoading}
            />
            <p style={{ marginBottom: "0px" }}>{list.name}</p>
          </div>
          <CloseButton
            onClick={() => handleDelete(list)}
            disabled={isLoading}
          />
        </div>
      ))}
    </>
  );
}
