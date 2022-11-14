var app = angular.module("todoApp", []);

app.controller(
  "TodoController",
  function ($rootScope, $timeout, $scope, $http) {
    $scope.todos = [];

    getTodos($rootScope, $timeout, $scope, $http, paginationFilter);

    $scope.$on("getTodos", function (evt) {
      getTodos($rootScope, $timeout, $scope, $http, paginationFilter);
    });
    $scope.changeSorting = function (sortBy) {
      paginationFilter = {
        ...paginationFilter,
        sortBy: sortBy,
        descending: !paginationFilter.descending,
      };
      $scope.$broadcast("getTodos");
    };
  }
);

app.controller("PaginationController", function ($rootScope, $scope) {
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

  $scope.$on("setPagination", function (evt, args) {
    $scope.currentPage = args.pageNo;
    $scope.totalItems = args.totalItems;
    $scope.totalPages = args.totalPages;
  });

  $scope.nextPage = function () {
    if ($scope.totalPages == paginationFilter.pageNo) {
      return;
    }
    paginationFilter = {
      ...paginationFilter,
      pageNo: paginationFilter.pageNo + 1,
    };
    $rootScope.$broadcast("getTodos");
  };
  $scope.previousPage = function () {
    if (paginationFilter.pageNo == 1) {
      return;
    }
    paginationFilter = {
      ...paginationFilter,
      pageNo: paginationFilter.pageNo - 1,
    };
    $rootScope.$broadcast("getTodos");
  };
  $scope.selectPage = function (page) {
    paginationFilter = {
      ...paginationFilter,
      pageNo: page,
    };
    $rootScope.$broadcast("getTodos");
  };
  $scope.lastPage = function () {
    paginationFilter = {
      ...paginationFilter,
      pageNo: $scope.totalPages,
    };
    $rootScope.$broadcast("getTodos");
  };

  $scope.getSelectValue = function () {
    paginationFilter = {
      ...paginationFilter,
      pageSize: $scope.selected.name,
    };
    $rootScope.$broadcast("getTodos");
  };
});

var paginationFilter = {
  sortBy: "createdDate",
  pageNo: 1,
  pageSize: 20,
  descending: true,
};

function getTodos($rootScope, $timeout, $scope, $http, filter) {
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

            $rootScope.$broadcast("setPagination", {
              pageNo: paginationFilter.pageNo,
              totalItems: response.data.totalItems,
              totalPages: response.data.totalPages,
            });
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
    scope: true,
  };

  return directive;
});

app.directive("pagination", function () {
  var directive = {
    restrict: "E",
    templateUrl: "app/templates/pagination.html",
    scope: true,
  };

  return directive;
});
