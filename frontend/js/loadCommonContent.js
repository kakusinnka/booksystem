function loadHTML(elementId, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Load header and footer
document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', '../common/header.html');
    loadHTML('footer', '../common/footer.html');
});
