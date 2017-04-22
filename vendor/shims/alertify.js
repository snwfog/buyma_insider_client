(function() {
  function vendorModule() {
    'use strict';

    // Remove the css insert from original code
    return { 'default': self['alertify'] };
  }

  define('alertify', [], vendorModule);
})();
