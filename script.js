document.addEventListener("DOMContentLoaded", () => {
    loadPage('home'); // Charger l'accueil par défaut
});

function loadPage(page) {
    const content = document.getElementById("content");

    // Avoid reloading the same content
    if (content.dataset.page === page) return;
    content.dataset.page = page;

    content.classList.remove("show"); // Hide content before update

    setTimeout(() => {
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
                const button = this.querySelector("button");
                button.disabled = true;
                document.getElementById("successMessage").classList.remove("hidden");
                setTimeout(() => {
                    document.getElementById("successMessage").classList.add("hidden");
                    button.disabled = false;
                }, 3000);
            });
        }

        content.classList.add("show"); // Smooth transition effect
    }, 50);
}

// Liens des audits
const auditLinks = {
    gemba: "https://forms.office.com/Pages/ResponsePage.aspx?id=Yy2gqiIfe0W77Avd4jtr3wM3f1Qll_xKkMAzfzJQ_BRUM1hRVVYyQ0hBOFpGQ1lGMlgzSkpNS1BETC4u",
    "5s": "https://forms.office.com/Pages/ResponsePage.aspx?id=Yy2gqiIfe0W77Avd4jtr3wM3f1Qll_xKkMAzfzJQ_BRUNzQ4MldBM0dTVzc0MFRHVlc0UlU2VE9QRi4u",
    logistique: "https://forms.office.com/Pages/ResponsePage.aspx?id=Yy2gqiIfe0W77Avd4jtr3wM3f1Qll_xKkMAzfzJQ_BRURjJOMUdPOVFXU1FUR0tCN09WQTdJWVdHRS4u",
    qualite: "https://forms.office.com/Pages/ResponsePage.aspx?id=Yy2gqiIfe0W77Avd4jtr3wM3f1Qll_xKkMAzfzJQ_BRUMDVBQkVHM002WUhaNUdINVpaTFpTTTVSRC4u",
    vestiaires: "https://forms.office.com/Pages/ResponsePage.aspx?id=Yy2gqiIfe0W77Avd4jtr3wM3f1Qll_xKkMAzfzJQ_BRUOEJYRjRJSlJRSUtDWEJTMkdKTEROUkxZRi4u",
    amelioration: "https://forms.office.com/Pages/ResponsePage.aspx?id=Yy2gqiIfe0W77Avd4jtr3wM3f1Qll_xKkMAzfzJQ_BRUNEEyWERCWlhKUEs4NzNSQ0k1NUwxRUhHMS4u"
};

// Afficher l'audit sélectionné
function showAudit(type) {
    const frame = document.getElementById('auditFrame');
    if (auditLinks[type]) {
        frame.src = auditLinks[type];
    } else {
        frame.src = "";
    }
}
