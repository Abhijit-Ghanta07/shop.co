import { useEffect, useState } from "react";
import { MdClose, MdRefresh } from "react-icons/md";
import { registerSW } from "virtual:pwa-register";
import usePwa from "../../hooks/usePwa";

const PwaBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [updateFunction, setUpdateFunction] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const { isPwa } = usePwa();
  // Check if running as installed PWA
  useEffect(() => {
    // Basic detection if app is running as a standalone PWA
    if (isPwa) {
      setIsInstalled(true);
    }
  }, []);

  // Register service worker and capture the update function
  useEffect(() => {
    try {
      // Check for updates every 15 minutes
      const intervalMS = 15 * 60 * 1000;

      const updateSW = registerSW({
        onNeedRefresh() {
          console.log("New content available, showing update banner");
          setShowUpdateBanner(true);
        },
        onOfflineReady() {
          console.log("App is ready to work offline");
        },
        immediate: true,
      });

      // Save the update function for later use
      setUpdateFunction(() => updateSW);

      // Check for updates periodically
      const intervalId = setInterval(() => {
        console.log("Checking for service worker updates...");
        updateSW(false); // Check for updates, but don't force refresh
      }, intervalMS);

      return () => {
        clearInterval(intervalId);
      };
    } catch (error) {
      console.error("Error registering service worker:", error);
    }
  }, []);

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

  // Handle cases where app is already installed
  useEffect(() => {
    window.addEventListener("appinstalled", () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      setIsInstalled(true);
      console.log("PWA was installed");
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleCloseBanner = () => {
    setShowInstallPrompt(false);
  };

  const handleUpdateClick = () => {
    if (updateFunction) {
      // Force update and reload
      updateFunction(true);
      setShowUpdateBanner(false);
    }
  };

  const handleCloseUpdate = () => {
    if (updateFunction) {
      // Decline update for now
      updateFunction(false);
      setShowUpdateBanner(false);
    }
  };

  // Force refresh application (clear caches and reload)
  const handleManualRefresh = () => {
    // Send message to service worker to clear caches
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CLEAR_CACHES",
      });

      // Wait a moment for the cache clearing to process
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    } else {
      // Fallback to regular hard reload
      window.location.reload(true);
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

      {/* Refresh Button - only show when running as installed PWA */}
      {isInstalled && (
        <button
          onClick={handleManualRefresh}
          className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-40"
          aria-label="Refresh app"
          title="Refresh app content"
        >
          <MdRefresh size={24} />
        </button>
      )}
    </>
  );
};

export default PwaBanner;
