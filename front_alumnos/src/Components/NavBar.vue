<template>
    <header class="app-header">
        <div class="header-content">
            <div class="logo-section">
                <div class="logo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                    </svg>
                </div>
                <div class="logo-text">
                    <h1>Control de Alumnos</h1>
                    <span>Instituto Tecnológico de Tlaxiaco</span>
                </div>
            </div>
            <button class="btn-logout" @click="handleLogout">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Cerrar sesión
            </button>
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
};
</script>

<style scoped>
.app-header {
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    padding: 16px 24px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 14px;
}

.logo-icon {
    width: 44px;
    height: 44px;
    background: #1e3a8a;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-icon svg {
    width: 24px;
    height: 24px;
    color: #ffffff;
}

.logo-text h1 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.logo-text span {
    font-size: 0.8rem;
    color: #64748b;
}

.btn-logout {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    color: #475569;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
}

.btn-logout svg {
    width: 18px;
    height: 18px;
}

.btn-logout:hover {
    background: #fee2e2;
    border-color: #fecaca;
    color: #dc2626;
}
</style>