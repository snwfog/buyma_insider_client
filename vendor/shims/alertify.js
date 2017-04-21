(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['alertify'] };
  }

  define('alertify', [], vendorModule);
})();
