#!/usr/bin/env bash
set -e

# NOTE: this will work as long as there's only one file called 'docker-compose.yml' in the hierarchy of the project
docker-compose -p cleanarch-poc-local-dev -f docker-compose.yml up -d
