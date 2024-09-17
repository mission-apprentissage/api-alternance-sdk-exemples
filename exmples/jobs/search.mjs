import { ApiClient } from "api-alternance-sdk";
import { config } from "dotenv";

config();

const apiClient = new ApiClient({
  endpoint: "https://api-recette.apprentissage.beta.gouv.fr/api",
  key: process.env.TOKEN ?? "",
});

const querystring = {
  latitude: 48.84823,
  longitude: 2.397416,
  radius: 10,
  target_diploma_level: "3",
  romes: ["F1603", "F1602"],
  rncp: "RNCP37442",
};

apiClient.job
  .search(querystring)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
