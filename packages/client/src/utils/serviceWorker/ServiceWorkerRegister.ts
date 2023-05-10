export const startServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/serviceWorker.js")
                .then(registration => {
                    console.log(
                        "service worker: registration successful with scope: ",
                        registration.scope,
                    );
                })
                .catch((error: string) => {
                    console.error(
                        "service worker: registration failed: ",
                        error,
                    );
                });
        });
    }
};
