(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetStatusController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		function($scope, $rootScope, $modal, $sails) {
			var widget = $scope.widget;

			$scope.data = {
				value: "ok",
				message: null
			};

			// When opening the widget we need to get all the latest data
			// this will also subscribe ourself to the data model so we
			// can listen to changes
			io.socket.get("/api/v1/data/" + widget.dataset, function(data) {
				$scope.data.value = data[0].content.value;
				$scope.data.message = "Last change reported " + moment(data[0].createdAt).format("MMMM/D h:mm a");
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				if(data.verb == "created") {
					if(data.data.dataset == widget.dataset) {
						$scope.data.value = data.data.content.value;
						console.log($scope.data.value);
						$scope.data.message = "Last change reported " + moment(data.data.createdAt).format("MMMM/D h:mm a");
					}
				}
			});

			/**
			 * React to event "openAddDataPoint"
			 * @type {[type]}
			 */
			$scope.openForm = function(widget) {
				$modal.open({
					templateUrl: "/widgets/status/form",
					controller: "WidgetStatusFormController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}

			/**
			 * React to event "openWidgetSettings"
			 * @type {[type]}
			 */
			$scope.openSettings = function(widget) {
				$modal.open({
					templateUrl: "/widgets/status/settings",
					controller: "WidgetStatusSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetStatusSettingsController", [
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

			$scope.update = function () {
				Widgets.update({widgetId: widget.id}, {
					title: $scope.data.title,
					description: $scope.data.description,
					dataset: $scope.data.dataset,
					settings: {
						
					}
				}, function(result) {
					console.log(result);
				});

		    $modalInstance.close();
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	])

	.controller("WidgetStatusFormController", [
		"$scope",
		"$modalInstance",
		"widget",
		"Data",
		function($scope, $modalInstance, widget, Data) {
			$scope.ok = function () {
				var data = {
					widgetId: widget.id,
					value: $scope.value
				}

				// By using the API, we make sure that the event is received
				// via sockets, if we use sockets to save the data, the event
				// will not be received for some reason
				Data.save(data, function(result) {
					console.log(result);
		    	$modalInstance.close();
				});
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	]);


})();
