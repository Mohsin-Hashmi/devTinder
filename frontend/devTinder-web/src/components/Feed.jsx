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
      
        <div className="flex items-center justify-center">
          <UserCard user={feed[0]} />
        </div>
      
    )
  );
};

export default Feed;
