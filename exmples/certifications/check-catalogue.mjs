import { ApiClient } from "api-alternance-sdk";
import { config } from "dotenv";

config();

const apiClient = new ApiClient({
  endpoint: "https://api-recette.apprentissage.beta.gouv.fr/api",
  key: process.env.TOKEN ?? "",
});

const limit = 500;

async function countCatalogue() {
    const countResponse = await fetch(`https://catalogue-apprentissage.intercariforef.org/api/v1/entity/formations/count`).then((response) => response.json());
    return countResponse;
}

async function getCataloguePage(page) {
    const response = await fetch(`https://catalogue-apprentissage.intercariforef.org/api/v1/entity/formations?page=${page}&limit=${limit}`).then((response) => response.json());
    return response.formations;
}

const count = await countCatalogue()
const pages = Math.ceil(count / limit);

for (let page = 1; page <= pages; page++) {
    const formations = await getCataloguePage(page);
    console.log(`Page ${page}: ${formations.length} formations`);

    for (const formation of formations) {
        if (!formation.cfd || !formation.rncp_code) {
            console.log(`Formation sans CFD ou RNCP`, formation.cle_ministere_educatif);
            continue;
        }

        const certif = await apiClient.certification.index({
            identifiant: { cfd: formation.cfd, rncp: formation.rncp_code },
        });

    
        // TODO: not cfd ou not rncp
        if (certif.length === 0) {
            console.log(`Certification non trouvée pour la formation`, formation.cle_ministere_educatif);
        } else if (certif[0].periode_validite.debut > formation.date_fin || certif[0].periode_validite.fin < formation.date_debut) {
            console.log(`Certification obsolète pour la formation`, formation.cle_ministere_educatif, certif[0].identifiant);

        }
    }
}
