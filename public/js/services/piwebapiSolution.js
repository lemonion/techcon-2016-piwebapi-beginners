// define angular service to perform HTTP requests to PI Web API
app.factory('piWebApiREST', ['$http', function($http) {
  var piWebApiRESTService = {};

  var baseUrl = 'https://pisrv01.pischool.int/piwebapi';
  var afServer = 'pisrv01';
  var afDatabase = 'WebTraffic';
  var rootElement = 'USStates';

  $http.defaults.withCredentials = true;

  // get attribute information by specifying full AF path
  piWebApiRESTService.getAttributeByPath = function(stateName, attributeName) {
    var url = urlHelper(
      baseUrl,
      'attributes',
      [ 'path=\\\\{0}\\{1}\\{2}\\{3}|{4}'.format(afServer, afDatabase, rootElement, stateName, attributeName) ]
    );
    return $http.get(url).then(function (response) {
      return response.data;
    });
  };

  // get value of attribute with no data reference
  piWebApiRESTService.getValue = function(webId) {
    var url = urlHelper(
      baseUrl,
      'attributes/{0}/value'.format(webId)
    );
    return $http.get(url).then(function (response) {
      return response.data;
    });
  };

  // get value of attribute with a data reference
  piWebApiRESTService.getStreamValue = function(webId) {
    // TODO: Exercise 3b
    var url = urlHelper(
      baseUrl,
      'streams/{0}/value'.format(webId)
    );
    // TODO: Exericse 3b (end)
    return $http.get(url).then(function (response) {
      return response.data;
    });
  };

  // get summary data from specified start time till current time
  piWebApiRESTService.getSummary = function(webId, startTime) {
    // TODO: Exercise 3c
    var url = urlHelper(
      baseUrl,
      'streams/{0}/summary'.format(webId),
      [ 'SummaryType=Minimum', 'SummaryType=Maximum', 'SummaryType=Average', 'startTime=' + startTime]
    );
    // TODO: Exercise 3c (end)
    return $http.get(url).then(function (response) {
      return response.data;
    });
  };

  // get plot data from specfied start time till current time
  piWebApiRESTService.getPlot = function(webId, startTime, width) {
    // TODO: Exercise 3d
    var url = urlHelper(
      baseUrl,
      'streams/{0}/plot'.format(webId),
      [ 'intervals=' + width, 'startTime=' + startTime ]
    );
    // TODO: Exercise 3d (end)
    return $http.get(url).then(function (response) {
      return response.data;
    })
  }

  // use search index for query
  piWebApiRESTService.search = function(query) {
    // TODO: Exercise 3e
    var url = urlHelper(
      baseUrl,
      'search/query',
      [ 'q=' + query, 'scope=af:\\\\{0}\\{1}'.format(afServer, afDatabase), 'fields:name; attributes; webid' ]
    );
    // TODO: Exercise 3e (end)
    return $http.get(url).then(function (response) {
      return response.data;
    })
  }

  // TODO: Exercise 3 Bonus
  piWebApiRESTService.getRecordedAtTime = function(webId, time) {
    var url = urlHelper(
      baseUrl,
      'streams/{0}/recordedattime'.format(webId),
      [ 'time=' + time ]
    );
    return $http.get(url).then(function (response) {
      return response.data;
    })
  }
  // TODO: Exercise 3 Bonus (end)

  return piWebApiRESTService;
}]);
