# deploy mysql first because it takes time to start up
docker compose up db

#deploy the api after
docker compose up api --build