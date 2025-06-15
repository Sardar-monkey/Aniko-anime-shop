import "../CSS/style.css";

document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        if (!item.classList.contains("dropdown-toggle")) {
            item.classList.add("active"); 
        }
    });
    
    let currentImageIndex = 0;
    const images = document.querySelector('.gallery-images');
    const totalImages = images.children.length;

    function updateGallery() {
        const imageWidth = images.children[0].offsetWidth; // Get one image's width
        const offset = -currentImageIndex * imageWidth;
        images.style.transform = `translateX(${offset}px)`;
    }
    

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        console.log("Next Image Index:", currentImageIndex);
        updateGallery();
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        console.log("Previous Image Index:", currentImageIndex);
        updateGallery();
    }

    const nextButton = document.querySelector('.gallery-arrow.right');
    const prevButton = document.querySelector('.gallery-arrow.left');

    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);

    document.addEventListener("DOMContentLoaded", function () {
        const container = document.querySelector(".similar-products");
        const scrollLeft = document.querySelector(".scroll-left");
        const scrollRight = document.querySelector(".scroll-right");
    
        let scrollAmount = 300; // Adjust for how much to scroll per click
    
        scrollRight.addEventListener("click", function () {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    
        scrollLeft.addEventListener("click", function () {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
    });
    
    
});


window.Search = function() {
    const menu = document.getElementById("search-bar");
    menu.classList.toggle("slide");
};

