# Ticketing tool:

This is a ticketing tool that utilizes a microservice architecture for its backend. The goal of this project is to create a robust backend that has multi-language support. The backend will have a library to minimize code reuse. The project also makes use of the NATS Streaming server to publish/listen to events. I want to note that in this project I took the asynchronous event driven approach. This brings its own challenges compared to the synchronous event driven approach, in this repo you'll find solutions to those problems.

In regards on how we interact with these microservices the choice for SSR (Next.js) has been made. Utilizing SSR opposed to pure React has its own challenges & requires you to understand the fundamentals of how HTTP requests are made. This added complexity gives us an opportunity to learn and showcase a fundamental understanding of HTTP requests.
**this project can be used as an example for a deployment ready microservice architecture**

## Pre-requisites:

-   Install docker: https://docs.docker.com/get-docker/
-   Install kubernetes: https://docs.docker.com/desktop/kubernetes/
-   Install skaffold: https://skaffold.dev/

## Installation & Setup guide:

-   Pull repo: `git pull https://github.com/berkan-alci/MS-tickets-NATS.git`
-   Get the ingress NGINX controller: `https://kubernetes.github.io/ingress-nginx/deploy/` **Note: this will not work with minikube.**
-   Go to your hosts file and add : `127.0.0.1 ticketing.com` **Note: this is if you're running it on your local environment. If you're running it in the cloud go to ingress-srv.yaml and change the host `host: ticketing.com` to whatever you use.**
-   Setup the ENV variables: `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=ENTER_SECRET_HERE`
-   Go to root of directory and run `skaffold dev`.
-   Go to http://ticketing.com **Note: click on the browser and type "thisisunsafe" if accessing via localhost**

## Architecture diagrams & info:

### How the application looks like in a cluster:

![Microservice architecture](readme\Cluster-Diagram.png)

### Services and their functionalities

### All events summarized

### Flow of events: creating ticket -> purchasing one

## Additional info:

-   Go inside the microservice you want to run tests and run `npm run test`
-   The common library can be found here: https://github.com/berkan-alci/tt-ms-common or https://www.npmjs.com/package/@tt-ms-common/common
-   the "nats-test" directory is not used in the project. it's simply a short explanation (in code) how to utilize the nats streaming server.
-   A specific point where there is failure possible during production, but isn't handled in this code: No service for publish failures was created. You'd normally create an "events collection/table" as well. If the saved data and/or event was not saved in the db, the changes would be reverted. To fix this you could use built-in database transactions & create a service that listens for successful saves & emits those events. This adds in a second step to publishing which ensures concurrency, however how that is implemented and IF it needs to be done is highly subjective to the project being built. So this is where there is some obvious technical debt in this project.
-   Another good change would be to use a postgres db instead of mongodb for the orders service. I stuck with mongodb, since this isn't meant to be the fastest project in the world. It's more to showcase my abilities.
