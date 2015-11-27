var FTableTest = angular.module('FTableTestApp', []);
FTableTest.controller('FTableTestCtrl', function ($scope) {
  $scope.ft = new FinanceTable();
  var row = $scope.ft.getRow(new Date(2015, 10, 11));
  row.Havka = 11;
  row = $scope.ft.getRow(new Date(2015, 10, 13));
  row.Havka = 13;
  row = $scope.ft.getRow(new Date(2015, 10, 23));
  row.Trnsp = 23;
});