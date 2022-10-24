import { app, query, errorHandler } from 'mu';

app.get('/', function( req, res ) {
  res.send('Hello from construct-administrative-unit-relationships-service !');
} );

app.use(errorHandler);
