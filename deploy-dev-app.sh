#!/bin/bash
rsync -Pavr --exclude={'*.env','.vscode','.env','*.egg-info','.DS_Store','.idea','data','vendor','.git','public/certbot','node_modules','client','client-tende','logs','web','admin'} ./ boex_dev_api:~/bo-ex-admin-dev/ --delete
exec "$@"

