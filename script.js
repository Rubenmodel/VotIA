document.addEventListener('DOMContentLoaded', () => {
    // Slides de portada
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const portadaContainer = document.getElementById('portadaContainer');
    const appContainer = document.getElementById('appContainer');
    let current = 0;
    function updateButtons() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = (current === 0);
      if (current === slides.length - 1) {
        nextBtn.textContent = '¡Aceptar y comenzar!';
      } else {
        nextBtn.textContent = 'Siguiente ➡';
      }
      nextBtn.disabled = false;
    }
    window.showSlide = function(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
      });
      slides[index].classList.add('active');
      updateButtons();
    }
    window.nextSlide = function() {
      if (current < slides.length - 1) {
        current++;
        window.showSlide(current);
      } else {
        // Oculta portada, muestra app
        portadaContainer.style.display = 'none';
        appContainer.style.display = 'block';
        setTimeout(()=>{
          const ideaInput = document.getElementById('ideaInput');
          if(ideaInput) ideaInput.focus();
        }, 100);
      }
    }
    window.prevSlide = function() {
      if (current > 0) {
        current--;
        window.showSlide(current);
      }
    }
    window.showSlide(current);

    // App evaluadora
    const ideaInput = document.getElementById('ideaInput');
    const evaluateBtn = document.getElementById('evaluateBtn');
    const evaluationBlock = document.getElementById('evaluationBlock');

    function evaluarYMostrar() {
        const idea = ideaInput.value.trim();
        if (!idea) {
            alert('Por favor, escribe una idea para evaluar');
            return;
        }
        const result = evaluarIdea(idea);
        const block = document.getElementById('evaluationBlock');
        block.style.display = 'block';
        block.textContent = result;
    }

    if (evaluateBtn) evaluateBtn.addEventListener('click', evaluarYMostrar);
    if (ideaInput) ideaInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            evaluarYMostrar();
        }
    });

    function evaluarIdea(idea) {
        const palabrasCreatividad = ['innovador', 'único', 'creativo', 'original', 'novedoso'];
        const palabrasViabilidad = ['posible', 'factible', 'realista', 'práctico', 'económico'];
        const palabrasSocial = ['comunidad', 'beneficio', 'impacto', 'ayuda', 'solidario'];
        let c = 5, v = 5, s = 5;
        const texto = idea.toLowerCase();
        palabrasCreatividad.forEach(p => { if (texto.includes(p)) c += 2; });
        palabrasViabilidad.forEach(p => { if (texto.includes(p)) v += 2; });
        palabrasSocial.forEach(p => { if (texto.includes(p)) s += 2; });
        c = Math.min(10, c); v = Math.min(10, v); s = Math.min(10, s);
        const comentarioC = c >= 8 ? '¡Muy creativa! 🌟' : c >= 6 ? 'Buena creatividad 👍' : c >= 4 ? 'Aceptable, ¡anímate a ir más allá! 😊' : '¡Puedes ser más original! 💡';
        const comentarioV = v >= 8 ? '¡Muy viable! 🛠️' : v >= 6 ? 'Bastante viable 💪' : v >= 4 ? 'Puede mejorar en viabilidad 🔎' : 'Busca cómo hacerla más realista 🧐';
        const comentarioS = s >= 8 ? '¡Gran valor social! 🤝' : s >= 6 ? 'Buen aporte social 👏' : s >= 4 ? 'Aceptable, piensa en el impacto social 😊' : '¡Hazla más solidaria! ❤️';

        // CONSEJOS agrupados por tema
        const consejos = {
            tecnologia: [
                '¡Piensa en cómo la tecnología puede facilitar la vida de los usuarios! 💻',
                '¿Puedes añadir una función que sorprenda a los usuarios? 🤩',
                'Hazlo accesible para todas las edades y habilidades. 🧑‍💻',
                'Considera la seguridad y privacidad de los datos. 🔒',
                '¡Integra elementos interactivos para hacerlo más divertido! 🎮'
            ],
            arte: [
                'Añade un toque artístico para hacerlo más visual y atractivo. 🎨',
                '¿Puedes involucrar a más personas en la creación? 🤝',
                'Explora materiales o técnicas nuevas. 🖌️',
                '¡Hazlo participativo, que todos puedan aportar! 👐',
                'Piensa en una exposición o muestra final. 🖼️'
            ],
            salud: [
                'Incluye consejos para el bienestar físico y mental. 🧘‍♂️',
                '¿Puedes hacerlo más divertido con retos saludables? 🏅',
                '¡Promueve hábitos saludables en grupo! 👟',
                'Piensa en la motivación diaria. 🌞',
                'Hazlo fácil de seguir y mantener. 💪'
            ],
            comunidad: [
                'Invita a la comunidad a participar y aportar ideas. 🫂',
                '¿Puedes colaborar con otras iniciativas locales? 🏘️',
                'Hazlo inclusivo para todas las edades. 👨‍👩‍👧‍👦',
                'Piensa en cómo celebrar los logros juntos. 🎉',
                '¡Haz que todos se sientan parte del proyecto! 🤗'
            ],
            sostenibilidad: [
                'Utiliza materiales reciclados o reutilizables. ♻️',
                'Piensa en cómo reducir el impacto ambiental. 🌱',
                '¿Puedes involucrar a otros en el cuidado del planeta? 🌍',
                'Promueve el ahorro de recursos. 💧',
                'Hazlo duradero y fácil de mantener. 🛠️'
            ],
            juego: [
                'Agrega reglas sencillas y claras. 🎲',
                'Piensa en premios o recompensas divertidas. 🏆',
                'Hazlo cooperativo para fomentar el trabajo en equipo. 🤝',
                '¡Deja espacio para la improvisación! 🎭',
                'Asegúrate de que todos puedan participar. 👦👧'
            ],
            educacion: [
                'Relaciona la idea con aprendizajes prácticos. 📚',
                'Incluye actividades para reflexionar y debatir. 💬',
                'Hazlo divertido con retos o experimentos. 🧪',
                '¡Aprovecha recursos digitales para aprender más! 🌐',
                'Piensa en cómo motivar la curiosidad. 🤔'
            ],
            medioambiente: [
                'Incluye acciones para cuidar la naturaleza. 🌳',
                '¿Puedes organizar una actividad al aire libre? ⛺',
                'Promueve la conciencia ecológica. 🦋',
                'Hazlo visible para inspirar a otros. 👀',
                'Piensa en el impacto a largo plazo. 🕰️'
            ],
            general: [
                '¡Sigue adelante, tu idea tiene mucho potencial! 🚀',
                'Pregunta a otros qué mejorarían, ¡te sorprenderán! 🤗',
                'Piensa en cómo hacerlo aún más original. ✨',
                '¡No tengas miedo de probar cosas nuevas! 🧪',
                'Hazlo sencillo y fácil de compartir. 📢',
                'Asegúrate de que todos lo entiendan rápido. 🕑',
                'Busca inspiración en otras actividades. 🔎',
                '¡Atrévete a soñar en grande! 🌈',
                'Hazlo flexible para adaptarse a cambios. 🔄',
                'Recuerda celebrar cada logro, por pequeño que sea. 🎉'
            ]
        };

        // Detección de tema
        const temas = [
            {tema:'tecnologia', palabras:['app','aplicación','tecnología','robot','programa','digital','web','software','electrónico','videojuego','red social']},
            {tema:'arte', palabras:['arte','artístico','pintura','dibujo','música','teatro','danza','exposición','creación','manualidad']},
            {tema:'salud', palabras:['salud','bienestar','deporte','ejercicio','mental','físico','alimentación','yoga','correr','gimnasio']},
            {tema:'comunidad', palabras:['comunidad','vecinos','grupo','barrio','colaborativo','solidario','voluntariado','ayuda','colectivo']},
            {tema:'sostenibilidad', palabras:['sostenible','sostenibilidad','reciclaje','reciclar','ecológico','verde','ambiental','residuo','huella','planeta']},
            {tema:'juego', palabras:['juego','lúdico','diversión','dinámica','reto','concurso','competencia','partida','regla']},
            {tema:'educacion', palabras:['educativo','educación','aprender','enseñar','clase','taller','lección','didáctico','formativo']},
            {tema:'medioambiente', palabras:['medio ambiente','naturaleza','ecología','árbol','plantar','animales','contaminación','limpieza','parque']}
        ];

        let temaDetectado = 'general';
        for (const t of temas) {
            if (t.palabras.some(p => texto.includes(p))) {
                temaDetectado = t.tema;
                break;
            }
        }
        const consejosTema = consejos[temaDetectado] || consejos['general'];
        const consejo = consejosTema[Math.floor(Math.random() * consejosTema.length)];

        return `---\n**Evaluación de la idea: ${idea}**\n\n- 🧠 Creatividad: ${c}/10 ${comentarioC}\n- 🔧 Viabilidad: ${v}/10 ${comentarioV}\n- ❤️ Valor social: ${s}/10 ${comentarioS}\n\n👉 Consejo de mejora: ${consejo}`;
    }
});
