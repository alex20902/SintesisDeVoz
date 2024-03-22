const synth = window.speechSynthesis;
let recognition;

function iniciarAsistente() {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';

    recognition.onstart = () => {
        console.log('Asistente de voz activado. Habla...');
        document.getElementById('output').textContent = 'Escuchando...';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Usuario dijo:', transcript);

        if (transcript.includes('hola')) {
            decir('Hola Alex, ¿en qué puedo ayudarte?');
        } else if (transcript.includes('cómo estás')) {
            decir('Estoy bien, ¡gracias por preguntar!');
        } else if (transcript.includes('en donde estoy')) {
            decir('Estás en un lugar maravilloso.');
        } else if (transcript.includes('cómo está el día hoy') || transcript.includes('cómo está el día')) {
            decir('El día está radiante.');
        } else if (transcript.includes('cómo me ves')) {
            decir('Te veo bien.');
        } else if (transcript.includes('adiós') || transcript.includes('nos vemos') || transcript.includes('hasta luego')) {
            decir('¡Hasta luego! Cuídate.');
        } else {
            decir("Lo siento, esa palabra no esta en mi programacion.");
        }
    };

    recognition.onerror = (event) => {
        console.error('Error al reconocer voz:', event.error);
    };
}

function comenzarEscucha() {
    iniciarAsistente();
    recognition.start();
}

// Función para que el asistente diga algo
function decir(mensaje) {
    const utterance = new SpeechSynthesisUtterance(mensaje);
    synth.speak(utterance);
    document.getElementById('output').textContent = mensaje;
}
