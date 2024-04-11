// JavaScript para el planificador de entrenamiento

const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');

// Función para establecer la fecha actual en la interfaz
const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

// Función para agregar una nueva tarea al planificador
const addNewTask = event => {
    event.preventDefault();
    const value = event.target.elements.taskText.value.trim();
    if (!value) return;
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState)
    task.textContent = value;
    tasksContainer.prepend(task);
    event.target.reset();
};

// Función para cambiar el estado de una tarea (completada/no completada)
const changeTaskState = event => {
    event.target.classList.toggle('done');
};

// Función para ordenar las tareas en función de su estado (completada/no completada)
const order = () => {
    const done = [];
    const toDo = [];
    [...tasksContainer.children].forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    return [...toDo, ...done];
}

// Función para renderizar las tareas ordenadas
const renderOrderedTasks = () => {
    const orderedTasks = order();
    tasksContainer.innerHTML = '';
    orderedTasks.forEach(el => tasksContainer.appendChild(el))
}

setDate();

// Función para establecer el objetivo seleccionado por el usuario
function setGoal() {
  var goalSelect = document.getElementById("goal");
  var goal = goalSelect.value;
  alert("Objetivo establecido: " + goal);
}

// Función para registrar el progreso del usuario
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('progressForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Evita que se envíe el formulario automáticamente
      
      // Obtener los valores de los campos
      var duration = parseInt(document.getElementById('duration').value);
      var intensity = parseInt(document.getElementById('intensity').value);
      var performance = document.getElementById('performance').value;
      
      // Aquí puedes hacer lo que quieras con los datos, por ejemplo, enviarlos a un servidor
      console.log("Duración:", duration, "minutos");
      console.log("Intensidad:", intensity);
      console.log("Rendimiento:", performance);
      
      // También podrías mostrar un mensaje de confirmación al usuario
      alert("¡Progreso registrado con éxito!");
      
      // Crear un nuevo elemento para mostrar el progreso registrado
      const progress = document.createElement('span');
      progress.textContent = `Duración: ${duration} minutos | Intensidad: ${intensity} | Rendimiento: ${performance}`
      
      // Agregar el progreso a la lista en la interfaz
      const listaProgreso = document.getElementById("listaprogreso")
      listaProgreso.appendChild(progress)

      // Limpiar los campos del formulario después de enviar
      document.getElementById('duration').value = '';
      document.getElementById('intensity').value = '';
      document.getElementById('performance').value = '';
  });
});


// Selecciona todas las tarjetas y añade un evento de clic a cada una
document.querySelectorAll(".card").forEach((card) => {
  // Cuando se hace clic en una tarjeta, se busca el primer párrafo dentro de ella y se le agrega o remueve la clase "show"
  card.addEventListener("click", () => {
      card.getElementsByTagName("p")[0].classList.toggle("show");
  });
});

// Función para controlar el Entrenamiemnto
document.addEventListener("DOMContentLoaded", function() {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const intensityInput = document.getElementById("intensityRange"); 
  const weightInput = document.getElementById("weight");
  const repsInput = document.getElementById("reps");
  const setsInput = document.getElementById("sets");
  const logDiv = document.getElementById("log");

  let timer;

  startBtn.addEventListener("click", startSession);
  stopBtn.addEventListener("click", stopSession);

  function startSession() {
    timer = setInterval(logSession, 1000);
  }

  function stopSession() {
    clearInterval(timer);
  }

  function logSession() {
    const intensity = intensityInput.value;
    const weight = weightInput.value;
    const reps = repsInput.value;
    const sets = setsInput.value;

    const logEntry = `Intensidad: ${intensity}, Peso: ${weight} lbs, Repeticiones: ${reps}, Series: ${sets}`;
    logDiv.innerHTML += `<p>${logEntry}</p>`;
  }
});

  // Función para pausar videos y controlar la reproducción de videos
  document.addEventListener("DOMContentLoaded", function() {
    const videos = document.querySelectorAll(".video-player");
    
    // Pausar todos los videos excepto el que se está reproduciendo
    function pauseOtherVideos(currentVideo) {
      videos.forEach(video => {
        if (video !== currentVideo) {
          video.pause();
        }
      });
    }
  
    // Adelantar 10 segundos
    document.querySelectorAll('.forward').forEach(button => {
      button.addEventListener('click', function() {
        const video = this.parentElement.parentElement.querySelector(".video-player");
        video.currentTime += 10;
      });
    });
  
    // Retroceder 10 segundos
    document.querySelectorAll('.backward').forEach(button => {
      button.addEventListener('click', function() {
        const video = this.parentElement.parentElement.querySelector(".video-player");
        video.currentTime -= 10;
      });
    });
  
    // Botón Play
    document.querySelectorAll('.play').forEach(button => {
      button.addEventListener('click', function() {
        const video = this.parentElement.parentElement.querySelector(".video-player");
        video.play();
        pauseOtherVideos(video);
      });
    });
  
    // Botón Stop
    document.querySelectorAll('.stop').forEach(button => {
      button.addEventListener('click', function() {
        const video = this.parentElement.parentElement.querySelector(".video-player");
        video.pause();
        video.currentTime = 0;
      });
    });
  });
  

// Función para iniciar el ejercicio de entrenamiento con validación de formulario
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('startButton').addEventListener('click', function () {

      // Ejemplo de validación simple
      var formIsValid = validateForm();

      if (formIsValid) {
          // Ejecutar el ejercicio
          alert('¡Ejercicio iniciado correctamente!');
      } else {
          displayErrorMessage('Por favor, completa todos los campos correctamente');
      }
  });
});


// Función para sugerir correcciones de URL rotas
function suggestCorrection() {
  const errorMessage = document.getElementById("error-message");
  const brokenLink = document.getElementById("broken-link");
  
  if (!brokenLink.href || brokenLink.href === window.location.href) {
      errorMessage.textContent = "El enlace está perdido. Por favor, corrige el enlace para evitar errores.";
  } else {
      // Array de sugerencias de mejoras en ejercicios
      const suggestions = [
          "Recuerda mantener una postura adecuada durante el ejercicio para evitar lesiones.",
          "Asegúrate de calentar correctamente antes de comenzar cualquier ejercicio.",
          "Controla la respiración durante el ejercicio para maximizar los resultados.",
          "Incrementa gradualmente la intensidad del ejercicio para evitar lesiones por sobreentrenamiento.",
          "Utiliza el equipo de protección adecuado para cada tipo de ejercicio.",
          "Consulta a un profesional de la salud antes de comenzar un nuevo programa de entrenamiento."
      ];

      // Seleccionar una sugerencia aleatoria
      const randomIndex = Math.floor(Math.random() * suggestions.length);
      const suggestion = suggestions[randomIndex];

      // Mostrar la sugerencia en el mensaje de error
      errorMessage.textContent = suggestion;
  }
}

  