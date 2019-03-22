#!/bin/bash

# e.g. ./docker.sh command

PORT=8080
echo "########### Building hypechat ###########"
echo ""
sudo docker build -t hypechat . ;

echo""; echo "########### Running hypechat ###########"
echo "...Exposing port $PORT"; echo"";

sudo docker run -p "$PORT":5000 hypechat npm "$1";

echo"";echo "########### Removing containers ###########";echo"";
sudo docker container rm $( sudo docker container ls -aq -f ancestor=hypechat);
