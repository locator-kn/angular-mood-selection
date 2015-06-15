"use strict";

angular.module('locator.moodselection', []).directive('moodselection', function () {

    var template = [
        '<div class="mood-selection-container">',
        '<div class="selected-mood" ng-repeat="selectedMood in selectedMoods">',
        '<img class="icon" ng-src="/images/icons/{{selectedMood.icon}}">',
        '<div>',
        '{{selectedMood.title}}',
        '</div>',
        '<div class="remove-mood" ng-click="removeSelectedMood(selectedMood)">x</div>',
        '</div>',
        '<img src="/images/icons/plus.png" ng-click="showSelectableMoods=true" ng-hide="selectableMoods.length == selectedMoods.length">',
        '<div ng-show="showSelectableMoods==true">',
        '<div ng-repeat="mood in selectableMoods" ng-if="!moodIsSelected(mood)">',
        '<div ng-click="selectMood(mood)">',
        '{{mood.title}}',
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
                console.info($scope.selectableMoods);
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
