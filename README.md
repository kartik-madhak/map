# MicroservicesExample

A basic example showing a simple implementation of microservices. 

This project requires `docker` and `docker-compose` to be installed in your system. Apart from that, to run the frontend, you would need `npm` installed. Alternatively, you could avoid using the frontend and simply test the API gateway using tools like Postman.

# Steps to run

- Write `docker-compose up --build` in the terminal to start all the services. That's it!

# Explanation of the Project

- All the services - `userService`, `blogService`, `commentService`, `likeService`, and `api-gateway` are written in `nodejs`.  
- The `api-gateway` service uses `expressjs` to expose REST API endpoints to the external world. Internally, it converts the REST API calls to their respective `grpc` calls of each service.
- Each of the other services - `userService`, `blogService`, `commentService`, and `likeService` uses `nodejs`, `mongodb`, and `grpc` to provide their respective functionalities.
- `userService` - This service provides authentication and verification endpoints. It uses token-based authentication.
- `blogService` - It is responsible for creation, and fetching of blogs, and checking whether blog exists or not.
- `commentService` - This service is responsible for creation and fetching of comments.
- `likeService` - This service is responsible for creation and fetching of likes.
- Although all services use the same mongo service, they can be easily configured to be run on completely different mongo services without any modification in their code.
- So in total, their are 6 services running in docker - `api-gateway`, `userService`, `blogService`, `commentService`, `likeService`, and `mongodb`. 
- `api-gateway` is exposed at the port - 8079. You can use tools like postman to hit the endpoints. The endpoints are defined in the `./api-gateway/routes` folder.
- Additionally, there is an optional (and quite good looking 😜) frontend which is written in `React` and `bootstrap`. You can run the frontend by going to the `./app/frontend` folder and running `npm start`.

# Modifying and Debugging

Modifying and debugging can be quite troublesome inside the docker container. That's why, each of the service can be run without docker simple by typing `node index.js` inside their respective folder. (`node server.js` for the `api-gateway` service). This way, the `api-gateway` would be exposed to the port 50049 port instead of 8079. Also, to run the frontend without docker, change the `.env` file inside `./app/frontend` to use the port 50049.



