import { useHistory, useParams } from "react-router";
import React from "react";

export default function Logout() {
  let history = useHistory();

  function refreshPage() {
    history.push("/");
    window.location.reload(false);
  }

  localStorage.clear();

  refreshPage();
  return <div></div>;
}
