var app = angular.module("todoApp", []);

app.run(function ($rootScope) {
  $rootScope.todos = [];
});

app.controller("TodoController", function ($timeout, $scope, $http) {
  // example controller creating the rootScope bindings
  // example of xhr call to the server's 'RESTful' api

  getTodos($timeout, $scope, $http, paginationFilter);

  $scope.changeSorting = function (sortBy) {
    paginationFilter = {
      ...paginationFilter,
      sortBy: sortBy,
      descending: !paginationFilter.descending,
    };
    getTodos($timeout, $scope, $http, paginationFilter);
  };
});

app.controller("PaginationController", function ($timeout, $scope, $http) {
  $scope.currentPage = paginationFilter.pageNo;

  $scope.pageSize = [
    {
      id: 1,
      name: "10",
    },
    {
      id: 2,
      name: "20",
    },
    {
      id: 3,
      name: "30",
    },
    {
      id: 4,
      name: "all",
    },
  ];

  $scope.nextPage = function () {
    console.log($scope.selected);
    paginationFilter = {
      ...paginationFilter,
      pageNo: paginationFilter.pageNo + 1,
    };
    getTodos($timeout, $scope, $http, paginationFilter);
  };
  $scope.previousPage = function () {
    paginationFilter = {
      ...paginationFilter,
      pageNo: paginationFilter.pageNo - 1,
    };
    if (paginationFilter.pageNo <= 1) {
      return;
    }
    getTodos($timeout, $scope, $http, paginationFilter);
  };
  $scope.selectPage = function (page) {
    paginationFilter = {
      ...paginationFilter,
      pageNo: page,
    };
    getTodos($timeout, $scope, $http, paginationFilter);
  };
  $scope.lastPage = function () {
    paginationFilter = {
      ...paginationFilter,
      pageNo: page,
    };
    getTodos($timeout, $scope, $http, paginationFilter);
  };

  $scope.getSelectValue = function (pageSizeModel) {
    console.log($scope.pageSizeModel);
    paginationFilter = {
      ...paginationFilter,
      pageSize: pageSizeModel,
    };
    getTodos($timeout, $scope, $http, paginationFilter);
  };
});

/**
 * Directive definition function of 'todoPaginatedList'.
 *
 * TODO: correctly parametrize scope (inherited? isolated? which properties?)
 * TODO: create appropriate functions (link? controller?) and scope bindings
 * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
 *
 * @returns {} directive definition object
 */

var paginationFilter = {
  sortBy: "createdDate",
  pageNo: 1,
  pageSize: 20,
  descending: true,
};

function getTodos($timeout, $scope, $http, filter) {
  //$scope.loading = true;
  var data = {
    sortBy: filter.sortBy,
    pageNo: filter.pageNo,
    pageSize: filter.pageSize,
    descending: filter.descending,
  };
  data = JSON.stringify(data);

  $http({
    method: "POST",
    url: "api/Todo/Todos",
    data: data,
  }).then((response) => {
    $timeout(
      function () {
        if (!$scope.$root.$$phase) {
          $scope.$apply(function () {
            $scope.todos = response.data.pages;
            console.log(response.data);
            $scope.currentPage = paginationFilter.pageNo;
            $scope.totalItens = response.data.totalPages;
          });
        }
      },
      500,
      true
    );
  });
}

app.directive("todoPaginatedList", function () {
  var directive = {
    restrict: "E",
    templateUrl: "app/templates/todo.list.paginated.html",
  };

  return directive;
});

app.directive("pagination", function () {
  var directive = {
    restrict: "E",
    templateUrl: "app/templates/pagination.html",
  };

  return directive;
});
