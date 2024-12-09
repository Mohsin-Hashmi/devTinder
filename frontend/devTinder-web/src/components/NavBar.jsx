import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to= '/feed' className="btn btn-ghost text-3xl mx-10">DevTinder</Link>
        </div>
        {user && (
          <div className="flex-none gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-40 md:w-auto"
              />
            </div> 
            <p>Welcome, {user.firstName}</p>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user photo"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border border-white"
              >
                <li>
                  <Link to='/profile' className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to = ''>Settings</Link>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
           
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
