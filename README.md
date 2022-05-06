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
-   Go to root of directory and run `skaffold dev`.

## Additional info:

-   Go inside the microservice you want to run tests and run `npm run test`
-   The common library can be found here: https://github.com/berkan-alci/tt-ms-common or https://www.npmjs.com/package/@tt-ms-common/common
