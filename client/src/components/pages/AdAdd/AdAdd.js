import React, { useEffect, useState } from "react";
import AddForm from "../../features/AddForm/AddForm";
import { API_URL } from "../../../config";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";

const AddAd = () => {
  const [user, setUser] = useState(null);
  const loggedUser = useSelector(getUser);

  useEffect(() => {
    fetch(`${API_URL}/auth/user`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
      })
      .catch((e) => {
        console.log(e);
        setUser(null);
      });
  }, []);

  return (
    <div>
      <p className="text-center">Add Ad</p>
      {loggedUser ? <AddForm /> : <p>You are not authorized</p>}
    </div>
  );
};

export default AddAd;
