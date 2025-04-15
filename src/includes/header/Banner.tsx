import React from "react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import cl from "classnames";
const Banner = () => {
  const isOnline = useOnlineStatus();

  return (
    <div
      id="offline-banner"
      className={cl(
        "duration-200 transition-all py-1",
        !isOnline ? "bg-primary block backdrop-blur-md" : "hidden"
      )}
    >
      <p className="text-light text-center">
        Please Check your Internet Connection!!Offline
      </p>
    </div>
  );
};

export default Banner;
