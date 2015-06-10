(function() {
	'use strict';


	angular.module("dashi3")
	.controller("WidgetTwitteruserController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		"$interval",
		function($scope, $rootScope, $modal, $sails, $interval) {
			var widget = $scope.widget;

			$scope.data = {
				tweets: [],
				start: moment().format("h:mm a"),
				counter: 0
			}

			io.socket.get('/api/v1/providers/twitter/statuses');
			io.socket.on("twitter:user", function(data) {
				$scope.data.counter++;

				if($scope.data.tweets.length > $scope.widget.settings.maxTweets-1) {
					$scope.data.tweets.pop();
					$scope.data.tweets.unshift(data.tweet);
				}
				else {
					$scope.data.tweets.push(data.tweet);
				}
			});

			/**
			 * React to event "openWidgetSettings"
			 * @type {[type]}
			 */
			$scope.openSettings = function(widget) {
				$modal.open({
					templateUrl: "/widgets/twitteruser/settings",
					controller: "WidgetTwitteruserSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetTwitteruserSettingsController", [
		"$scope",
		"$rootScope",
		"$modalInstance",
		"widget",
		"Widgets",
		function($scope, $rootScope, $modalInstance, widget, Widgets) {
			$scope.data = widget;
			$scope.remove = function() {
				Widgets.remove({widgetId: widget.id});
				$rootScope.$broadcast("dashboard:widget:remove", widget);
				$modalInstance.close();
			}

			if(!$scope.data.settings.user) {
				$scope.data.settings.user = "twitter";
			}

			$scope.update = function () {
				Widgets.update({widgetId: widget.id}, {
					title: $scope.data.title,
					description: $scope.data.description,
					dataset: $scope.dataset,
					settings: {
						maxTweets: $scope.data.settings.maxTweets
					}
				}, function(result) {
					
				});

		    $modalInstance.close();
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	]);
})();
