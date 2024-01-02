import UAParser from "ua-parser-js";

export function isOculusUwU() {
  var parser = new UAParser();
  var result = parser.getResult();
  var nav = result.browser.name; // proporciona el nombre del browser

  if (nav == "Oculus Browser") {
    // Activamos el botón solo para Oculus 2
    return true;
  }
  return false;
}
