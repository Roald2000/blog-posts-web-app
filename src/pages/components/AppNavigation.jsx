import { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../app/util";
import AppContext from "../../app/components/AppContext";
import ThemeBtn from "../../app/components/ThemeBtn";

const AppNavigation = () => {
  const { condition, user } = useContext(AppContext);
  return (
    <header className="p-2 shadow-lg">
      <div className="container mx-auto p-2 flex justify-between items-center">
        <ul className="flex flex-row justify-start items-center gap-2">
          {Boolean(condition) && (
            <>
              <li className="  kbd">{user?.username}</li>
              <li>
                <button
                  className="link link-hover link-error"
                  onClick={() => {
                    auth.destroy();
                  }}
                >
                  Logout
                </button>
              </li>
              <li>
                <Link className="link link-hover" to={"/posts"}>
                  Posts
                </Link>
              </li>
            </>
          )}
          {!Boolean(condition) && (
            <>
              <li>
                <Link className="link link-hover" to={"/login"}>
                  Login
                </Link>
              </li>
              <li>
                <Link className="link link-hover" to={"/register"}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        <ThemeBtn />
      </div>
    </header>
  );
};

export default AppNavigation;
