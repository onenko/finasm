var FTableTest = angular.module('FTableTestApp', []);
FTableTest.controller('FTableTestCtrl', function ($scope) {
  $scope.ft = new FinanceTable();
//  $Scope.dc = new datecordeon($scope.ft.title, $scope.ft.template, $scope.ft.aggregate);
  $scope.ft.grid.push($scope.ft.createTitleRow());
  var november = 10; 
  var row = $scope.ft.getRow(new Date(2015, november, 11));
  row.exp.Havka = 11;
  row = $scope.ft.getRow(new Date(2015, november, 13));
  row.exp.Havka = 13;
  row = $scope.ft.getRow(new Date(2015, november, 23));
  row.exp.Trnsp = 23;
  row = $scope.ft.getRow(new Date(2015, november, 24));
  row.pay.Mine = 111;
});