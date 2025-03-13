document.addEventListener("DOMContentLoaded", () => {
    loadPage('home'); // Charger l'accueil par défaut
});

function loadPage(page) {
    const content = document.getElementById("content");

    // Éviter le rechargement du même contenu
    if (content.dataset.page === page) return;
    content.dataset.page = page;

    content.classList.remove("show"); // Animation de transition

    setTimeout(() => {
        let html = "";

        switch (page) {
            case "home":
                html = `
                    <h1>Bienvenue sur WKW Audits</h1>
                    <p>Choisissez une section dans la barre de navigation.</p>
                `;
                break;

            case "audits":
                html = `
                    <h1>Checklist des Audits WKW</h1>
                    <div class="audit-list">
                        ${Object.keys(auditLinks).map(type => 
                            `<button onclick="showAudit('${type}')">${formatAuditName(type)}</button>`
                        ).join("")}
                    </div>
                    <iframe id="auditFrame" src="" onload="showLoading(false)"></iframe>
                    <p id="loadingText">Sélectionnez un audit à afficher</p>
                `;
                break;

            case "contact":
                html = `
                    <h1>Contactez-nous</h1>
                    <section class="contact-section">
                        <form id="contactForm">
                            <input type="text" id="name" placeholder="Votre Nom" required>
                            <input type="email" id="email" placeholder="Votre Email" required>
                            <textarea id="message" placeholder="Votre Message" required></textarea>
                            <button type="submit">Envoyer</button>
                        </form>
                        <p id="successMessage" class="hidden">Message envoyé avec succès !</p>
                    </section>
                `;
                break;
        }

        content.innerHTML = html;
        content.classList.add("show"); // Réapparition avec effet

        if (page === "contact") initContactForm();
    }, 50);
}

// Formatage des noms d'audits pour affichage
function formatAuditName(type) {
    return type.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// Liens des audits
const auditLinks = {
    gemba: "https://forms.office.com/Pages/ResponsePage.aspx?id=...",
    "5s": "https://forms.office.com/Pages/ResponsePage.aspx?id=...",
    logistique: "https://forms.office.com/Pages/ResponsePage.aspx?id=...",
    qualite: "https://forms.office.com/Pages/ResponsePage.aspx?id=...",
    vestiaires: "https://forms.office.com/Pages/ResponsePage.aspx?id=...",
    amelioration: "https://forms.office.com/Pages/ResponsePage.aspx?id=..."
};

// Afficher l'audit sélectionné
function showAudit(type) {
    const frame = document.getElementById('auditFrame');
    const loadingText = document.getElementById('loadingText');
    
    if (auditLinks[type] && frame) {
        frame.src = auditLinks[type];
        loadingText.textContent = "Chargement de l'audit...";
        showLoading(true);
    }
}

// Gestion du texte de chargement
function showLoading(state) {
    const loadingText = document.getElementById('loadingText');
    if (loadingText) {
        loadingText.style.display = state ? "block" : "none";
    }
}

// Initialisation du formulaire de contact
function initContactForm() {
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const successMessage = document.getElementById("successMessage");
        const button = this.querySelector("button");

        // Validation basique de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Veuillez entrer une adresse email valide.");
            return;
        }

        button.disabled = true;
        successMessage.classList.remove("hidden");

        setTimeout(() => {
            successMessage.classList.add("hidden");
            button.disabled = false;
            this.reset(); // Réinitialisation du formulaire
        }, 3000);
    });
}
