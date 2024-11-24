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
 * Initializes Carousel Logic with Captions and Zoom-In Animation
 */
function initializeCarouselWithAnimation() {
    const images = document.querySelectorAll(".image-wrapper");
    const captions = [
        "Example original WSI and INSIGHT-generated heatmap", // Original WSI
        "Hit next button to see the high resolution zoom-in heatmap", // Yellow Box
        "Yellow box zoomed-in heatmap", // Zoomed-In Image
        "Other zoom-in fine-grained heatmap" // Final Fine-Grained Image
    ];
    const captionElement = document.getElementById("carousel-caption");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    let currentIndex = 0;

    /**
     * Updates the image and caption based on the current index
     */
    function updateCarousel(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
            img.style.opacity = i === index ? "1" : "0"; // Reset opacity
        });
        captionElement.textContent = captions[index];
    }

    /**
     * Animates the zoom-in effect from the second to the third image
     */
    function animateZoomIn() {
        const currentImage = images[1]; // Yellow Box
        const nextImage = images[2]; // Zoomed-In Heatmap

        // Update caption immediately to reflect the zoomed-in image
        captionElement.textContent = captions[2];

        currentImage.style.transition = "opacity 1s ease-out";
        currentImage.style.opacity = "0"; // Fade out Yellow Box
        setTimeout(() => {
            currentImage.style.display = "none"; // Hide Yellow Box
            currentImage.style.opacity = "1"; // Reset for future animations

            nextImage.style.display = "block"; // Show Zoomed-In Heatmap
            nextImage.style.opacity = "0";
            nextImage.style.transition = "opacity 1s ease-in";
            setTimeout(() => {
                nextImage.style.opacity = "1"; // Fade in Zoomed-In Heatmap
            }, 50); // Slight delay for smooth effect
        }, 1000); // Allow Yellow Box to fully fade out
    }

    /**
     * Handles the next button click
     */
    function handleNextButton() {
        if (currentIndex === 1) {
            // Trigger zoom-in animation when transitioning from Yellow Box to Zoomed-In
            currentIndex = 2;
            animateZoomIn();
        } else {
            // Increment the index and wrap around if at the last image
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel(currentIndex);
        }
    }

    /**
     * Handles the previous button click
     */
    function handlePrevButton() {
        // Decrement the index and wrap around if at the first image
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel(currentIndex);
    }

    // Attach event listeners to buttons
    if (nextBtn) {
        nextBtn.addEventListener("click", handleNextButton);
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", handlePrevButton);
    }

    // Initialize the carousel to show the first image and caption
    updateCarousel(currentIndex);
}


