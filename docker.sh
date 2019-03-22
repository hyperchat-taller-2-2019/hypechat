#!/bin/bash
PORT=8080

echo "########### Building hypechat ###########"
echo ""
sudo docker build -t hypechat . ;

echo""; echo "########### Running hypechat ###########"
echo "...Exposing port $PORT"; echo"";
sudo docker run -p "$PORT":8080 hypechat;

echo"";echo "########### Removing containers ###########";echo"";
sudo docker container rm $( sudo docker container ls -aq);
