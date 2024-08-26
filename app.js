// Ejemplo de frases iniciales
const frasesEjemplo = [
    { frase: '"La vida no se mide por las veces que respiramos, sino por los momentos que nos quitan el aliento."', autor: 'George Carlin' },
    { frase: '"El éxito es la suma de pequeños esfuerzos repetidos día tras día."', autor: 'Robert Collier' },
    { frase: '"No dejes que el ruido de las opiniones ajenas ahogue tu propia voz interior."', autor: 'Steve Jobs' },
    { frase: '"El único límite a nuestros logros de mañana es nuestras dudas de hoy."', autor: 'Franklin D. Roosevelt' },
    { frase: '"La única manera de hacer un gran trabajo es amar lo que haces."', autor: 'Steve Jobs' }
];

// Importar la función createApp y el ref de Vue
const { createApp, ref } = Vue;

// Crear la aplicación Vue
const app = createApp({
    setup() {
        // Estado reactivo para las frases
        const frases = ref(frasesEjemplo);
        // console.log("Frases iniciales:", frases.value);

        // Estado reactivo para nueva frase y autor
        const nuevaFrase = ref('');
        const nuevoAutor = ref('');

        // Estado reactivo para frase en edición y el índice de edición
        const fraseEdicion = ref(null);
        const indiceEdicion = ref(null);

        // Estado reactivo para mostrar alertas
        const alerta = ref(null);

        // Estado reactivo para eliminar una frase
        const indiceEliminar = ref(null);

        // Función para añadir una nueva frase
        const add = () => {
            // Verificar si los campos están llenos
            if (nuevaFrase.value.trim() && nuevoAutor.value.trim()) {
                // Añadir la nueva frase a la lista
                frases.value.push({ frase: nuevaFrase.value, autor: nuevoAutor.value });
                // Limpiar los campos
                nuevaFrase.value = '';
                nuevoAutor.value = '';
                // Mostrar alerta de éxito
                mostrarAlerta('Frase añadida con éxito', 'success');
            } else {
                // Mostrar alerta de error si los campos están vacíos
                mostrarAlerta('Todos los campos son obligatorios', 'danger');
            }
        };

        // Función para iniciar la edición de una frase
        const iniciarEdicion = (index) => {
            // Clonar la frase seleccionada para edición
            fraseEdicion.value = { ...frases.value[index] };
            // Guardar el índice de la frase en edición
            indiceEdicion.value = index;
            // Mostrar el modal de edición
            const modal = new bootstrap.Modal(document.getElementById('modalEdicion'));
            modal.show();
        };

        // Función para guardar los cambios de edición
        const guardarEdicion = () => {
            // Verificar si los campos están llenos
            if (fraseEdicion.value.frase.trim() && fraseEdicion.value.autor.trim()) {
                // Actualizar la frase en la lista
                frases.value[indiceEdicion.value] = { ...fraseEdicion.value };
                // Mostrar alerta de éxito
                mostrarAlerta('Frase editada con éxito', 'success');
                // Ocultar el modal de edición
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalEdicion'));
                modal.hide();
            } else {
                // Mostrar alerta de error si los campos están vacíos
                mostrarAlerta('Todos los campos son obligatorios para editar', 'danger');
            }
        };

        // Función para eliminar una frase
        const eliminar = (index) => {
            // Guardar el índice de la frase que se desea eliminar
            indiceEliminar.value = index;
            // Mostrar el modal de confirmación utilizando Bootstrap
            const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
            modal.show();
        };

        // Función para confirmar la eliminación de una frase
        const confirmarEliminacion = () => {
            if (indiceEliminar.value !== null) {
                // Eliminar la frase de la lista utilizando el índice guardado
                frases.value.splice(indiceEliminar.value, 1);
                // Mostrar alerta de éxito
                mostrarAlerta('Frase eliminada con éxito', 'warning');
                // Reiniciar el índice de eliminación
                indiceEliminar.value = null;
                // Ocultar el modal de confirmación
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalConfirmacion'));
                modal.hide();
            }
        };

        // Función para mostrar una alerta
        const mostrarAlerta = (mensaje, tipo) => {
            // Configurar la alerta
            alerta.value = { mensaje, tipo };
            // Ocultar la alerta después de 3 segundos
            setTimeout(() => {
                alerta.value = null;
            }, 3000);
        };

        // Retornar los datos y funciones que estarán disponibles en el template
        return {
            frases,
            nuevaFrase,
            nuevoAutor,
            fraseEdicion,
            indiceEdicion,
            add,
            iniciarEdicion,
            guardarEdicion,
            eliminar,
            confirmarEliminacion,
            mostrarAlerta,
            alerta
        };
    }
    
});

// Montar la aplicación en el elemento con id 'myapp'
app.mount('#myapp');