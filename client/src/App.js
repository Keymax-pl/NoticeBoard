import { Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

import Home from "./components/pages/Home/Home";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Logout from "./components/pages/Logout/Logout";
import Ad from "./components/pages/Ad/Ad";
import AdEdit from "./components/pages/AdEdit/AdEdit";
import AdAdd from "./components/pages/AdAdd/AdAdd";
import AdRemove from "./components/pages/AdRemove/AdRemove";
import SearchResults from "./components/pages/Search/SearchResults";
import NotFound from "./components/pages/NotFound/NotFound";

import { loadAdsRequest } from "./redux/adsRedux";


import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  return (
    <main>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/ads/:id" element={<Ad />} />
          <Route path="/ads/edit/:id" element={<AdEdit />} />      
          <Route path="/add" element={<AdAdd />} />
          <Route path="/delete/:id" element={<AdRemove />} />
          <Route path="/search/:searchPhrase" element={<SearchResults />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
}

export default App;
