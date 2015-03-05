(function (){
	var app = angular.module('logic', ['ngRoute','ui.bootstrap']);

	app.constant('API_URL', 'http://localhost:8080/WebServiceRest2/webresources/');
	
	app.config(function($routeProvider) {
             
		$routeProvider
			.when('/materias', {
				templateUrl: 'tpl/materias.html',
				controller: 'signatureController',
                                resolve:{Materias: function($http,API_URL){
                                    return $http.get(API_URL + 'com.servicio.materia')
                                    .then(function(data) {
                                        return data.data;
                                    });
                                }}
			}).
			when('/estudiantes', {
				templateUrl: 'tpl/estudiantes.html',
				controller: 'studentController',
                                resolve:{Estudiantes: function($http,API_URL){
                                    return $http.get(API_URL + 'com.servicio.estudiante')
                                    .then(function(data) {
                                        return data.data;
                                    });
                                }}
			}).
			
			otherwise({
                            redirectTo: '/estudiantes'
                        });
	});
        
	app.run();


	app.controller('signatureController',['$scope','$route','$modal', '$http','API_URL','Materias', function ($scope, $route,$modal, $http, API_URL,Materias){

		$scope.url = API_URL;
                $scope.materias=Materias;
                $scope.deleteSignature   =   function(id){
                    $http.delete($scope.url +'com.servicio.materia/'+id);
                    $route.reload();
                };  
                $scope.openNew = function () {
                
                    var modalInstance = $modal.open({
                        templateUrl: 'tpl/crearMateria.html',
                        controller: 'ModalNewSignature',
                        size: 'sm'
                        /*,
                        resolve: {
                              user: function () {
                            return $scope.user;
                          },
                              exito:function (){

                            return $scope.exito;      
                              }
                        }*/
                    });   
                };
                $scope.openEditSignature = function (materia) {
                    console.log('entro a edit modal siganture');
                    $scope.materia=materia;
                    var modalInstance = $modal.open({
                        templateUrl: 'tpl/editarMateria.html',
                        controller: 'ModalEditSignature',
                        size: 'sm'
                        ,
                        resolve: {
                              signature: function () {
                            return $scope.materia;
                          }
                          /*,
                              exito:function (){

                            return $scope.exito;      
                              }
                        */
                        }
                    });   
                };
            
		
	 }]);

	app.controller('studentController',['$scope','$route' ,'$http','$modal', 'API_URL', 'Estudiantes','$sce', function ($scope,$route, $http,$modal, API_URL,Estudiantes,$sce){
               // $http.defaults.headers.common='Access-Control-Allow-Origin';
            $scope.url = API_URL;
            $scope.estudiantes=Estudiantes;
            $scope.student;
            //$scope.isCollapsed = true;
            $scope.insert =  function(id){
                
            };
            $scope.deleteStudent    =   function(id){
                $http.delete($scope.url +'com.servicio.estudiante/'+id).success(function(){
                    console.log ('succes delete');
                    $route.reload();
                });
               
            };
            $scope.openNew = function () {
                
                var modalInstance = $modal.open({
                    templateUrl: 'tpl/crearEstudiante.html',
                    controller: 'ModalNewStudent',
                    size: 'sm'
                    /*,
                    resolve: {
                          user: function () {
                        return $scope.user;
                      },
                          exito:function (){

                        return $scope.exito;      
                          }
                    }*/
                });   
            };
            $scope.openEdit = function (estudiante) {
                $scope.student=estudiante;
                var modalInstance = $modal.open({
                    templateUrl: 'tpl/editarEstudiante.html',
                    controller: 'ModalEditStudent',
                    size: 'sm'
                    ,
                    resolve: {
                          estudiante: function () {
                        return $scope.student;
                      }
                      /*,
                          exito:function (){

                        return $scope.exito;      
                          }
                    */
                    }
                });   
            };
            
            
	}]);
	
        app.controller('ModalNewStudent', function ($scope,API_URL, $modalInstance,$filter,$http,$route) {
            $scope.user;
            $scope.url=API_URL;
        //$scope.validar=$scope.form.nombrecontacto.$error.minlength;
            $scope.cancel = function () {            
                    $modalInstance.dismiss('cancel');
                };

            $scope.ok = function () {
                //console.log('entra ok');
                var data = {

                    nombre: $filter('limitTo')($scope.user.nombre, 50) ,
                    edad: $filter('limitTo')($scope.user.edad, 2),
                    telefono: $filter('limitTo')($scope.user.telefono, 50),
                    email: $filter('limitTo')($scope.user.email, 50)

                };
                $http.post($scope.url+"com.servicio.estudiante",data).success(function(data, status) {
                    console.log('Succes post'); 
                    $scope.cancel();
                    $route.reload();
                   // $scope.exito=true;
                });
            
            
            };
        });
        
        app.controller('ModalNewSignature', function ($scope,API_URL, $modalInstance,$filter,$http,$route) {
            $scope.signature;
            $scope.url=API_URL;
        //$scope.validar=$scope.form.nombrecontacto.$error.minlength;
         
            $scope.ok = function () {
                //console.log('entra ok');
                var data = {

                    nombre: $filter('limitTo')($scope.signature.nombre, 50) 


                };
                $http.post($scope.url+"com.servicio.materia",data).success(function(data, status) {
                    console.log('Succes post'); 
                    $scope.cancel();
                    $route.reload();
                   // $scope.exito=true;    
                });
            };
        });
        app.controller('ModalEditStudent', function ($scope,estudiante,API_URL, $modalInstance,$filter,$http,$route) {
            $scope.estudiante=estudiante;
            $scope.url=API_URL;
        //$scope.validar=$scope.form.nombrecontacto.$error.minlength;
         
        $scope.ok = function () {
            //console.log('entra ok');
            var data = {
                    id:$filter('limitTo')($scope.estudiante.id, 50),
                    nombre: $filter('limitTo')($scope.estudiante.nombre, 50) ,
                    edad: $filter('limitTo')($scope.estudiante.edad, 2),
                    telefono: $filter('limitTo')($scope.estudiante.telefono, 50),
                    email: $filter('limitTo')($scope.estudiante.email, 50)
                         
            
            };
                $http.put($scope.url+"com.servicio.estudiante/"+estudiante.id,data).success(function(data, status) {
                console.log('Succes put'); 
                $scope.cancel();
                $route.reload();
               // $scope.exito=true;
                });
            
        };
    
        $scope.cancel = function () {
            
             $modalInstance.dismiss('cancel');
        };
    });
    app.controller('ModalEditSignature', function ($scope,signature,API_URL, $modalInstance,$filter,$http,$route) {
            $scope.signature=signature;
            $scope.url=API_URL;
        //$scope.validar=$scope.form.nombrecontacto.$error.minlength;
         
        $scope.ok = function () {
            //console.log('entra ok');
            var data = {
                    id:$filter('limitTo')($scope.signature.id, 50),
                    nombre: $filter('limitTo')($scope.signature.nombre, 50) 
                    
            
            };
                $http.put($scope.url+"com.servicio.materia/"+signature.id,data).success(function(data, status) {
                console.log('Succes put'); 
                $scope.cancel();
                $route.reload();
               // $scope.exito=true;
                });
            
        };
    
        $scope.cancel = function () {
            
             $modalInstance.dismiss('cancel');
        };
    });

    app.factory('Providers', function(){
        var providers = [];
        return {
            getById: function(id) {
                return providers.filter(function(data){
                    return data.data.Id == id;
                })[0];
            },

            setProviders: function(data) {
                providers = data;
            }
        };
    });

})();