// ==========================================
// PASO A PASO PARA CONFIGURAR TU API KEY:
// 1. Localiza la línea de código de abajo que dice: const API_KEY = "TU_API_KEY_AQUI";
// 2. Borra el texto "TU_API_KEY_AQUI" manteniendo las comillas dobles.
// 3. Pega tu API Key real de Google AI Studio dentro de las comillas.
//    Ejemplo: const API_KEY = "AIzaSyD-TusNumerosYLetrasRealesAqui";
// ==========================================
const API_KEY = "AQ.Ab8RN6J7xt3c9noN-oz6HyzJL0h2sSrS7mXIGCYzAdV8Pwo2nA"; 
// ==========================================

const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const systemInstruction = "Eres el Guardián Geométrico, un personaje de videojuego sabio y motivador. Explica la importancia de la geometría en la vida real de forma divertida, enfocándote en misiones y retos educativos para estudiantes.";

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    if (API_KEY === "TU_API_KEY_AQUI") {
        appendMessage("Sistema: ¡Atención! Falta configurar la API Key en el archivo script.js", "bot-message");
        return;
    }

    appendMessage(text, "user-message");
    userInput.value = "";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const payload = {
        contents: [
            {
                role: "user",
                parts: [{ text: `${systemInstruction}\n\nPregunta del estudiante: ${text}` }]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            const botReply = data.candidates[0].content.parts[0].text;
            appendMessage(botReply, "bot-message");
        } else {
            appendMessage("Error: No se pudo conectar con el servidor del juego.", "bot-message");
        }
    } catch (error) {
        console.error(error);
        appendMessage("Error de red al consultar al guardián.", "bot-message");
    }
}

function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
