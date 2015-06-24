"use strict";

angular.module('locator.moodselection', []).directive('moodselection', function () {

    var template = [
        '<div class="mood-selection-container">',
        '<div class="ms-selected-moods-add-icon-container">',
        '<div class="ms-selected-moods" ng-repeat="mood in selectedMoods">',
        '<div class="ms-mood-images tt tt-small" aria-label="{{mood.title}}">',
        '<img class="ms-mood-image" ng-src="images/icons/{{mood.icon}}">',
        '</div>',
        '<img class="ms-cross-image" src="lib/components/angular-mood-selection/images/cross_blue.png" ng-click="removeSelectedMood(mood)">',
        '</div>',
        '<img class="add-icon pointer" src="lib/components/angular-mood-selection/images/plus.png" ng-click="toggleShowSelectableMoods()" ng-hide="3 == selectedMoods.length">',
        '</div>',
        '<div class="arrow-wrapper">',
        '<img class="arrow pointer" ng-show="showSelectableMoods==true && showUp == true" src="lib/components/angular-mood-selection/images/small_arrow_black_up.png" ng-click="scrollUp()">',
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
        '<div class="arrow-wrapper">',
        '<img class="arrow pointer" ng-show="showSelectableMoods==true && showDown == true" src="lib/components/angular-mood-selection/images/small_arrow_black_down.png" ng-click="scrollDown()">',
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
            $scope.scroll = 0;
            $scope.showUp = true;
            $scope.showDown = true;

            angular.element(document).ready(function() {
                if($('.available-moods-container').outerHeight() > 300) {
                    $scope.showUp = false;
                    $scope.showDown = false;                }
            });

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

            $scope.toggleShowSelectableMoods = function() {
                $scope.showSelectableMoods = true;
            }

            $scope.getMoodQuery = function(moods) {
                var moodQuery = [];
                moods.forEach(function (entry) {
                    moodQuery.push(entry.query_name);
                });
                return moodQuery.join('.');
            }

            $scope.scrollDown = function() {

                if($('.available-moods-container')[0].scrollHeight - $('.available-moods-container').outerHeight() == $('.available-moods-container').scrollTop()) {
                    return;
                }
                $scope.showUp = true;
                $('.available-moods-container').animate({
                    scrollTop: $('.available-moods-container').scrollTop() + 50
                }, 200);
            }

            $scope.scrollUp = function() {
                if(0 == $('.available-moods-container').scrollTop()) {
                    return;
                }
                $scope.showDown = true;
                $('.available-moods-container').animate({
                    scrollTop: $('.available-moods-container').scrollTop() - 50
                }, 200);
            }
        },

        template: template.join('')
    };
});
