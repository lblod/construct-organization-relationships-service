import { app, errorHandler } from "mu";
import { createOrganizationRelationships } from "./lib/processing-organization";

app.get("/", function (req, res) {
  res.send("Hello from construct-organization-relationships-service !");
});

app.post("/create-relationships/:organizationUuid", async function (req, res) {
  try {
    const organizationUuid = req.params.organizationUuid;
    await createOrganizationRelationships(organizationUuid);
    return res.status(200).send(); // since we await, it should be 200
  } catch (e) {
    console.log("Something went wrong while calling /create-relationship", e);
    return res.status(500).send();
  }
});

app.use(errorHandler);
