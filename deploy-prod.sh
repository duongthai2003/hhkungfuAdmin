#!/bin/bash
rsync -Pavr --exclude={'*.env','.vscode','.env','*.egg-info','.DS_Store','.idea','data','vendor','.git','public/certbot','node_modules','client','client-tende','logs','web','admin','docker','libs','./services/*'} ./ boex_nc1:~/bo-ex-api-dev/ --delete
exec "$@"

