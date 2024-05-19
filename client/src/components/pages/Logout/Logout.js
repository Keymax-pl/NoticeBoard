import { API_URL } from '../../../config.js';
import { logOut } from '../../../redux/usersRedux.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Logout = () => {
  const dipstach = useDispatch();

  useEffect(() => {
    const options = {
      method: "DELETE",
    };
    fetch(`${API_URL}/logout`, options).then(() => {
      dipstach(logOut());
    });
  }, [dipstach]);
  return (
    <div className="col-12 col-sm-4 mx-auto">
      <h1 className="text-center">Your logout!</h1>
      <Link to="/ ">
        <Button className="w-100 my-2">Back to home</Button>
      </Link>
    </div>
  );
};

export default Logout;