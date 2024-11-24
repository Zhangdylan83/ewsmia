document.addEventListener("DOMContentLoaded", function () {
    // Initialize Back-to-Top and Read More Buttons
    initializeBackToTop();
    initializeReadMore();

    // Initialize Carousel Logic with Animation
    initializeCarouselWithAnimation();
});

/**
 * Initializes the Back-to-Top Button
 */
function initializeBackToTop() {
    const backToTop = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/**
 * Initializes the Read More Button
 */
function initializeReadMore() {
    const readMoreBtn = document.getElementById("read-more-btn");
    const moreText = document.getElementById("more-text");
    if (readMoreBtn && moreText) {
        readMoreBtn.addEventListener("click", () => {
            moreText.style.display = moreText.style.display === "none" ? "inline" : "none";
            readMoreBtn.textContent = moreText.style.display === "none" ? "Read More" : "Read Less";
        });
    }
}

/**
 * Initializes Carousel Logic with Animation
 */
function initializeCarouselWithAnimation() {
    const images = document.querySelectorAll(".image-wrapper");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    let currentIndex = 0;

    /**
     * Displays the specified image and triggers animations
     * @param {number} index - The index of the image to show
     */
    function showImageWithTransition(index) {
        if (index === 1) {
            // Show the second image immediately
            images[1].style.display = "block";
            images[1].style.opacity = "1"; // Ensure opacity is fully visible
            images[0].style.display = "none"; // Hide the first image
            setTimeout(() => {
                animateToFinalImage(images[1], images[2]);
            }, 1000); // Wait 1 second before animating to the third image
        } else {
            // Regular image display without animation
            images.forEach((img, i) => {
                img.style.display = i === index ? "block" : "none";
            });
        }
    }

    /**
     * Animates the transition from the second to the third image
     * @param {HTMLElement} currentImage - The currently displayed image (second image)
     * @param {HTMLElement} nextImage - The next image to display (third image)
     */
    function animateToFinalImage(currentImage, nextImage) {
        currentImage.style.transition = "opacity 1s ease-out";
        currentImage.style.opacity = "0"; // Fade out the second image
        setTimeout(() => {
            currentImage.style.display = "none"; // Hide the second image after fade out

            // Reset the second image for future animations
            currentImage.style.opacity = "1";

            nextImage.style.display = "block"; // Show the third image
            nextImage.style.opacity = "0";
            nextImage.style.transition = "opacity 1s ease-in";
            setTimeout(() => {
                nextImage.style.opacity = "1"; // Fade in the third image
            }, 50); // Slight delay for the fade-in effect
        }, 1000); // Ensure the second image fully fades before switching
    }

    /**
     * Handles the next button click with dynamic index updates
     */
    function handleNextButton() {
        if (currentIndex === 1) {
            // Handle the transition from the second to the third image
            currentIndex = 2;
            animateToFinalImage(images[1], images[2]);
        } else {
            currentIndex = (currentIndex + 1) % images.length;
            images.forEach((img, i) => {
                img.style.display = i === currentIndex ? "block" : "none";
            });
        }
    }

    /**
     * Handles the previous button click
     */
    function handlePrevButton() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images.forEach((img, i) => {
            img.style.display = i === currentIndex ? "block" : "none";
        });
    }

    // Next Button Logic
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            handleNextButton();
        });
    }

    // Previous Button Logic
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            handlePrevButton();
        });
    }

    // Initialize the carousel to show the first image
    images[0].style.display = "block";
}
