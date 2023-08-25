import React from "react";

const DateFormat = ({ timestamp }) => {
  const date = new Date(timestamp);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

export default DateFormat;
