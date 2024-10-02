import { ApiClient } from "api-alternance-sdk";
import { config } from "dotenv";

config();

const apiClient = new ApiClient({
  endpoint: "https://api-recette.apprentissage.beta.gouv.fr/api",
  key: process.env.TOKEN ?? "",
});

const siret = "19020050100012"
const uai = "0022155G"

apiClient.organisme.recherche({ siret, uai }).then((response) => {
  console.log('Organisme found:', JSON.stringify(response, null, 2));
}).catch((error) => {
  console.error(error);
});