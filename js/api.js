// Fungsi dasar untuk memanggil API
async function callApi(action, data = {}) {
    const token = localStorage.getItem('token');
    const payload = { action, token, ...data };
    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (error) {
        console.error('API call error:', error);
        return { status: 'error', message: 'Gagal terhubung ke server' };
    }
}

// Data Usaha
async function getDataUsaha() {
    return callApi('getDataUsaha');
}

async function addDataUsaha(data) {
    return callApi('addDataUsaha', data);
}

async function updateDataUsaha(data) {
    return callApi('updateDataUsaha', data);
}

async function deleteDataUsaha(id) {
    return callApi('deleteDataUsaha', { id });
}

// Users (admin only)
async function getUsers() {
    return callApi('getUsers');
}

async function addUser(data) {
    return callApi('addUser', data);
}

async function updateUser(data) {
    return callApi('updateUser', data);
}

async function deleteUser(id) {
    return callApi('deleteUser', { id });
}

// Settings (admin only)
async function getSettings() {
    return callApi('getSettings');
}

async function updateSettings(settings) {
    return callApi('updateSettings', { settings });
}