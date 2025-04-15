import React, { useState } from "react";
import { useSelector } from "react-redux";

const useAdmin = () => {
  const { userDetails, status } = useSelector((store) => store.user);
  const [isAdmin, setAdmin] = useState(userDetails?.roles?.includes("ADMIN"));
  return { isAdmin };
};

export default useAdmin;
