class ImageSlider {

    constructor(selector) {

        this.slider = document.querySelector(selector);

        this.track = this.slider.querySelector(".slider-track");

        this.slides = Array.from(this.track.children);

        this.prevBtn = this.slider.querySelector(".prev");

        this.nextBtn = this.slider.querySelector(".next");

        this.dotsContainer = this.slider.querySelector(".slider-dots");

        this.dots = Array.from(this.dotsContainer.children);

        this.currentIndex = 0;

        this.autoPlayInterval = null;

        this.init();
    }


    init() {

        this.updateSlidePosition();

        this.bindEvents();

        this.startAutoPlay();

    }


    updateSlidePosition() {

        const slideWidth = this.slides[0].getBoundingClientRect().width;

        const offset = -this.currentIndex * slideWidth;

        this.track.style.transform = `translateX(${offset}px)`;

        this.updateDots();

    }


    nextSlide() {

        this.currentIndex =
            (this.currentIndex + 1) % this.slides.length;

        this.updateSlidePosition();

    }


    prevSlide() {

        if (this.currentIndex > 0) {

            this.currentIndex--;

        } else {

            this.currentIndex = this.slides.length - 1;

        }

        this.updateSlidePosition();

    }


    goToSlide(index) {

        this.currentIndex = index;

        this.updateSlidePosition();

    }


    updateDots() {

        this.dots.forEach((dot, index) => {

            if (index === this.currentIndex) {

                dot.classList.add("active");

            } else {

                dot.classList.remove("active");

            }

        });

    }


    bindEvents() {

        this.nextBtn.addEventListener("click", () => {

            this.nextSlide();

        });


        this.prevBtn.addEventListener("click", () => {

            this.prevSlide();

        });


        this.dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                this.goToSlide(index);

            });

        });


        this.slider.addEventListener("mouseenter", () => {

            this.stopAutoPlay();

        });


        this.slider.addEventListener("mouseleave", () => {

            this.startAutoPlay();

        });

    }


    startAutoPlay() {

        this.stopAutoPlay();

        this.autoPlayInterval = setInterval(() => {

            this.nextSlide();

        }, 4000);

    }


    stopAutoPlay() {

        clearInterval(this.autoPlayInterval);

    }

}


const imageSlider = new ImageSlider(".slider");