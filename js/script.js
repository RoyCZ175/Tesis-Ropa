// Configuración
const API_URL = 'http://localhost:3000/api';

// Obtener usuario logueado
function getUsuarioId() {
    return localStorage.getItem('usuarioId');
}

function getUsuarioNombre() {
    return localStorage.getItem('usuarioNombre');
}

// Verificar si está logueado
function verificarLogin() {
    if (!getUsuarioId()) {
        window.location.href = 'login.html';
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioNombre');
    window.location.href = 'login.html';
}

// Mostrar mensaje
function mostrarMensaje(elementId, mensaje, tipo) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="alert alert-${tipo}">${mensaje}</div>`;
        setTimeout(() => {
            element.innerHTML = '';
        }, 3000);
    }
}

// Petición fetch genérica
async function apiRequest(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_URL}${url}`, options);
        const result = await response.json();
        return { ok: response.ok, data: result };
    } catch (error) {
        return { ok: false, data: { error: error.message } };
    }
}