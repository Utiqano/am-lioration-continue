document.addEventListener("DOMContentLoaded", () => {
    loadPage('home'); // Charger l'accueil par défaut
});

function loadPage(page) {
    const content = document.getElementById("content");

    if (content.dataset.page === page) return;
    content.dataset.page = page;

    content.classList.remove("show");

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
                    <button onclick="openAudit('gemba')">Audit Gemba OJT</button>
                    <button onclick="openAudit('5s')">Audit 5S</button>
                    <button onclick="openAudit('logistique')">Audit Logistique</button>
                    <button onclick="openAudit('qualite')">Audit Mur Qualité</button>
                    <button onclick="openAudit('vestiaires')">Audit Vestiaires & Espaces Communs</button>
                    <button onclick="openAudit('amelioration')">Proposition d'Amélioration</button>
                </div>
            `;
        } 
        else if (page === "contact") {
            content.innerHTML = `
                <h1>Contactez-nous</h1>
                <p>Envoyez-nous un message !</p>
            `;
        }

        content.classList.add("show");
    }, 50);
}

// 🌍 Liens des audits
const auditLinks = {
    gemba: "https://forms.office.com/e/1nWmJsVRNb",
    "5s": "https://forms.office.com/e/YNkFgkXXhn",
    logistique: "https://forms.office.com/e/Ps1y5HpJ8u",
    qualite: "https://forms.office.com/e/0nhbJYckHs",
    vestiaires: "https://forms.office.com/e/vL5vjZyE7u",
    amelioration: "https://forms.office.com/e/TpWLh24LzL"
};

// 🆕 Ouvrir audit dans un nouvel onglet
function openAudit(type) {
    if (auditLinks[type]) {
        window.open(auditLinks[type], '_blank');
    } else {
        alert("Lien indisponible.");
    }
}
