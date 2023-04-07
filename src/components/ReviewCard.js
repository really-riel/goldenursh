import React from "react";

const ReviewCard = ({ data }) => {
  return (
    <div className="reviewCard">
      <figure>
        <img src={data?.image} alt={data?.name} />
      </figure>
      <div>
        <p className="comment">{data?.comment}</p>
        <p className="name">{data.name}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
