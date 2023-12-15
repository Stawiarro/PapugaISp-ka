document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.gallery-lightbox').forEach(item => {
        item.addEventListener('click', event => {
        event.preventDefault();
    
        // ger url img from href
        const imageUrl = item.getAttribute('href');
    
        // lightbox styles
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '1000';
    
        // Close button
        const closeButton = document.createElement('button');
        closeButton.innerText = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '20px';
        closeButton.style.fontSize = '30px';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.background = 'none';
        closeButton.style.cursor = 'pointer';
    
        // Open img in lightbox
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.maxWidth = '80%';
        img.style.maxHeight = '80%';
        img.style.margin = '20px';
        lightbox.appendChild(img);
        lightbox.appendChild(closeButton);
    
        // add lightbox
        document.body.appendChild(lightbox);
    
        // Close lightbox
        lightbox.addEventListener('click', e => {
            if (e.target !== img) {
            lightbox.parentNode.removeChild(lightbox);
            }
        });
        });
    });
});