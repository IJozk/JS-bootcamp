function toggleBlur() {
    const container = document.getElementById('anime-cards-container');
    if (!container) return console.error('No se encontró #anime-cards-container');
    // Si tiene inline style 'none' lo quitamos para volver al blur del CSS; si no, lo desactivamos
    const current = getComputedStyle(container).filter;
    container.style.filter = current === 'none' ? '' : 'none';
}