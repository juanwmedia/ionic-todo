function TodoController($ionicModal,$ionicListDelegate, $scope) {
    var vm = this;
    vm.shouldShowDelete = false;
    vm.shouldShowReorder = false;
    vm.listCanSwipe = true
    vm.tareaEditada = null;
    vm.tareas = [
        {titulo: 'Hacer la compra', completado: false},
        {titulo: 'Aprender Ionic', completado: false},
        {titulo: 'Pulir Angular', completado: false},
        {titulo: 'Limpiar la casa', completado: false},
        {titulo: 'Ir a la playa', completado: false},
    ];

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

    // Funciones/métodos
    vm.abrirAgregarTarea = function () {
        vm.modalAgregar.show();
    };

    vm.cerrarNuevaTarea = function () {
        vm.modalAgregar.hide();
    };

    vm.agregarTarea = function (tarea) {
        vm.tareas.unshift({
            titulo: tarea.titulo,
            completado: false,
        });
        vm.modalAgregar.hide();
        tarea.titulo = '';
    };

    vm.eliminarTarea = function (indice) {
        vm.tareas.splice(indice, 1);
    };

    vm.editarTarea = function (indice) {
        vm.tareaEditada = vm.tareas[indice];
        vm.modalEditar.show();
    };

    vm.guardarTareaEditada = function () {
        vm.tareas[vm.tareas.indexOf(vm.tareaEditada)].titulo = vm.tareaEditada.titulo;
        vm.modalEditar.hide();
        $ionicListDelegate.closeOptionButtons();
    };

    vm.cerrarEditarTarea = function () {
        vm.modalEditar.hide();
    };
}

angular
    .module('TodoApp')
    .controller('TodoController', TodoController);
