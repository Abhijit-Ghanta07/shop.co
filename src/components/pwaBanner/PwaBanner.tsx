import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { registerSW } from "virtual:pwa-register";

const PwaBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [updateSW, setUpdateSW] = useState(null);

  // Register service worker and handle updates
  useEffect(() => {
    const swUpdater = registerSW({
      onNeedRefresh() {
        setShowUpdateBanner(true);
      },
      onOfflineReady() {
        console.log("App is ready to work offline");
      },
    });

    setUpdateSW(() => swUpdater);

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Handle install prompt
  useEffect(() => {
    const handler = (e) => {
      // Prevent the default browser install prompt
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e);
      // Show our custom install prompt
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Handle cases where app is already installed
  useEffect(() => {
    // Hide install prompt if app is already installed
    window.addEventListener("appinstalled", () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      console.log("PWA was installed");
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the browser's install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Clear the saved prompt since it can't be used again
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleCloseBanner = () => {
    setShowInstallPrompt(false);
  };

  const handleUpdateClick = () => {
    if (updateSW) {
      // Passing true tells the service worker to skip waiting
      updateSW(true);
      setShowUpdateBanner(false);
    }
  };

  const handleCloseUpdate = () => {
    if (updateSW) {
      // Passing false tells the service worker you'll update later
      updateSW(false);
      setShowUpdateBanner(false);
    }
  };

  return (
    <>
      {/* Install Prompt Banner */}
      {showInstallPrompt && (
        <div className="fixed top-4 left-4 right-4 md:right-auto md:w-96 bg-white border border-gray-200 shadow-lg rounded-xl p-4 flex flex-col z-50 animate-fade-in-down">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-800">Install App</h4>
            <button
              onClick={handleCloseBanner}
              className="text-gray-500 hover:text-gray-700"
            >
              <MdClose size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-3">
            Add Shop.co to your home screen for quick access
          </p>
          <button
            onClick={handleInstallClick}
            className="self-end bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Install
          </button>
        </div>
      )}

      {/* Update SW Banner */}
      {showUpdateBanner && (
        <div className="fixed top-20 left-4 right-4 md:right-auto md:w-96 bg-yellow-100 border border-yellow-300 shadow-lg rounded-xl p-4 flex flex-col z-50 animate-fade-in-down">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-yellow-800">
              New Update Available
            </h4>
            <button
              onClick={handleCloseUpdate}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <MdClose size={20} />
            </button>
          </div>
          <p className="text-sm text-yellow-700 mb-3">
            A new version of Shop.co is available. Refresh to update.
          </p>
          <button
            onClick={handleUpdateClick}
            className="self-end bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Update Now
          </button>
        </div>
      )}
    </>
  );
};

export default PwaBanner;
