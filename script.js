document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();

        let template = this.dataset.url;

        let code = prompt("Access Code:");

        if (code !== null && code.trim() !== "") {
            let url = template.replace("{code}", code.trim());
            window.location.href = url;
        }
    });
});