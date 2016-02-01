// define angular main controller
app.controller('MainController',['$scope', 'piWebApiREST', function($scope, piWebApiREST) {
  //----------- helper functions to change scope variables -----------------
  var changeStateName = function(stateName) {
    $scope.stateName = stateName;
  };

  var changeStateAbbreviation = function(stateAbbreviation) {
    // highlight newly selected state
    var dataObj = {};
    if ($scope.stateAbbreviation !== undefined) {
      var oldState = $scope.stateAbbreviation;
      dataObj[oldState] = { fillKey: 'defaultFill' };
    }
    dataObj[stateAbbreviation] = { fillKey: 'selected' }
    $scope.mapObject.data = dataObj;

    // update state abbreviation
    $scope.stateAbbreviation = stateAbbreviation;
  };

  var changeStatePopulation = function(statePopulation) {
    $scope.statePopulation = statePopulation;
  };

  var changeCurrentDuration = function(currentDuration, updateTime) {
    $scope.currentDuration = currentDuration;
    $scope.updateTime = updateTime;
  };

  var changeMinDuration = function(minDuration) {
    $scope.minDuration = minDuration;
  };

  var changeMaxDuration = function(maxDuration) {
    $scope.maxDuration = maxDuration;
  };

  var changeAvgDuration = function(avgDuration) {
    $scope.avgDuration = avgDuration;
  };

  var addPlotData = function(plotDataTimestamp, plotDataValue) {
    $scope.myData[0].push([new Date(plotDataTimestamp).getTime(), plotDataValue]);
  };

  var sortPlotData = function() {
    $scope.myData[0].sort(function (a, b) {
      if (a[0] === b[0]) {
        return 0;
      }
      else {
        return (a[0] < b[0]) ? -1 : 1;
      }
    });
  };
  //----------- helper functions to change scope variables (end) -------------

  //----------- intializating map and trend ----------------------------------
  // initialize state map
  $scope.mapObject = {
    scope: 'usa',
    responsive: true,
    geographyConfig: {
      highlightBorderColor: 'white',
      popupTemplate: function(geo) {
        return ['<div class="hoverinfo"><strong>', geo.properties.name,
          ' ', getMidnightValue(geo.properties.name), '</strong></div>'].join('');
      }
    },
    fills: {
      'selected': '#330000',
      'defaultFill': '#8BC3FB'
    }
  };

  // set trend plot options
  $scope.myData = [[]];
  $scope.myChartOptions = {
    xaxis: {
        mode: 'time',
        timeformat: '%m/%d<br>%H:%M:%S',
        timezone: 'browser',
    }
  };
  //----------- intializating map and trend (end)-----------------------------

  //----------- student TODO area --------------------------------------------
  // user clicks on a state on map
  $scope.clickState = function(geography) {
    changeStateData(geography.properties.name)
  };

  // user types in state query in search box
  $scope.searchState = function() {
    if ($scope.searchQuery !== '' && $scope.searchQuery !== undefined) {
      // TODO: Exercise 3e

    }
  }

  // update state data on page
  var changeStateData = function(stateName) {
    $scope.myData = [[]]

    // update state name
    changeStateName(stateName);

    // update state abbreviation
    piWebApiREST.getAttributeByPath(stateName, "Abbreviation").then(function(data) {
      piWebApiREST.getValue(data.WebId).then(function (data) {
        changeStateAbbreviation(data.Value);
      });
    });

    // update state population
    piWebApiREST.getAttributeByPath(stateName, "Population").then(function(data) {
      piWebApiREST.getValue(data.WebId).then(function (data) {
        // TODO: Exercise 3a
        
        // TODO: Exercise 3a (end)
      });
    });

    // get attribute webId and update data
    piWebApiREST.getAttributeByPath(stateName, "VisitDuration").then(function(data) {
      attributeWebId = data.WebId;

      // update current visit duration
      updateCurrentValue(attributeWebId);

      // update statistics
      updateSummaryValues(attributeWebId);

      // update plot
      updatePlotValues(attributeWebId);
    });
  };

  // update "Most recent visit duration"
  var updateCurrentValue = function(webId) {
    piWebApiREST.getStreamValue(webId).then(function (data) {
      // TODO: Exercise 3b

      // TODO: Exercise 3b (end)
    });
  };

  // update "Site visit duration statistics"
  var updateSummaryValues = function(webId) {
    piWebApiREST.getSummary(webId, startTimePI).then(function (data) {
      // TODO: Exercise 3c

      // TODO: Exericse 3c (end)
    });
  };

  // update "Trend"
  var updatePlotValues = function(webId) {
    piWebApiREST.getPlot(webId, startTimePI, plotWidth).then(function(data) {
      // TODO: Exercise 3d

      // TODO: Exericse 3d (end)
      sortPlotData();
    });
  };
  //----------- student TODO area (end)----------------------------------------

  //----------- bonus student TODO --------------------------------------------
  // get duration value at midnight
  var stateMidnightValue = {};
  var getMidnightValue = function(stateName) {
    if (stateMidnightValue[stateName] !== undefined) {
      return stateMidnightValue[stateName];
    } else {
      // TODO: Exercise 3 Bonus

      // TODO: Exercise 3 Bonus (end)
    }
  };
  //----------- bonus student TODO (end) --------------------------------------
}]);
