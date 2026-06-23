document.addEventListener('DOMContentLoaded', function() {
    // Create Frozen Snowflakes
    function createSnowflakes() {
        const snowflakes = ['❄️', '❅', '❆', '✨', '💎'];
        for (let i = 0; i < 15; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.animationDuration = (Math.random() * 10 + 5) + 's';
            snowflake.style.animationDelay = Math.random() * 5 + 's';
            snowflake.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            snowflake.style.opacity = (Math.random() * 0.3 + 0.1);
            document.body.appendChild(snowflake);
        }
    }
    createSnowflakes();

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scanner button functionality
    const scanBtn = document.getElementById('scanBtn');
    const scanOverlay = document.getElementById('scanOverlay');
    const scannerLine = document.querySelector('.scanner-line');
    
    if (scanBtn && scanOverlay) {
        scanBtn.addEventListener('click', function() {
            this.classList.add('scanning');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
            scanOverlay.classList.add('active');
            scannerLine.style.animationDuration = '0.8s';
            
            setTimeout(() => {
                this.classList.remove('scanning');
                this.innerHTML = '<i class="fas fa-check"></i> Scan Complete!';
                scanOverlay.classList.remove('active');
                
                scanOverlay.style.opacity = '1';
                scanOverlay.style.background = 'rgba(236, 72, 153, 0.4)';
                
                setTimeout(() => {
                    scanOverlay.style.opacity = '';
                    scanOverlay.style.background = '';
                }, 200);
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-qrcode"></i> Scan Profile';
                    scannerLine.style.animationDuration = '';
                }, 1500);
            }, 2000);
        });
    }
    
    // Hover effects for all cards
    const cards = document.querySelectorAll('.info-card, .tool-item, .contact-btn, .project-card-small, .certificate-card');
    cards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Button hover effects
    document.querySelectorAll('.contact-btn, .view-repo-btn, .scan-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Ripple effect
    document.querySelectorAll('.contact-btn, .scan-btn, .view-repo-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(20); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for scroll reveal
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to observe
    const revealElements = document.querySelectorAll(
        '.info-card, .tool-item, .project-card-small, .certificate-card, .section-subtitle'
    );
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Console welcome
    console.log('%c✨ Khadija Mujeeb Portfolio ✨', 'font-size: 20px; font-weight: bold; color: #ec4899;');
    console.log('%cBuilt with ❤️ and lots of pink-purple magic!', 'font-size: 12px; color: #a855f7;');
});