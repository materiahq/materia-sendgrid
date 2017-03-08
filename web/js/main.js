let sendgrid = angular.module('sendgrid', [
    'ngResource',
    'ngSanitize',
    'ngMessages',
    'ngAnimate'
]).controller('SendgridCtrl', ($scope, $rootScope, AddonsService, QueryService) => {
    $scope.AddonsService = AddonsService

    $scope.setup = () => {
        AddonsService.setup($rootScope.app.addons.get('@materia/sendgrid'))
    }

    $scope.send = (ev) => {
        QueryService.execute($rootScope.app.entities.get('sendgrid').getQuery('send'), null, ev)
    }

    $rootScope.$on('query::run', (e, data) => {
        if (data.entity == 'sendgrid' && data.query == 'send') {
            init()
        }
    })

    function init() {
        $rootScope.app.entities.get('sendgrid').getQuery('latest').run().then(emails => {
            $scope.emails = emails.data
            $scope.nbEmails = emails.count
            $scope.$apply()
        }).catch(e => {
            console.log('error', e, e.stack)
        })
    }

    init()
})
module.exports = sendgrid