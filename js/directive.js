"use strict";

angular.module('locator.moodselection', []).directive('moodselection', function () {

    var template = [
        '<div class="mood-selection-container">',
        '<div class="mood-selection-container">',
        '<div class="selected-moods-add-icon-container">',
        '<div class="selected-moods" ng-repeat="mood in selectedMoods">',
        '<div class="mood-images tt tt-small" aria-label="{{mood.title}}">',
        '<img class="mood-image" ng-src="images/icons/{{mood.icon}}">',
        '</div>',
        '<img class="cross-image" src="lib/components/angular-mood-selection/images/cross_blue.png" ng-click="removeSelectedMood(mood)">',
        '</div>',
        '<img class="add-icon pointer" src="lib/components/angular-mood-selection/images/plus.png" ng-click="showSelectableMoods=true" ng-hide="3 == selectedMoods.length">',
        '</div>',
        '<div class="available-moods-wrapper">',
        '<div class="available-moods-container">',
        '<div ng-show="showSelectableMoods==true">',
        '<div class="available-mood" ng-repeat="mood in selectableMoods" ng-if="!moodIsSelected(mood)">',
        '<div class="pointer" ng-click="selectMood(mood)">',
        '{{mood.title}}',
        '</div>',
        '<img class="icon" ng-src="images/icons/{{mood.icon}}">',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ];

    return {
        scope: {
            selectedMoods: '=',
            query: '=',
            selectableMoods: '='
        },

        controller: function ($scope, lodash) {
            $scope.showSelectableMoods = false;

            $scope.selectMood = function (mood) {
                $scope.selectedMoods.push(mood);
                $scope.query.moods = ($scope.getMoodQuery($scope.selectedMoods));
                $scope.showSelectableMoods = false;
            }

            //checks if a mood is selected, crazy lodash stuff
            $scope.moodIsSelected = function (mood) {
                return !!lodash.find($scope.selectedMoods, function (chr) {
                    return chr.query_name === mood.query_name;
                });
            }

            $scope.removeSelectedMood = function(mood) {
                $scope.selectedMoods.splice($scope.selectedMoods.indexOf(mood), 1);
                $scope.query.moods = ($scope.getMoodQuery($scope.selectedMoods));
            }

            $scope.getMoodQuery = function(moods) {
                var moodQuery = [];
                moods.forEach(function (entry) {
                    moodQuery.push(entry.query_name);
                });
                return moodQuery.join('.');
            }
        },

        template: template.join('')
    };
});
