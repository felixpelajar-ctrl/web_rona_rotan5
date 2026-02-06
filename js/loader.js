// js/loader.js

export function showSkeletons(containerId, count = 6) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Bersihkan kontainer
    
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = `
            <div class="skeleton-img"></div>
            <div class="skeleton-text title"></div>
            <div class="skeleton-text price"></div>
            <div class="skeleton-btn"></div>
        `;
        container.appendChild(skeleton);
    }
}