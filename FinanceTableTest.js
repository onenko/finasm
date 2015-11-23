var FTableTest = angular.module('FTableTestApp', []);
FTableTest.controller('FTableTestCtrl', function ($scope) {
  $scope.ft = new FinanceTable();
  var row = $scope.ft.getRow(new Date(2015, 10, 11));
  row.e = 11;
  row = ft.getRow(new Date(2015, 10, 13));
  row.e = 13;
  row = ft.getRow(new Date(2015, 10, 23));
  row.t = 23;
});