let sendgrid = angular.module('sendgrid', [
    'ngResource',
    'ngSanitize',
    'ngMessages',
    'ngAnimate'
]).controller('SendgridCtrl', ($scope, $rootScope) => {
    $rootScope.app.entities.get('sendgrid').getQuery('latest').run().then(emails => {
        $scope.emails = emails.data
        $scope.nbEmails = emails.count
        $scope.$apply()
    }).catch(e => {
        console.log('error', e, e.stack)
    })
})
module.exports = sendgrid