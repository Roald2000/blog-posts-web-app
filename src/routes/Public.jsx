import { Navigate, Outlet } from "react-router-dom";

import { useContext } from "react";
import AppContext from "../app/components/AppContext";

const Public = ({ routeElse = "/" }) => {
  const { condition } = useContext(AppContext);
  return !Boolean(condition) ? <Outlet /> : <Navigate to={routeElse} />;
};

export default Public;
