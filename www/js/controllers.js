function TodoController($ionicModal, $ionicListDelegate, $scope, $firebaseArray, $firebaseAuth) {
    var vm = this;
    vm.autenticado = false;
    vm.usuario = null;
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
    // Auth
    vm.auth = $firebaseAuth();

    vm.conectar = function () {
        console.log('Hola');
        vm.auth.$signInWithPopup("google").then(function (firebaseUser) {
            vm.autenticado = true;
        }).catch(function (error) {
            vm.autenticado = false;
        });
    };

    vm.desconectar = function () {
        vm.auth.$signOut();
    };

    vm.auth.$onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            console.info(firebaseUser);
            vm.autenticado = true;
            vm.usuario = firebaseUser;
        } else {
            console.log("Signed out");
            vm.autenticado = false;
            vm.usuario = null;
        }
    });

    // Real-time database
    var ref = firebase.database().ref().child("tareas");

    vm.tareas = $firebaseArray(ref);

    vm.abrirAgregarTarea = function () {
        vm.modalAgregar.show();
    };

    vm.cerrarAgregarTarea = function () {
        vm.modalAgregar.hide();
    };

    vm.agregarTarea = function (tarea) {
        vm.tareas.$add({
            titulo: tarea.titulo,
            usuario: vm.usuario.displayName,
            foto: vm.usuario.photoURL,
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

    vm.cambiarEstadoTarea = function (tarea) {
        tarea.completado = !tarea.completado;
        vm.tareas.$save(tarea);
        $ionicListDelegate.closeOptionButtons();
    }
}

angular
    .module('TodoApp')
    .controller('TodoController', TodoController);