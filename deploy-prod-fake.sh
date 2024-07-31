#!/bin/bash
rsync -Pavr ./boex-admin.zip boex_nc1:~/boex-admin.zip --delete
exec "$@"

