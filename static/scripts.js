document.addEventListener("DOMContentLoaded", function () {
    // Back-to-Top Button
    const backToTop = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Read More Button
    const readMoreBtn = document.getElementById("read-more-btn");
    const moreText = document.getElementById("more-text");
    readMoreBtn.addEventListener("click", () => {
        moreText.style.display = moreText.style.display === "none" ? "inline" : "none";
        readMoreBtn.textContent = moreText.style.display === "none" ? "Read More" : "Read Less";
    });

    // Image Carousel
    const images = document.querySelectorAll(".carousel-img");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    let currentIndex = 0;
    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });
    }
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });
    showImage(currentIndex);

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: "smooth" });
        });
    });
});
