import React from 'react';

const InstallPwa = () => {
    const [showInstallApp, setShowInstallApp] = React.useState(true);
  React.useEffect(() => {

    let deferredPrompt;
    const addBtn = document.querySelector('.install-app-button');

    // Checks if users is using installed pwa
    if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallApp(false);
    }
    
    // In iOS devices(iPhone,iPad,iPod) only Safari supports pwa install
    // beforeinstallprompt event is not compatable in safari browser, so hide Install button in all ios devices & safari (in mac)
    if (window.navigator.userAgent.match(/Version\/[0-9.]+.*Safari/) || /(iPhone|iPad|iPod)/.test(window.navigator.userAgent)) {
      setShowInstallApp(false);
    }

    if (typeof window !== 'undefined' && addBtn) {
      window.addEventListener('beforeinstallprompt', e => {
        console.log("beforeinstallprompt", e);
        console.log("button", addBtn);
        e.preventDefault();
        deferredPrompt = e;
        addBtn?.addEventListener("click", () => {
          console.log("button clicked", deferredPrompt);
          deferredPrompt?.prompt();
          deferredPrompt?.userChoice.then((choiceResult) => {
            console.log("User choice");
            if (choiceResult.outcome === "accepted") {
              setShowInstallApp(false);
            }
            deferredPrompt = null;
          });
        });
      });
    }
  }, []);

  return (
    <>
      {showInstallApp && (
        <div className='install-app-button'>
          Install
        </div>
      )}
    </>
)
}

export default InstallPwa;
