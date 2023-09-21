import React from "react";

function NumberRoundedToTwoDecimalPlaces({ number }) {
  const roundedNumber = Number(number).toFixed(2); // Convert to number and round to two decimal places

  return <span>{roundedNumber}</span>;
}

export default NumberRoundedToTwoDecimalPlaces;
