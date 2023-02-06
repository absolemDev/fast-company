import React from "react";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (!number) {
      return "Никто с тобой не тусанет";
    }
    if (
      [11, 12, 13, 14, 15, 16, 17, 18, 19].includes(number % 100) ||
      [0, 5, 6, 7, 8, 9].includes(number % 10)
    ) {
      return `${number} человек тусанет с тобой сегодня`;
    }
    if ([2, 3, 4].includes(number % 10)) {
      return `${number} человека тусанут с тобой сегодня`;
    }
    if (number % 10 === 1) {
      return `${number} человек тусанет с тобой сегодня`;
    }
  };
  return (
    <>
      <h2>
        <span className={`badge bg-${length === 0 ? "danger" : "primary"}`}>
          {renderPhrase(length)}
        </span>
      </h2>
    </>
  );
};

export default SearchStatus;
