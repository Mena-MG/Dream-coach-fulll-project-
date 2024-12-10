document.addEventListener('DOMContentLoaded', function() {
    // Slider class to handle multiple sliders
    class Slider {
        constructor(container, options = {}) {
            this.container = container;
            this.cards = container.querySelector('.coach-cards, .testimonial-cards');
            this.prevBtn = container.querySelector('.prev');
            this.nextBtn = container.querySelector('.next');
            this.dots = [...container.nextElementSibling.querySelectorAll('.dot')];
            
            this.currentIndex = 0;
            this.visibleCards = options.visibleCards || 3;
            this.totalCards = this.cards.children.length;
            this.autoplayInterval = options.autoplayInterval || 5000;
            this.isAnimating = false;
            
            this.initializeSlider();
            this.updateSliderView();
            this.animateInitialCards();
        }

        animateInitialCards() {
            Array.from(this.cards.children).forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 200); // Stagger the animation
            });
        }

        initializeSlider() {
            // Add button listeners with animation handling
            this.prevBtn.addEventListener('click', () => {
                if (this.isAnimating) return;
                this.isAnimating = true;
                
                if (this.currentIndex === 0) {
                    this.animateTransition('prev', () => {
                        this.cards.style.transition = 'none';
                        this.slideTo(this.totalSlides - 1);
                        setTimeout(() => {
                            this.cards.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                            this.isAnimating = false;
                        }, 50);
                    });
                } else {
                    this.animateTransition('prev', () => {
                        this.slideTo(this.currentIndex - 1);
                        this.isAnimating = false;
                    });
                }
            });

            this.nextBtn.addEventListener('click', () => {
                if (this.isAnimating) return;
                this.isAnimating = true;
                
                if (this.currentIndex === this.totalSlides - 1) {
                    this.animateTransition('next', () => {
                        this.cards.style.transition = 'none';
                        this.slideTo(0);
                        setTimeout(() => {
                            this.cards.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                            this.isAnimating = false;
                        }, 50);
                    });
                } else {
                    this.animateTransition('next', () => {
                        this.slideTo(this.currentIndex + 1);
                        this.isAnimating = false;
                    });
                }
            });
            
            // Add dot listeners
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    if (this.isAnimating) return;
                    this.isAnimating = true;
                    
                    const direction = index > this.currentIndex ? 'next' : 'prev';
                    this.animateTransition(direction, () => {
                        this.slideTo(index);
                        this.isAnimating = false;
                    });
                });
            });

            // Start autoplay
            this.startAutoplay();

            // Pause autoplay on hover
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());

            // Update on window resize
            window.addEventListener('resize', () => this.updateSliderView());
        }

        animateTransition(direction, callback) {
            const cards = Array.from(this.cards.children);
            const duration = 400;
            
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = direction === 'next' 
                        ? 'scale(0.95) translateX(-30px)' 
                        : 'scale(0.95) translateX(30px)';
                    card.style.opacity = '0.5';
                }, index * 50);
            });

            setTimeout(() => {
                callback();
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.transform = 'scale(1) translateX(0)';
                        card.style.opacity = '1';
                    }, index * 50);
                });
            }, duration);
        }

        updateSliderView() {
            const containerWidth = this.container.offsetWidth - 120;
            const cardWidth = (containerWidth / this.visibleCards) - 32;
            
            Array.from(this.cards.children).forEach(card => {
                card.style.flex = `0 0 ${cardWidth}px`;
            });
            
            this.totalSlides = Math.ceil((this.totalCards - this.visibleCards) / 1) + 1;
            this.updateDots();
            this.slideTo(this.currentIndex);
        }

        slideTo(index) {
            if (index < 0) {
                index = this.totalSlides - 1;
            } else if (index >= this.totalSlides) {
                index = 0;
            }
            
            this.currentIndex = index;
            const cardWidth = this.cards.children[0].offsetWidth + 32;
            const slideAmount = cardWidth * this.currentIndex;
            this.cards.style.transform = `translateX(-${slideAmount}px)`;
            this.updateDots();
        }

        updateDots() {
            this.dots.forEach((dot, index) => {
                if (index < this.totalSlides) {
                    dot.style.display = 'inline-block';
                    dot.classList.toggle('active', index === this.currentIndex);
                } else {
                    dot.style.display = 'none';
                }
            });
        }

        startAutoplay() {
            this.stopAutoplay();
            this.autoplayTimer = setInterval(() => {
                if (this.currentIndex === this.totalSlides - 1) {
                    this.animateTransition('next', () => {
                        this.cards.style.transition = 'none';
                        this.slideTo(0);
                        setTimeout(() => {
                            this.cards.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        }, 50);
                    });
                } else {
                    this.animateTransition('next', () => {
                        this.slideTo(this.currentIndex + 1);
                    });
                }
            }, this.autoplayInterval);
        }

        stopAutoplay() {
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
            }
        }
    }

    class TestimonialsSlider {
        constructor() {
            this.slider = document.querySelector('.testimonials-slider');
            this.cards = document.querySelector('.testimonial-cards');
            this.testimonials = [...document.querySelectorAll('.testimonial')];
            this.prevBtn = this.slider.querySelector('.prev');
            this.nextBtn = this.slider.querySelector('.next');
            this.dots = [...document.querySelectorAll('.testimonials .slider-dots .dot')];
            
            this.currentIndex = 0;
            this.testimonialWidth = 0;
            this.autoplayInterval = null;
            this.isAnimating = false;

            this.init();
        }

        init() {
            // Set initial state
            this.updateTestimonialWidth();
            this.setInitialActive();
            this.bindEvents();
            this.startAutoplay();

            // Add initial animations
            this.testimonials.forEach((testimonial, index) => {
                testimonial.style.opacity = '0';
                testimonial.style.transform = 'translateX(50px)';
                setTimeout(() => {
                    testimonial.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    testimonial.style.opacity = index === this.currentIndex ? '1' : '0.7';
                    testimonial.style.transform = 'translateX(0)';
                }, index * 200);
            });
        }

        updateTestimonialWidth() {
            this.testimonialWidth = this.testimonials[0].offsetWidth + 32; // Including gap
        }

        setInitialActive() {
            this.testimonials[this.currentIndex].classList.add('active');
            this.dots[this.currentIndex].classList.add('active');
        }

        bindEvents() {
            window.addEventListener('resize', () => this.updateTestimonialWidth());
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            // Add touch support
            let touchStartX = 0;
            let touchEndX = 0;

            this.slider.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });

            this.slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) { // Minimum swipe distance
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            }, { passive: true });
        }

        startAutoplay() {
            this.autoplayInterval = setInterval(() => this.next(), 5000);
        }

        stopAutoplay() {
            clearInterval(this.autoplayInterval);
        }

        updateSliderPosition() {
            if (this.isAnimating) return;
            this.isAnimating = true;

            // Update active classes
            this.testimonials.forEach(t => t.classList.remove('active'));
            this.dots.forEach(d => d.classList.remove('active'));
            
            this.testimonials[this.currentIndex].classList.add('active');
            this.dots[this.currentIndex].classList.add('active');

            // Animate the slider
            const translateX = -this.currentIndex * this.testimonialWidth;
            this.cards.style.transform = `translateX(${translateX}px)`;

            // Add staggered animations to testimonials
            this.testimonials.forEach((testimonial, index) => {
                const distance = Math.abs(index - this.currentIndex);
                testimonial.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${distance * 0.1}s`;
                testimonial.style.opacity = index === this.currentIndex ? '1' : '0.7';
                testimonial.style.filter = index === this.currentIndex ? 'blur(0)' : 'blur(2px)';
                testimonial.style.transform = index === this.currentIndex ? 'scale(1.05)' : 'scale(1)';
            });

            // Reset animation flag
            setTimeout(() => {
                this.isAnimating = false;
            }, 800);
        }

        prev() {
            if (this.isAnimating) return;
            this.stopAutoplay();
            this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
            this.updateSliderPosition();
            this.startAutoplay();
        }

        next() {
            if (this.isAnimating) return;
            this.stopAutoplay();
            this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
            this.updateSliderPosition();
            this.startAutoplay();
        }

        goToSlide(index) {
            if (this.isAnimating || index === this.currentIndex) return;
            this.stopAutoplay();
            this.currentIndex = index;
            this.updateSliderPosition();
            this.startAutoplay();
        }
    }

    // Initialize Coaches Slider
    const coachesSlider = new Slider(document.querySelector('.coaches-slider'), {
        autoplayInterval: 5000,
        visibleCards: window.innerWidth < 768 ? 1 : 3
    });

    // Initialize Testimonials Slider
    const testimonialsSlider = new TestimonialsSlider();

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
});
