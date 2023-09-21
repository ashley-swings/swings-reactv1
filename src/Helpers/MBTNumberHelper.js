import React from "react";

function MBTNumberHelper({ number }) {
  const formatNumber = (number) => {
    if (number >= 1e12) {
      // Format as trillions with two decimal places
      return (number / 1e12).toFixed(2) + "T";
    } else if (number >= 1e9) {
      // Format as billions with two decimal places
      return (number / 1e9).toFixed(2) + "B";
    } else if (number >= 1e6) {
      // Format as millions with two decimal places
      return (number / 1e6).toFixed(2) + "M";
    } else if (number >= 1e3) {
        // Format as hundreds of thousands with one decimal place and "K"
        return (number / 1e3).toFixed(2) + "K";
      } else {
      // Return the original number
      return number.toFixed(2);
    }
  };

  return (
    <span>
      {formatNumber(number)}
    </span>
  );
}

export default MBTNumberHelper;
