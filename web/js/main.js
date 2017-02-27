let sendgrid = angular.module('sendgrid', [
    'ngResource',
    'ngSanitize',
    'ngMessages',
    'ngAnimate'
]).controller('EmailCtrl', ($scope, $rootScope) => {
    $rootScope.app.entities.get('email').getQuery('latest').run().then(emails => {
        console.log('emails', emails)
        $scope.emails = emails.data
        $scope.nbEmails = emails.count
        $scope.$apply()
    }).catch(e => {
        console.log('error', e, e.stack)
    })
    console.log('in app !', $rootScope.app)
}).controller('EmailInstallCtrl', ($scope, $rootScope) => {
    
})
module.exports = sendgrid