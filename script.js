document.addEventListener("DOMContentLoaded", () => {
    loadPage("home"); // Charger la page d'accueil par défaut
});

// 📌 Fonction pour charger une page
function loadPage(page) {
    const content = document.getElementById("content");

    // Vérifier si la page demandée est déjà affichée
    if (content.dataset.page === page) return;
    content.dataset.page = page;

    // Appliquer une transition (fade-out)
    content.classList.remove("show");

    // Charger le contenu après un court délai
    setTimeout(() => {
        content.innerHTML = getPageContent(page);

        // Ajouter un bouton "Retour" sauf sur la page d'accueil
        if (page !== "home") {
            content.innerHTML += `
                <button class="back-button" onclick="loadPage('home')">⬅ Retour</button>
            `;
        }

        // Ajouter la mention "Créé par Trabelsi Houssine" en bas
        content.innerHTML += `
            <footer class="footer">Créé par Trabelsi Houssine</footer>
        `;

        content.classList.add("show");
    }, 200);
}

// 🔄 Fonction pour récupérer le contenu des pages
function getPageContent(page) {
    const pages = {
        home: `
            <h1>Bienvenue sur WKW Audits</h1>
            <p>Choisissez une section dans la barre de navigation.</p>
        `,
        audits: `
            <h1>Checklist des Audits WKW</h1>
            <div class="audit-list">
                ${Object.keys(auditLinks).map(type => 
                    `<button onclick="openAudit('${type}')">${formatAuditName(type)}</button>`
                ).join('')}
            </div>
        `,
        contact: `
            <h1>Contactez-nous</h1>
            <p>Pour toute assistance, contactez-nous à :</p>
            <a href="mailto:utiqanooooo@gmail.com" class="contact-link">utiqanooooo@gmail.com</a>
        `
    };
    return pages[page] || `<h1>Page introuvable</h1>`;
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

// 🆕 Fonction pour ouvrir un audit dans un nouvel onglet
function openAudit(type) {
    if (auditLinks[type]) {
        window.open(auditLinks[type], "_blank");
    } else {
        alert("Lien indisponible.");
    }
}

// 📌 Fonction pour formater les noms des audits (ex: "5s" => "Audit 5S")
function formatAuditName(name) {
    return "Audit " + name.charAt(0).toUpperCase() + name.slice(1);
}
