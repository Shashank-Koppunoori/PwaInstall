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
        e.preventDefault();
        deferredPrompt = e;
        addBtn.addEventListener('click', () => {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
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
