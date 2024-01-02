export function languageSelector() {
  let userLanguage = navigator.language; // Toma el idioma del navegador
  let museumLanguage = "en"; // Default
  let languages = ["en", "es", "fr"];

  if (languages.includes(userLanguage.split("-")[0])) {
    museumLanguage = userLanguage.split("-")[0];
  }
  return museumLanguage;
}

export function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
}

export function getWindowWidth() {
  let windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  return windowWidth;
}

export const isIOS = () => {
  if (typeof window === `undefined` || typeof navigator === `undefined`)
    return false;

  return /iPhone|iPad|iPod/i.test(
    navigator.userAgent ||
      navigator.vendor ||
      (window.opera && opera.toString() === `[object Opera]`)
  );
};

export const isSafariBrowser = () => {
  if (
    /Safari/i.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor) &&
    !/Mobi|Android/i.test(navigator.userAgent)
  ) {
    return true;
  }
};
