/* eslint-disable react/prop-types */


const UserCard = ({user}) => {
  const {firstName, lastName, age, gender, photoUrl, skills, about}= user
  return (
    <>
      <div className="card card-compact bg-base-900 w-96   mt-[50px] mb-[120px]  shadow-[15px_15px_15px_rgba(255,255,255,0.3)]">
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
          <div className="card-actions justify-center">
            <button className="btn btn-secondary">Ignored</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
