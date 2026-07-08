import { app, errorHandler } from "mu";
import { createOrganizationRelationships } from "./lib/processing-organization";
import { handleStatusChange } from "./lib/status-transitions";

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

app.post("/update-relationships/:organizationUuid", async function (req, res) {
  try {
    const organizationUuid = req.params.organizationUuid;
    const transitionDate = req.body?.date;
    if (!transitionDate || isNaN(new Date(transitionDate).getTime())) {
      return res.status(400).send({
        error: "A valid 'date' (the change event date) is required in the request body.",
      });
    }
    await handleStatusChange(organizationUuid, transitionDate);
    return res.status(200).send();
  } catch (e) {
    console.log("Something went wrong while calling /update-relationships", e);
    return res.status(500).send();
  }
});

app.use(errorHandler);
