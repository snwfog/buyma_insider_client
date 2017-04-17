import config from "../config/environment";
import PreloadStore from "../preload-store";

//const { log, info, warn, error, debug } = Ember.Logger;

export function initialize(application) {
//   window.BuymaInsiderClient = application;
//   window.PreloadStore = preloadstore;

  $.ajaxSetup({
    xhrFields: {
      withCredentials: true,
      crossDomain:     true
    }
  });

  application.deferReadiness();
  $.getJSON(config.settings.path.bootstrap, function (bootstrapsPackage) {
    console.log(bootstrapsPackage);
    Object.keys(bootstrapsPackage).forEach((key) => {
      PreloadStore.store(key, bootstrapsPackage[ key ]);
    });

    application.advanceReadiness();
  });
}

export default {
  name: '00-bootstrap',
        initialize
};