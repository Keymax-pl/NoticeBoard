import { API_URL, IMG_URL } from "../../../config";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getAdById, removeAd } from "../../../redux/adsRedux";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { useState } from "react";
import { Button, Card, Col, Modal } from "react-bootstrap";

const SingleAd = () => {
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  const loggedUser = useSelector(getUser);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteAd = (e) => {
    e.preventDefault();

    dispatch(removeAd(id));

    const options = {
      method: "DELETE",
    };
    fetch(`${API_URL}/api/ads/${id}`, options).then((res) => {
      handleClose();
      navigate("/");
    });
  };

  if (!adData) return <Navigate to={"/"} />;
  
  // Log adData to verify the structure and values
  console.log("adData:", adData);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Col className="py-4 col-12 col-sm-6 col-lg-6">
          <Card>
            <Card.Title className="text-center p-2">{adData.title}</Card.Title>
            <Card.Img variant="top" src={IMG_URL + adData.image} />
            <Card.Body>
              <p>
                <b>Location: </b>
                {adData.location}
              </p>
              <p>
                <b>Price: </b>
                {adData.price}$
              </p>
              <div>
                <b>Description:</b> <br />
                {adData.text}
              </div>

              <p><b>Published:</b> {format(new Date(adData.date), "dd.MM.yyyy")}</p>
              <h5>Seller info</h5>

              <div className="d-flex align-items-center">
                {adData.user.avatar ? (
                  <img
                    src={IMG_URL + adData.user.avatar}
                    alt="user avatar"
                    className="me-2 rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                ) : (
                  <div className="me-2 rounded-circle" style={{ width: "50px", height: "50px", backgroundColor: "#ccc" }}></div>
                )}
                <p className="mb-0"> {adData.login}</p>
              </div>

              {loggedUser && (
                <div className="d-flex justify-content-between mt-3">
                  <Link to={`/ads/edit/${id}`}>
                    <Button variant="outline-success m-1">Edit ad</Button>
                  </Link>
                  <Button onClick={handleShow} variant="outline-danger m-1">
                    Delete
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            This operation will completely remove this ad from the app.
            <br />
            Are you sure you want to do that?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={deleteAd} variant="danger">
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingleAd;
