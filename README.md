# supplier
Supplier Microservice

This currently provides backend api and react components using the backend.
The components are being embedded in bnp service frontend SPA.

# Deployment
## Swarm
```
docker service create --publish mode=host,target=3001,published=3001 --dns-search service.consul --env SERVICE_NAME=supplier --env SERVICE_TAGS=kong --env SERVICE_3001_CHECK_HTTP=/ --env SERVICE_3001_CHECK_INTERVAL=15s --env SERVICE_3001_CHECK_TIMEOUT=3s gr4per/supplierdir:latest
```
