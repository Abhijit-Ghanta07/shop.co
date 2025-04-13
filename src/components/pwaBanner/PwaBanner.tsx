import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";

const PwaBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);

  // Handle install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      });
    }
  };

  // Handle SW update prompt
  const updateSW = registerSW({
    onNeedRefresh() {
      setShowUpdateBanner(true);
    },
    onOfflineReady() {
      console.log("App is ready to work offline");
    },
  });

  const handleUpdateClick = () => {
    updateSW(true);
    setShowUpdateBanner(false);
  };

  return (
    <>
      {/* Install Prompt Banner */}
      {showInstallPrompt && (
        <div className="fixed top-4  left-4 right-4 md:right-auto md:w-96 bg-white border border-gray-200 shadow-lg rounded-xl p-4 flex items-center justify-between z-50 animate-fade-in-down">
          <div>
            <h4 className="font-semibold text-gray-800">Install App</h4>
            <p className="text-sm text-gray-500">
              Add this app to your home screen
            </p>
          </div>
          <button
            onClick={handleInstallClick}
            className="ml-4 bg-primary hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm"
          >
            Install
          </button>
        </div>
      )}

      {/* Update SW Banner */}
      {showUpdateBanner && (
        <div className="fixed top-20 left-4 right-4 md:right-auto md:w-96 bg-yellow-100 border border-yellow-300 shadow-lg rounded-xl p-4 flex items-center justify-between z-50 animate-fade-in-down">
          <div>
            <h4 className="font-semibold text-yellow-800">
              New Update Available
            </h4>
            <p className="text-sm text-yellow-700">
              Click below to refresh and update.
            </p>
          </div>
          <button
            onClick={handleUpdateClick}
            className="ml-4 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded-lg text-sm"
          >
            Update
          </button>
        </div>
      )}
    </>
  );
};

export default PwaBanner;
