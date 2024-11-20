import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, selectCurrentStatus } from "../../auth/slice/authSlice";
import { IoSearch } from "react-icons/io5";

function NavBar() {
  const authStatus = useSelector(selectCurrentStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUser()).unwrap(); // Unwrap the result to handle success or errors.
      console.log(res);
      navigate("/"); // Navigate to the homepage on successful logout.
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="fixed z-10 w-full bg-black h-[10%] border-b border-white flex justify-between items-center px-2">
      <img src="src/assets/ytlogo.jpeg" className="size-14" />
      <div className="border border-white h-[60%] w-2/6  flex">
        <div className="w-[10%] h-full  pr-1 flex flex-col items-center justify-center">
        <IoSearch className=" text-white size-5" />
         </div>
        <input
          type="text"
          placeholder="Search"
          className="text-white bg-transparent outline-none w-[80%]"
        />
      </div>
      {authStatus === false ? (
        <div className="h-[60%] flex select-none">
          <Link to={"/login"}>
            <div className="w-20 h-[90%] hover:bg-[#3432326b] text-white flex flex-col text-center justify-center">
              Log in
            </div>
          </Link>
          <Link to={"/signup"}>
            <div className="w-20 h-[90%] bg-[#ae7aff] text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center ">
              Sign up
            </div>
          </Link>
        </div>
      ) : (
        <div className="h-[60%] flex select-none">
          <div
            onClick={handleLogout}
            className="w-20 h-[90%] bg-[#ae7aff] text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center "
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
