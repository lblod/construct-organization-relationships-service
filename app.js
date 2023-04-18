import { app, errorHandler } from 'mu';
import { createAdministrativeUnitdRelationships } from './lib/processing-administrative-unit'

app.get('/', function(req, res) {
  res.send('Hello from construct-administrative-unit-relationships-service !');
});

app.post('/create-relationships/:administrativeUnitdUuid', async function(req, res) {
  try {
    const administrativeUnitdUuid = req.params.administrativeUnitdUuid;
    await createAdministrativeUnitdRelationships(administrativeUnitdUuid);
    return res.status(200).send(); // since we await, it should be 200
  } catch (e) {
    console.log("Something went wrong while calling /create-relationship", e);
    return res.status(500).send();
  }
});

app.use(errorHandler);
