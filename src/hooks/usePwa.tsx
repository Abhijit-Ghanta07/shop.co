import React, { useEffect, useState } from "react";

const usePwa = () => {
  const [isPwa, setPwa] = useState(null);

  useEffect(() => {
    const isPWA = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (isPWA()) {
      setPwa(true);
    } else {
      setPwa(false);
    }
  }, []);

  return { isPwa };
};

export default usePwa;
