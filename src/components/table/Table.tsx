import React from "react";

const Table = ({ loading, loader, children }) => {
  return (
    <>
      {loading ? loader : <table className="w-full rounded">{children}</table>}
    </>
  );
};

export default Table;
