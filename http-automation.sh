#! /usr/bin/env bash

PORT=$1

curl -d '{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }' -H 'Content-Type: application/json' http://localhost:$PORT/transaction
echo
curl -d '{ "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }' -H 'Content-Type: application/json' http://localhost:$PORT/transaction
echo
curl -d '{ "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }' -H 'Content-Type: application/json' http://localhost:$PORT/transaction
echo
curl -d '{ "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }' -H 'Content-Type: application/json' http://localhost:$PORT/transaction
echo
curl -d '{ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }' -H 'Content-Type: application/json' http://localhost:$PORT/transaction
echo

curl  -d '{ "points": 5000 }' -H 'Content-Type: application/json'  http://localhost:$PORT/spend
echo

curl http://localhost:$PORT/point