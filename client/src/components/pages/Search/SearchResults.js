import { useEffect, useState } from "react";
import { Row, Spinner, Col, Card, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadAdsRequest, getAllAds } from "../../../redux/adsRedux";
import Search from "./Search";
import { IMG_URL } from "../../../config";

const SearchResults = () => {
  const { searchPhrase } = useParams();
  const [loading, setLoading] = useState(true);
  const ads = useSelector(getAllAds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [dispatch]);

  console.log("searchPhrase:", searchPhrase);
  console.log("ads:", ads);

  const filteredAds = ads.filter((ad) =>
    ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  console.log("filteredAds:", filteredAds);

  return (
    <div>
      <Search />
      {loading && <Spinner animation="border" />}
      {!loading && (
        <div>
          <h2 className="text-center my-3">Search results</h2>
          {filteredAds.length > 0 ? (
            filteredAds.map((ad) => (
              <Row key={ad._id} className="mb-4 justify-content-center">
                <Col xs={12} md={8} lg={6}>
                  <Card style={{ width: "100%" }}>
                    <Card.Img
                      variant="top"
                      src={IMG_URL + ad.image}
                    />
                    <Card.Body>
                      <Card.Title>{ad.title}</Card.Title>
                      <Card.Text className="mb-3 text-muted">{ad.location}</Card.Text>

                      <Link to={`/ads/${ad._id}`}>
                        <Button variant="primary">Read more...</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))
          ) : (
            <p className="text-center">No results found for "{searchPhrase}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
