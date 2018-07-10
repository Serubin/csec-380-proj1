# Skitter. Not a Twitter rip off
Skitter is a school project for RIT's CSEC380 class. It's aim is to demonstrate security vulnerabilities within microservice applications.

## Architecture
You'll find the following components in `src/`:
* `db/` contains A mariadb image and an ELK stack for data storage.
* `auth/` is the authentication portion written in JavaEE.
* `skits/` is the skitter core service which enables basic 'tweet' like functionality'
* `skit-reply/` is the skit reply service which enables replies to 'tweets'
* `settings/` enables basic account/profile settings
* `front-loader/` is the front-facing nginx server which aggregates all the endpoints into a single REST API. This service also serves the static site.
* `site/` is the source code for the static site.

## Running The Service Cluster
Skitter is built on top of docker and docker-compose. Thus running the system is as simple as `docker-compose build` followed by `docker-compose up`. This will bring up all the necessary services to create the full skitter experience. Individual services can be brought up by using `docker-compose up <service-name>`. __NOTE: This will not start service dependencies.__

see [src/db/mariadb/schema.sql](src/db/mariadb/schema.sql) for table definition.

## Data Services
Skitter uses ElasticSearch, LogStash, And Kibana for storing Skits and Skit replies as well as Mariadb for all other data. All Data Associated to these services are stored in `db/`. By default our system will mount a local directory for data persistence.

## API Endpoints
* `/` - Static Site Location
  * `/api/v1` - Api endpoint
    * `GET`  `/getskits` - Returns skits
    * `POST` `/addskit` - Add new skit, skit: content
    * `DELETE`  `/removeskit` - Remove a skit, id: skit id

## UML on Lucidchart
https://www.lucidchart.com/invitations/accept/b22b8e53-789e-4238-ba3b-d9c1284ae655

## Mockup on Lucidchart
https://www.lucidchart.com/documents/edit/46f1b980-0558-49df-bb1e-04035532f2ce/0
