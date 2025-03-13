document.addEventListener("DOMContentLoaded", () => {
    loadPage('home'); // Charger l'accueil par défaut
});

function loadPage(page) {
    const content = document.getElementById("content");

    if (page === "home") {
        content.innerHTML = `
            <h1>Bienvenue sur WKW Audits</h1>
            <p>Choisissez une section dans la barre de navigation.</p>
        `;
    } 
    else if (page === "audits") {
        content.innerHTML = `
            <h1>Checklist des Audits WKW</h1>
            <div class="audit-list">
                <button onclick="showAudit('gemba')">Audit Gemba OJT</button>
                <button onclick="showAudit('5s')">Audit 5S</button>
                <button onclick="showAudit('logistique')">Audit Logistique</button>
                <button onclick="showAudit('qualite')">Audit Mur Qualité</button>
                <button onclick="showAudit('vestiaires')">Audit Vestiaires & Espaces Communs</button>
                <button onclick="showAudit('amelioration')">Proposition d'Amélioration</button>
            </div>
            <iframe id="auditFrame"></iframe>
        `;
    } 
    else if (page === "contact") {
        content.innerHTML = `
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

        document.getElementById("contactForm").addEventListener("submit", function(event) {
            event.preventDefault();
            document.getElementById("successMessage").classList.remove("hidden");
            setTimeout(() => {
                document.getElementById("successMessage").classList.add("hidden");
            }, 3000);
        });
    }
}

// Liens des audits
const auditLinks = {
    gemba: "https://forms.office.com/e/1nWmJsVRNb",
    "5s": "https://forms.office.com/e/YNkFgkXXhn",
    logistique: "https://forms.office.com/e/Ps1y5HpJ8u",
    qualite: "https://forms.office.com/e/0nhbJYckHs",
    vestiaires: "https://forms.office.com/e/vL5vjZyE7u",
    amelioration: "https://forms.office.com/e/TpWLh24LzL"
};

// Afficher l'audit sélectionné
function showAudit(type) {
    const frame = document.getElementById('auditFrame');
    frame.src = auditLinks[type] || "";
}
