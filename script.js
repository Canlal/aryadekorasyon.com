// Lightbox fonksiyonları
function openLightbox(imgSrc) {
    document.getElementById('lightbox-img').src = imgSrc;
    document.getElementById('lightbox').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ESC tuşuyla kapatma
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Görsel yükleme kontrolleri
document.addEventListener('DOMContentLoaded', function() {
    // Proje-1.jpg kontrolü
    const projeImg = new Image();
    projeImg.src = 'images/proje-1.jpg';
    projeImg.onerror = function() {
        document.querySelector('.project-card img').src = 'images/default-project.jpg';
    };

    // Harita.jpg kontrolü
    const haritaImg = new Image();
    haritaImg.src = 'images/harita.jpg';
    haritaImg.onerror = function() {
        console.log('Harita görseli yüklenemedi');
    };
});

// Mobil menü toggle
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('.nav');

mobileMenu.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});
