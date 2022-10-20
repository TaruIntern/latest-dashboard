import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ExtractCredential = ({ userUpdated, setUserUpdated }) => {
  const navigate = useNavigate();
  function useQueryParams() {
    // const params = new URLSearchParams(window ? window.location.search : {});
    let token = new URLSearchParams(window.location.search).get("token");
    let id = new URLSearchParams(window.location.search).get("id");
    // return new Proxy(params, {
    //   get(target, prop) {
    //     return target.get(prop);
    //   },
    // });
    return { token, id };
  }
  const { token, id } = useQueryParams();
  if (token && id) {
    const user = {
      access: token,
      user_id: id,
    };
    //   console.log(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUserUpdated(!userUpdated);
    navigate('/home/overview')
  }
  return (
    <>
      <Navigate to="/home/overview" replace={true}/>
    </>
  );
};

export default ExtractCredential;
