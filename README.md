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
  - for worship services (`EB`) with status "In Oprichting": a single open-ended time-specialisation starting at the current 3-year legislature's start date. It gets closed later when the organization becomes active or inactive (see `/update-relationships`).
  - for other worship administrative units (`EB`, `CB`): two time-specialisations are created, covering the current 3-year legislature and the next one (e.g. registering an org in 2027 materialises both `2026-04-01 → 2029-03-31` and `2029-04-01 → 2032-03-31`). This pre-empts the gap previously seen when an org registered mid-cycle had no orgaan-in-time for the following legislature until a backfill migration ran.
  - for non-worship organizations: a single open-ended time-specialisation from `START_DATE_NON_WORSHIP_GOVERNING_BODY`.
- mandate (`mandaat:Mandaat`) - one set per created time-specialisation. For worship services "In Oprichting" only a limited set is created (voorzitter, secretaris, penningmeester).
- bestuursfunctie, for non-worship organizations only (`lblodlg:Bestuursfunctie`) - one set per created time-specialisation
- minister position, for `ere:BestuurVanDeEredienst` only (`ere:PositieBedienaar`) - created once per organization, not per period

### `POST /update-relationships/:organizationUuid`

Expects the UUID of an organization whose status changed. Handles the lifecycle of worship services created with status "In Oprichting"; for other organizations the call is a no-op.

- transition to **Active**: the open-ended governing body in time is closed on the transition date, and two new ones are created with the full mandate set: one for the current legislature starting on the transition date and one for the next 3-year legislature.
- transition to **Inactive**: the open-ended governing body in time is closed on the transition date.

## Environment variables

| Variable                              | Description                                                           | Default               |
| ------------------------------------- | --------------------------------------------------------------------- | --------------------- |
| START_DATE_NON_WORSHIP_GOVERNING_BODY | Start date of governing bodies for non worship services               | "2019-01-01T00:00:00" |
| END_DATE_NON_WORSHIP_GOVERNING_BODY   | End date of governing bodies for non worship services (not mandatory) |                       |
