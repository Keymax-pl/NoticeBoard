import { API_URL, IMG_URL } from "../../../config";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getAdById, removeAd } from "../../../redux/adsRedux";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { useState } from "react";
import { Button, Card, Col, Modal } from "react-bootstrap";

const dateString = "Tue Feb 06 2024 10:04:00 GMT+0100";
const date = new Date(dateString);
const formattedDate = format(date, "dd.MM.yyyy");
console.log(formattedDate); // "06.02.2024 10:04:00"

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

              <p>Published: {format(adData.date, "dd.MM.yyyy")}</p>
              <h5>Seller info</h5>

              <div>
                <img
                  src={IMG_URL + adData.avatar}
                  alt="user avatar"
                  className="me-1"
                ></img>
                <p> {adData.login}</p>
              </div>

              {loggedUser && (
                <div className="d-flex justify-content-between">
                  <Link to={`/edit/${id}`}>
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