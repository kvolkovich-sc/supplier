# supplier
Supplier Microservice

This currently provides backend api and react components using the backend.
The components are being embedded in bnp service frontend SPA.

# Deployment
## Swarm
```
docker service create --publish mode=host,target=3001,published=3001 --dns-search service.consul --env NODE_ENV=production --env SERVICE_NAME=supplier --env PORT=3001 --env SERVICE_TAGS=kong --env SERVICE_3001_CHECK_HTTP=/api/suppliers --env SERVICE_3001_CHECK_INTERVAL=15s --env SERVICE_3001_CHECK_TIMEOUT=3s opuscapita/supplier:latest
```
