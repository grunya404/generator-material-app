/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * Module definition for the <%= scriptAppName %> module.
 */

(function () {
	'use strict';

	angular
		.module('<%= scriptAppName %>', [
			// Add modules below
			<%= angularModules %>
		])
		.config(appConfig)<% if(features.auth) { %>
		.run(appRun)<% } %>;

	/* App configuration */

	// add appConfig dependencies to inject
	appConfig.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$mdThemingProvider', '$mdIconProvider'<% if (features.auth) { %>, '$httpProvider'<% } %>];

	/**
	 * Application config function
	 *
	 * @param $stateProvider
	 * @param $urlRouterProvider
	 * @param $locationProvider
	 */
	function appConfig($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $mdThemingProvider, $mdIconProvider<% if (features.auth) { %>, $httpProvider<% } %>) {
		$urlRouterProvider.otherwise('/');
		$urlMatcherFactoryProvider.strictMode(false);
		$locationProvider.html5Mode(true);
	<% if(features.auth) { %>
		$httpProvider.interceptors.push('AuthInterceptor');<% } %>

		// define a palette to darken the background of components
		var grayBackgroundMap = $mdThemingProvider.extendPalette(defaultPalette, {'A100': 'fafafa'});
		$mdThemingProvider.definePalette('gray-background', grayBackgroundMap);

		// set the default theme as standard
		var defaultPalette = 'ligh-blue';
		$mdThemingProvider.setDefaultTheme(defaultPalette);

		// customize the theme
		$mdThemingProvider
			.theme(defaultPalette)
			.primaryPalette(defaultPalette)
			.accentPalette('red')
			.backgroundPalette('gray-background');

		var spritePath = 'bower_components/material-design-icons/sprites/svg-sprite/';
		$mdIconProvider.iconSet('navigation', spritePath + 'svg-sprite-navigation.svg');
		$mdIconProvider.iconSet('action', spritePath + 'svg-sprite-action.svg');
		$mdIconProvider.iconSet('content', spritePath + 'svg-sprite-content.svg');
		$mdIconProvider.iconSet('toggle', spritePath + 'svg-sprite-toggle.svg');
		$mdIconProvider.iconSet('alert', spritePath + 'svg-sprite-alert.svg');
	}<% if(features.auth) { %>

	/* App run bootstrap */

	// add appConfig dependencies to inject
	appRun.$inject = ['$rootScope', '$location', 'Auth'];

	/**
	 * Application run function
	 *
	 * @param $rootScope
	 * @param $location
	 * @param Auth
	 */
	function appRun($rootScope, $location, Auth) {
		// Redirect to login if route requires auth and you're not logged in
		$rootScope.$on('$stateChangeStart', function (event, next) {
			Auth.isLoggedInAsync(function (loggedIn) {
				if (next.authenticate && !loggedIn) {
					$location.path('/login');
				}
			});
		});
	}<% } %>;

})();
