# construct-organization-relationships-service

This service constructs the governing bodies, mandates and ministers of newly created organizations.

It's taking inspiration on [loket-cli](https://github.com/lblod/loket-cli) and is extended to handle worship administrative units as well.

## Installation

Add the following snippet to your `docker-compose.yml`:

```
construct-organization-relationships:
  image: lblod/construct-organization-relationships-service
```

## API

### `POST /create-relationships/:organizationUuid`

Expects the UUID of a newly created organization as a parameter.

Creates the following data and links it to the organization:

- governing body (`besluit:Bestuursorgaan`)
- governing body in time (`besluit:Bestuursorgaan`)
- mandate (`mandaat:Mandaat`)
- bestuursfunctie, for non-worship organizations only (`lblodlg:Bestuursfunctie`)
- minister position, for `ere:BestuurVanDeEredienst` only (`ere:PositieBedienaar`)

## Environment variables

| Variable                              | Description                                                           | Default               |
| ------------------------------------- | --------------------------------------------------------------------- | --------------------- |
| START_DATE_NON_WORSHIP_GOVERNING_BODY | Start date of governing bodies for non worship services               | "2019-01-01T00:00:00" |
| END_DATE_NON_WORSHIP_GOVERNING_BODY   | End date of governing bodies for non worship services (not mandatory) |                       |
