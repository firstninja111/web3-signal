import React from "react";

const Title = ({ title, subtitle }) => {
  return (
    <div className="registration__heading">
      <div className="registration__heading-title">{title}</div>
      <div className="registration__heading-subtitle">{subtitle}</div>
    </div>
  );
};

export default Title;
