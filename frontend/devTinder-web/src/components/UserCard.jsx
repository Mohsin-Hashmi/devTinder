/* eslint-disable react/prop-types */


const UserCard = ({user}) => {
  const {firstName, lastName, age, gender, photoUrl, skills, about}= user
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl ">
        <figure>
          <img
            src={photoUrl}
            alt="photo"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{firstName +  " " + lastName}</h2>
          <p>{about}</p>
          {age && gender && <p>{age + " , " + gender}</p>}
          <ul>{skills}</ul>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
