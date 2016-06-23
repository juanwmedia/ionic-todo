function TodoController($ionicModal, $ionicListDelegate, $scope, $firebaseArray) {
    var vm = this;
    vm.shouldShowDelete = false;
    vm.shouldShowReorder = false;
    vm.listCanSwipe = true
    vm.tareaEditada = null;

    $ionicModal.fromTemplateUrl('agregar-tarea.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        vm.modalAgregar = modal;
    });

    $ionicModal.fromTemplateUrl('editar-tarea.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        vm.modalEditar = modal;
    });

    // Funciones/métodos con Firebase
    var ref = firebase.database().ref().child("tareas");

    vm.tareas = $firebaseArray(ref);

    vm.abrirAgregarTarea = function () {
        vm.modalAgregar.show();
    };

    vm.cerrarAgregarTarea = function () {
        vm.modalAgregar.hide();
    };

    vm.agregarTarea = function(tarea) {
        vm.tareas.$add({
            titulo: tarea.titulo,
            completado: false
        });
        vm.modalAgregar.hide();
        tarea.titulo = '';
    };

    vm.abrirEditarTarea = function (tarea) {
        vm.tareaEditada = tarea;
        vm.modalEditar.show();
    };

    vm.cerrarEditarTarea = function () {
        vm.modalEditar.hide();
    };

    vm.editarTarea = function () {
        vm.tareas.$save(vm.tareaEditada);
        vm.modalEditar.hide();
        $ionicListDelegate.closeOptionButtons();
    };

    vm.eliminarTarea = function (tarea) {
        vm.tareas.$remove(tarea);
    };

    vm.cambiarEstadoTarea = function(tarea) {
        tarea.completado = !tarea.completado;
        vm.tareas.$save(tarea);
        $ionicListDelegate.closeOptionButtons();
    }
}

angular
    .module('TodoApp')
    .controller('TodoController', TodoController);