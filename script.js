const modal = document.getElementById("codeModal");
const input = document.getElementById("accessCode");
const okBtn = document.getElementById("okBtn");
const cancelBtn = document.getElementById("cancelBtn");

const errorModal = document.getElementById("errorModal");
const errorButton = document.getElementById("errorButton");

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