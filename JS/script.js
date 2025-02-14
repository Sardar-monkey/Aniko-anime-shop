document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname; 
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        if (!item.classList.contains("dropdown-toggle") && item.href.includes(currentPath)) {
            item.classList.add("active"); 
        }
    });
});
