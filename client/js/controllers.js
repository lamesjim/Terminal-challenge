"use strict";

app.controller("MainController", ["$scope", "MainService", function($scope, MainService) {
    $scope.view = {};
    $scope.view.entry = {};
    $scope.view.quiz = MainService.quiz.length > 0 ? MainService.quiz : [];
    $scope.view.editEntry = {};
    $scope.view.canEdit = false;

    $scope.submit = function(ques, ans) {
        $scope.view.entry.number = $scope.view.quiz.length + 1;
        $scope.view.quiz.push($scope.view.entry);
        $scope.view.entry = {};
    };

    $scope.delete = function(num) {
        // find question to delete
        for (let i = 0; i < $scope.view.quiz.length; i++) {
            if ($scope.view.quiz[i].number === Number(num)) {
                $scope.view.quiz.splice(i, 1);
            }
        }
        // update question numbers
        $scope.view.quiz.map( (el, idx) => {
            el.number = idx + 1;
        });
    };

    $scope.edit = function($index) {
        $scope.view.canEdit = true;
        $scope.$index = $index;
        angular.copy($scope.view.quiz[$index], $scope.view.editEntry);
    };

    $scope.saveEdit = function() {
        $scope.view.canEdit = false;
        angular.copy($scope.view.editEntry, $scope.view.quiz[$scope.$index]);
    };

    $scope.view.fail = {};
    $scope.view.fail.isTrue = false;
    $scope.view.fail.message = "Error when saving. Please review your changes and try again.";

    $scope.view.success = {};
    $scope.view.success.isTrue = false;
    $scope.view.success.message = "Saved successfully";

    $scope.saveQuiz = function (quiz) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.1) {
                    // pretend the save failed
                    $scope.$apply(function() {
                        $scope.view.fail.isTrue = true;
                        $scope.view.success.isTrue = false;
                    });
                    return reject(new Error('Quiz randomly failed to save'));
                }
                // pretend the save succeeded
                $scope.$apply(function() {
                    $scope.view.fail.isTrue = false;
                    $scope.view.success.isTrue = true;
                });

                MainService.saveQuiz(quiz);
                return resolve();
            }, Math.random() * 1000);
        });
    }
}]);
