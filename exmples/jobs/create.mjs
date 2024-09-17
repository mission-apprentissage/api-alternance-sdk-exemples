import { ApiClient } from "api-alternance-sdk";
import { config } from "dotenv";

config();

const apiClient = new ApiClient({
  endpoint: "https://api-recette.apprentissage.beta.gouv.fr/api",
  key: process.env.TOKEN ?? "",
});

const minimalOffer = {
  offer: {
    title: "Opérations administratives",
    description: "Exécute des travaux administratifs courants",
  },
  workplace: {
    siret: "98222438800016",
  },
  apply: {
    email: 'test@mail.com'
  },
};

apiClient.job
  .createOffer(minimalOffer)
  .then((response) => {
    console.log('Offer created:', response);
  })
  .catch((error) => {
    console.error(error);
  });
