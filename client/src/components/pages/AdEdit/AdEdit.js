import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAdById } from "../../../redux/adsRedux";
import { API_URL } from "../../../config";
import { loadAdsRequest } from "../../../redux/adsRedux";

import { Alert, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import { getUser } from "../../../redux/usersRedux";

const AdEdit = () => {
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adData = useSelector((state) => getAdById(state, id))
  const [title, setTitle] = useState(adData.title || "");
  const [text, setText] = useState(adData.text || "");
  const [price, setPrice] = useState(adData.price || "");
  const [date, setDate] = useState(adData.date ? new Date(adData.date) : new Date());
  const [location, setLocation] = useState(adData.location || "");
  const [image, setImage] = useState(adData.image || null);
  

  const user = useSelector(getUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("text", text);
    fd.append("price", price);
    fd.append("location", location);
    fd.append("image", image);
    fd.append("date", date);
    
    const options = {
      method: "PUT",
      body: fd,
    };

    fetch(`${API_URL}/api/ads/${id}`, options)
      .then((res) => {
        if (res.status === 200) {
          console.log("Response:", res);
          navigate("/");
          dispatch(loadAdsRequest());
        } else {
          throw new Error("Something went wrong!");
        }
      })
      .catch((err) => {
        setStatus("serverError");
        console.error("Fetch error:", err);
      });
  };

  if (!adData) return <Navigate to="/" />;
  return (
    <div>
      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your announcement has been successfully edited!</p>
        </Alert>
      )}

      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Not enough data or data are incorrect</Alert.Heading>
          <p>
            You have to fill all the fields. Photo has to be one of this type of
            file: *.jpg, *.jpeg, *.gif, *.png.
          </p>
        </Alert>
      )}

      {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      <div style={{ width: "70%" }} className="m-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Content of the ad</Form.Label>
            <Form.Control
              as="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhoto">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="warning" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdEdit;