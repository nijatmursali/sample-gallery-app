import React from "react";

export const ImageCard = ({ url }) => {
  return (
    <>
      <img className="styledImg" src={url} alt="" />
    </>
  );
};
