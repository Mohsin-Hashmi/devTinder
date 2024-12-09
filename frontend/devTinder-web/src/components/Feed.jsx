import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const handleFeed = async () => {
    if (feed) return;
    try {
      const userFeed = await fetch(BASE_URL + "/feed", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const user = await userFeed.json();
      dispatch(addFeed(user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFeed();
  }, []);

  return (
    feed && (
      
        <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <UserCard user={feed[0]} />
        </div>
      
    )
  );
};

export default Feed;
