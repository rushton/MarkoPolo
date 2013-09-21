'use strict';

describe('Service: locationposter', function () {

  // load the service's module
  beforeEach(module('markopoloApp'));

  // instantiate service
  var locationposter;
  beforeEach(inject(function (_locationposter_) {
    locationposter = _locationposter_;
  }));

  it('should do something', function () {
    expect(!!locationposter).toBe(true);
  });

});
