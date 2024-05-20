import { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadAdsRequest, getAllAds } from "../../../redux/adsRedux";
import AllAd from "../../features/AllAd/AllAd";
import Search from "./Search";

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

  const filteredAds = ads.filter((ad) =>
    ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  return (
    <div>
      <Search />
      {loading && <Spinner />}
      {!loading && (
        <div>
          <h2 className="text-center my-3">Search results</h2>
          <Row className="justify-content-between">
            {filteredAds.map((ad) => (
              <AllAd key={ad._id} {...ad} />
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
