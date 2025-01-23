import { useState } from "react";
import PropTypes from "prop-types";
import UserCard from "./UserCard";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  return (
    <>
      <div className="flex items-center justify-between m-auto">
        <div className="w-[600px] flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <form className="card-body p-[50px] m-auto w-1/2 border border-white rounded-3xl shadow-[0_15px_15px_rgba(255,255,255,0.3)]">
            <h1 className=" card-title text-3xl font-bold text-white mb-4 flex items-center justify-center">
              Edit Profile
            </h1>

            <label className="label-text">First Name</label>
            <label className="input input-bordered flex items-center gap-2 mb-[18px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 2c-4.418 0-8 1.79-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.21-3.582-4-8-4zm-6 6v-2c0-.74 2.548-2 6-2s6 1.26 6 2v2H6z" />
              </svg>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="grow"
                placeholder="Enter your First Name"
              />
            </label>
            <label className="label-text">Last Name</label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 2c-4.418 0-8 1.79-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.21-3.582-4-8-4zm-6 6v-2c0-.74 2.548-2 6-2s6 1.26 6 2v2H6z" />
              </svg>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="grow"
                placeholder="Enter your Last Name"
              />
            </label>

            <label className="label-text">Photo URL</label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 2c-4.418 0-8 1.79-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.21-3.582-4-8-4zm-6 6v-2c0-.74 2.548-2 6-2s6 1.26 6 2v2H6z" />
              </svg>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="grow"
                placeholder="set your Photo URL"
              />
            </label>
            <label className="label-text">Age</label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 2c-4.418 0-8 1.79-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.21-3.582-4-8-4zm-6 6v-2c0-.74 2.548-2 6-2s6 1.26 6 2v2H6z" />
              </svg>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="grow"
                placeholder="Enter your Age"
              />
            </label>

            <label className="label-text">Gender</label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 2c-4.418 0-8 1.79-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.21-3.582-4-8-4zm-6 6v-2c0-.74 2.548-2 6-2s6 1.26 6 2v2H6z" />
              </svg>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="grow"
                placeholder="Enter your Gender"
              />
            </label>
            <label className="label-text">About</label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 2c-4.418 0-8 1.79-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.21-3.582-4-8-4zm-6 6v-2c0-.74 2.548-2 6-2s6 1.26 6 2v2H6z" />
              </svg>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="grow"
                placeholder="Enter your Bio"
              />
            </label>

            <div className="flex items-center">
              <button
                type="submit"
                className="btn btn-wide mx-auto mt-[10px] border border-white hover:border-green-500"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </>
  );
};
EditProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
  }).isRequired,
};
export default EditProfile;
