import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../app/components/AppContext";

const Protected = ({ routeElse = "/login" }) => {
  const { condition } = useContext(AppContext);

  return Boolean(condition) ? <Outlet /> : <Navigate to={routeElse} />;
};

export default Protected;
