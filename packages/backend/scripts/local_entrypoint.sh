#!/bin/bash
yarn prisma migrate deploy
node packages/backend/dist/src/main.js