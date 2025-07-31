document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                nav.style.display = 'none';
            }
        });
    });
    
    // Simple Testimonial Slider
    const testimonials = [
        {
            quote: "Evimizin tüm tadilatını titizlikle yaptılar, kesinlikle tavsiye ederim.",
            name: "Ahmet Yılmaz",
            location: "Beşiktaş / İstanbul"
        },
        {
            quote: "Dekorasyon çalışmaları için çok memnun kaldık. Çok profesyoneller.",
            name: "Ayşe Kaya",
            location: "Kadıköy / İstanbul"
        },
        {
            quote: "İnşaat işlerini zamanında ve eksiksiz tamamladılar. Teşekkürler.",
            name: "Mehmet Demir",
            location: "Üsküdar / İstanbul"
        }
    ];
    
    let currentTestimonial = 0;
    const testimonialElement = document.querySelector('.testimonial-content');
    
    function showTestimonial(index) {
        const testimonial = testimonials[index];
        testimonialElement.innerHTML = `
            <p>"${testimonial.quote}"</p>
            <div class="client-info">
                <h4>${testimonial.name}</h4>
                <span>${testimonial.location}</span>
            </div>
        `;
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Form submission handling for contact page
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            alert('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
            this.reset();
        });
    }
});
