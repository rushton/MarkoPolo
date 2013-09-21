'use strict';

describe('Service: coordtocity', function () {

  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var coordtocity;
  beforeEach(inject(function (_coordtocity_) {
    coordtocity = _coordtocity_;
  }));

  it('should do something', function () {
    expect(!!coordtocity).toBe(true);
  });

});
