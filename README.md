# Ticketing tool:

## Description:

This is a ticket purchasing tool that utilizing a micro backend. It'll have it's own NPM library for shared code. Besides that we'll be using a NATS streaming server as our event bus.

## Front-End:

Front-end will be built in react.

## Back-end:

## Setup:

### Prereqs:

-   install docker: https://docs.docker.com/get-docker/
-   install kubernetes: https://docs.docker.com/desktop/kubernetes/
-   install skaffold: https://skaffold.dev/

### Running the microservices:

-   Pull repo: `git pull https://github.com/berkan-alci/MS-tickets-NATS.git`.
-   Install packages in dependencies: `npm install`. (optional)
-   Get the NGINX Ingress controller: `https://github.com/kubernetes/ingress-nginx/` (THE SETUP I MADE WILL NOT WORK WITH MINIKUBE!!).
-   Go to root of directory and run `skaffold dev`.
-   Containers should start up in k8s.

### Running the tests (will be streamlined with CI/CD later):

-   go to /auth and run: `npm run test` locally.
