// auth.js - Versi Final (tanpa deklarasi ulang APPS_SCRIPT_URL)

// Fungsi login
async function login(email, password) {
    try {
        const response = await fetch(APPS_SCRIPT_URL, { // APPS_SCRIPT_URL dari config.js
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'login', email, password })
        });
        
        const result = await response.json();
        if (result.status === 'success') {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data));
            
            if (result.data.role === 'admin') {
                window.location.href = 'admin/dashboard.html';
            } else {
                window.location.href = 'member/profil.html';
            }
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

// Fungsi logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    const currentPath = window.location.pathname;
    if (currentPath.includes('/admin/') || currentPath.includes('/member/')) {
        window.location.href = '../login.html';
    } else {
        window.location.href = 'login.html';
    }
}

// Cek autentikasi
function cekAuth(roleRequired = null) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/admin/') || currentPath.includes('/member/')) {
            window.location.href = '../login.html';
        } else {
            window.location.href = 'login.html';
        }
        return false;
    }
    
    if (roleRequired && user.role !== roleRequired) {
        alert('Akses ditolak');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Dapatkan user info
function getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
}