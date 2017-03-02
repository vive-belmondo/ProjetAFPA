(function () {
  'use strict';

  angular
    .module('users')
    .controller('UserNewController', UserNewController);

  UserNewController.$inject = ['$scope', '$state', 'UsersService','EtablissementsService','FonctionsService', '$location', '$window', 'Authentication', 'PasswordValidator', 'Notification'];

  function UserNewController($scope, $state, UsersService ,EtablissementsService,FonctionsService, $location, $window, Authentication, PasswordValidator, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.callOauthProvider = callOauthProvider;
    vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
    vm.fonctions = FonctionsService.query();
    vm.etablissements = EtablissementsService.query();

    // Get an eventual error defined in the URL query string:
    if ($location.search().err) {
      Notification.error({ message: $location.search().err });
    }

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      // $location.path('/');
      console.log("test");
    }

    function signup(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');
        return false;
      }
      UsersService.usersignup(vm.credentials)
        .then(onUsersignupSuccess)
        .catch(onUsersignupError);
    }


    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      // $window.location.href = url;
    }

    // Authentication Callbacks

    function onUsersignupSuccess(response) {
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> signup successful!' });
      // And redirect to the previous or home page
      // $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onUsersignupError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> signup Error!', delay: 6000 });
    }
  }
}());
