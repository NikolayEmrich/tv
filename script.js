const modal = document.getElementById("codeModal");
const input = document.getElementById("accessCode");
const okBtn = document.getElementById("okBtn");
const cancelBtn = document.getElementById("cancelBtn");

const errorModal = document.getElementById("errorModal");
const errorButton = document.getElementById("errorButton");

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        document.querySelectorAll(".card").forEach(card => {
            const watched = card.querySelector(".icon-green") !== null;

            if (
                filter === "all" ||
                (filter === "watched" && watched) ||
                (filter === "unwatched" && !watched)
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});

let currentCard = null;

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", function(e) {
        e.preventDefault();

        currentCard = this;
        input.value = "";
        modal.classList.add("active");

        setTimeout(() => input.focus(), 100);
    });
});

okBtn.addEventListener("click", () => {
    if (!currentCard) return;

    const code = input.value.trim();

    if (code === "") return;

    const url = currentCard.dataset.url.replace("{code}", code);

    fetch(url, { method: "HEAD" })
        .then(response => {
            if (response.ok) {
                window.location.href = url;
            } else {
                modal.classList.remove("active");
                errorModal.classList.add("active");
            }
        })
        .catch(() => {
            modal.classList.remove("active");
            errorModal.classList.add("active");
        });
});

cancelBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

errorButton.addEventListener("click", () => {
    errorModal.classList.remove("active");
    modal.classList.add("active");
    input.focus();
    input.select();
});

modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

errorModal.addEventListener("click", e => {
    if (e.target === errorModal) {
        errorModal.classList.remove("active");
    }
});

input.addEventListener("keydown", e => {
    if (e.key === "Enter") okBtn.click();
    if (e.key === "Escape") cancelBtn.click();
});

const viewBtn = document.getElementById("viewToggle");
const grid = document.querySelector(".grid");

grid.classList.add("list-view");

viewBtn.addEventListener("click", () => {
    grid.classList.toggle("grid-view");
    grid.classList.toggle("list-view");

    viewBtn.innerHTML = grid.classList.contains("grid-view")
    ? '<img src="icons/layout_grid_3.png" alt="Список">'
    : '<img src="icons/layout_grid_2.png" alt="Сетка">';

});