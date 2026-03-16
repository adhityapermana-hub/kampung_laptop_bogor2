// script.js

// 1. Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 3. Fitur WhatsApp Otomatis untuk tombol "Pesan Sekarang"
const waNumber = '6282128647683'; // Nomor tanpa + atau spasi

// Fungsi untuk membuat pesan WA
function openWhatsApp(laptopName) {
    const message = `Halo Kampung Laptop Bogor, saya tertarik dengan laptop: *${laptopName}*. Apakah masih tersedia?`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
}

// Ambil semua tombol order
document.querySelectorAll('.btn-order').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah aksi default jika tombol dalam form
        const laptopCard = button.closest('.laptop-card');
        // Ambil nama laptop dari atribut data-nama pada card atau button
        const laptopName = button.getAttribute('data-nama') || laptopCard.getAttribute('data-nama');
        
        if (laptopName) {
            openWhatsApp(laptopName);
        } else {
            // Fallback jika data-nama tidak ditemukan, ambil dari judul
            const titleElement = laptopCard.querySelector('h3');
            const fallbackName = titleElement ? titleElement.innerText : 'Laptop';
            openWhatsApp(fallbackName);
        }
    });
});

// 4. Animasi scroll reveal (fade-in-up)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // observer.unobserve(entry.target); // Jika hanya ingin sekali
        }
    });
}, observerOptions);

// Target semua elemen dengan class fade-in-up
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// 5. Smooth scroll untuk link internal (sudah di handle CSS scroll-behavior, tapi tambahan untuk konsistensi)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 6. (Opsional) Menambahkan data-nama pada tombol jika belum ada (sudah ada di HTML)
// Kode ini untuk memastikan semua tombol memiliki data-nama
document.querySelectorAll('.btn-order').forEach(button => {
    if (!button.hasAttribute('data-nama')) {
        const card = button.closest('.laptop-card');
        const title = card ? card.querySelector('h3')?.innerText : '';
        if (title) {
            button.setAttribute('data-nama', title);
        }
    }
});