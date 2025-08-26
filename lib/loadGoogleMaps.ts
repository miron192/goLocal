// lib/loadGoogleMaps.ts
let isLoaded = false;

export const loadGoogleMaps = (): Promise<void> => {
  return new Promise((resolve) => {
    if (isLoaded) {
      resolve();
      return;
    }

    if (
      document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)
    ) {
      isLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API}&libraries=places`;
    script.async = true;
    script.onload = () => {
      isLoaded = true;
      resolve();
    };
    document.head.appendChild(script);
  });
};
