# construct-administrative-unit-relationships-service

This service constructs the governing bodies, mandates and ministers of newly created administrative units.

It's taking inspiration on [loket-cli](https://github.com/lblod/loket-cli) and is extended to handle worship administrative units as well.

## Installation

Add the following snippet to your `docker-compose.yml`:

```
construct-administrative-unit-relationships:
  image: lblod/construct-administrative-unit-relationships-service
```

## API

### `POST /create-relationships/:administrativeUnitdUuid`

Expects the uuid of a newly created administrative unit as a parameter.

Creates the following data and links it to the administrative unit :

- governing body (`besluit:Bestuursorgaan`)
- governing body in time (`besluit:Bestuursorgaan`)
- mandate (`mandaat:Mandaat`)
- bestuursfunctie, for non-worship administrative units only (`lblodlg:Bestuursfunctie`)
- minister position, for `ere:BestuurVanDeEredienst` only (`ere:PositieBedienaar`)

## Environment variables

| Variable                              | Description                                                           | Default               |
| ------------------------------------- | --------------------------------------------------------------------- | --------------------- |
| START_DATE_NON_WORSHIP_GOVERNING_BODY | Start date of governing bodies for non worship services               | "2019-01-01T00:00:00" |
| END_DATE_NON_WORSHIP_GOVERNING_BODY   | End date of governing bodies for non worship services (not mandatory) |                       |
| START_DATE_WORSHIP_GOVERNING_BODY     | Start date of governing bodies for worship services                   | "2020-04-01T00:00:00" |
| END_DATE_WORSHIP_GOVERNING_BODY       | End date of governing bodies for worship services                     | "2023-03-31T00:00:00" |
