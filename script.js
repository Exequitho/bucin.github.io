// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFallingHearts();
    initCountdown();
    initMusicPlayer();
    initSmoothScrolling();
    initAnimations();
});

// Falling Hearts Animation
function initFallingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['💖', '💕', '💗', '💓', '💝', '💘', '💙', '💚'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random starting position
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Random animation duration between 3-8 seconds
        const duration = Math.random() * 5 + 3;
        heart.style.animationDuration = duration + 's';
        
        // Random size
        const size = Math.random() * 15 + 15;
        heart.style.fontSize = size + 'px';
        
        // Random delay before starting
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, (duration + 2) * 1000);
    }
    
    // Create hearts at regular intervals
    setInterval(createHeart, 800);
    
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 200);
    }
}

// Countdown Timer
function initCountdown() {
    const targetDate = new Date('2025-09-04T00:00:00').getTime();
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Update display with zero padding
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // Add pulse animation on seconds change
            secondsElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                secondsElement.style.transform = 'scale(1)';
            }, 100);
        } else {
            // Birthday has arrived!
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // Show celebration message
            showBirthdayMessage();
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Show birthday celebration message
function showBirthdayMessage() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    heroTitle.textContent = '🎉 Happy Birthday, My Love! 🎉';
    heroSubtitle.textContent = 'Your special day is here!';
    
    // Add celebration class for extra animations
    heroTitle.classList.add('celebration');
    heroSubtitle.classList.add('celebration');
    
    // Create confetti effect
    createConfetti();
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#ff4757', '#ffb3d6', '#ff6b7d'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animation = 'fall 3s linear forwards';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
    
    // Remove confetti container after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 8000);
}

// Music Player
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-play');
            isPlaying = false;
        } else {
            // Try to play the music
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicIcon.classList.remove('fa-play');
                    musicIcon.classList.add('fa-pause');
                    isPlaying = true;
                }).catch(error => {
                    console.log('Music autoplay prevented:', error);
                    // Show a message to user that they need to interact first
                    showMusicMessage();
                });
            }
        }
    });
    
    // Handle music ending
    backgroundMusic.addEventListener('ended', function() {
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
        isPlaying = false;
    });
    
    // Handle music errors
    backgroundMusic.addEventListener('error', function(e) {
        console.log('Music loading error:', e);
        // Hide music player if audio fails to load
        document.querySelector('.music-player').style.display = 'none';
    });
}

// Show music interaction message
function showMusicMessage() {
    const message = document.createElement('div');
    message.textContent = 'Click to play romantic music 🎵';
    message.style.position = 'fixed';
    message.style.bottom = '80px';
    message.style.right = '20px';
    message.style.background = 'rgba(255, 107, 157, 0.9)';
    message.style.color = 'white';
    message.style.padding = '10px 15px';
    message.style.borderRadius = '20px';
    message.style.fontSize = '0.9rem';
    message.style.zIndex = '1001';
    message.style.animation = 'fadeIn 0.5s ease-out';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            message.remove();
        }, 500);
    }, 3000);
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize scroll animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    
    // Gallery item hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Countdown number animation
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    countdownNumbers.forEach(number => {
        number.style.transition = 'transform 0.1s ease-out';
    });
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    // Create trailing heart effect on mouse move (throttled)
    if (Math.random() < 0.02) { // Only create occasionally
        createTrailingHeart(e.clientX, e.clientY);
    }
});

// Create trailing heart effect
function createTrailingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '12px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    heart.style.animation = 'fadeOut 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Add fadeOut animation for trailing hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }
    
    .celebration {
        animation: celebrate 2s ease-in-out infinite;
    }
    
    @keyframes celebrate {
        0%, 100% {
            transform: scale(1) rotate(0deg);
        }
        25% {
            transform: scale(1.05) rotate(1deg);
        }
        75% {
            transform: scale(1.05) rotate(-1deg);
        }
    }
`;
document.head.appendChild(style);

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust falling hearts on resize
    const hearts = document.querySelectorAll('.falling-heart');
    hearts.forEach(heart => {
        if (parseInt(heart.style.left) > window.innerWidth) {
            heart.style.left = (Math.random() * window.innerWidth) + 'px';
        }
    });
});

// Add loading states for images
function initImageLoading() {
    const images = document.querySelectorAll('.gallery-image');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // If image fails to load, show a placeholder
            this.style.opacity = '0.5';
            this.alt = 'Photo loading...';
        });
    });
}

// Initialize image loading
initImageLoading();

// Console message for developers
console.log(`
💖 Welcome to our Love Website! 💖
Made with love for a special birthday.
Every line of code written with care and affection.
`);