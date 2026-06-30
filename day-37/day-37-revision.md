# Day 37 – Docker Revision & Self-Assessment

## 🎯 Self-Assessment Checklist
- [x] Run a container from Docker Hub (interactive + detached)
- [x] List, stop, remove containers and images
- [x] Explain image layers and how caching works
- [x] Write a Dockerfile from scratch with FROM, RUN, COPY, WORKDIR, CMD
- [x] Explain CMD vs ENTRYPOINT
- [x] Build and tag a custom image
- [x] Create and use named volumes
- [x] Use bind mounts
- [x] Create custom networks and connect containers
- [x] Write a docker-compose.yml for a multi-container app
- [x] Use environment variables and .env files in Compose
- [x] Write a multi-stage Dockerfile
- [x] Push an image to Docker Hub
- [x] Use healthchecks and depends_on

---

## ⚡ Quick-Fire Interview Questions

### 1. What is the difference between an image and a container?
An **image** is a read-only, immutable blueprint template containing the application code, runtime libraries, and environment configurations. A **container** is a live, isolated, runnable instance instantiated from that image. Think of an image as the class and the container as the object instance.

### 2. What happens to data inside a container when you remove it?
Any data created or modified inside a container is completely ephemeral. Once the container is removed (`docker rm`), that data is permanently lost unless it was explicitly mapped to a persistent storage driver like a **Named Volume** or **Bind Mount**.

### 3. How do two containers on the same custom network communicate?
They communicate seamlessly using **Embedded DNS Service Discovery**. Instead of hardcoding erratic IP addresses, containers can talk to one another directly using their defined `service_name` (in Docker Compose) or container names as the network hostname (e.g., `mongodb://database:27017`).

### 4. What does `docker compose down -v` do differently from `docker compose down`?
A standard `docker compose down` stops and removes running containers and networks defined in the layout. Adding the `-v` flag instructs Docker to **violently purge all attached Named Volumes** as well, completely wiping out persistent database storage.

### 5. Why are multi-stage builds useful?
They allow developers to separate the heavy build-dependency phase from the lightweight final execution stage. By stripping out tools like compilers, package managers, and development source files, the final production image size drops dramatically (e.g., from 1.6GB down to 202MB), reducing cloud storage costs and attack vectors.

### 6. What is the difference between `COPY` and `ADD`?
`COPY` is straightforward; it securely clones local files/directories from your host machine into the container context. `ADD` does everything `COPY` does, but includes advanced capabilities: it can pull files from remote URLs and automatically extract compressed archives (`.tar`, `.gz`) directly into the target path.

### 7. What does `-p 8080:80` mean?
This maps network traffic ports. It intercepts incoming traffic hitting **Port 8080 on your host computer (laptop)** and routes it straight through to **Port 80 inside the isolated container execution layer**.

### 8. How do you check how much disk space Docker is using?
Run the built-in analyzer command:
```bash
docker system df
