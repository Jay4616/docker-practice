# 🐳 Production Docker Cheat Sheet

### 📦 Container Management
- `docker run -d -p 8080:80 --name web nginx` → Run a detached container with port mapping
- `docker run -it ubuntu bash` → Run an interactive container terminal shell
- `docker ps` → List active containers
- `docker ps -a` → List all active and stopped containers
- `docker logs <container_id>` → Stream container runtime logs
- `docker exec -it <container_id> sh` → Open an interactive terminal execution shell inside a live container
- `docker stop <container_id>` → Safely stop a container
- `docker rm <container_id>` → Permanently remove a container

### 💾 Image Operations
- `docker build -t app:v1.0 .` → Build an image from a local Dockerfile
- `docker images` or `docker image ls` → List all locally cached images
- `docker tag app:v1.0 username/app:v1.0` → Retag an image to prepare for shipping
- `docker push username/app:v1.0` → Publish an image to remote Docker Hub registry
- `docker rmi <image_id>` → Remove a local image layer

### 💾 Storage Volumes
- `docker volume create my-data` → Provision a new isolated storage disk
- `docker volume ls` → List available volume systems
- `docker volume inspect my-data` → View disk mount details and host storage paths
- `docker volume rm my-data` → Delete a specific volume drive

### 🌐 Network Bridges
- `docker network create app-net` → Initialize a custom isolated network bridge
- `docker network ls` → List all internal Docker networks
- `docker network inspect app-net` → View containers connected to a network bridge
- `docker network connect app-net web-app` → Manually hot-plug a live container to a network

### 🚀 Docker Compose
- `docker compose up -d` → Build, network, and spin up an entire stack in the background
- `docker compose down` → Safely stop and destroy the service stack
- `docker compose down -v` → Destroy the service stack and completely wipe associated volumes
- `docker compose ps` → Show operational status of multi-container service stacks
- `docker compose logs -f` → Follow active streaming output logs of the entire stack

### 🧹 Infrastructure Cleanup
- `docker system df` → Analyze Docker disk usage footprint
- `docker system prune -a --volumes` → Core nuclear clean: wipes all stopped containers, unused networks, dangling build caches, and unattached storage volumes

### 📝 Dockerfile Reference Blueprint
- `FROM` → Defines base image framework runtime environment (e.g., `node:20-alpine`)
- `WORKDIR` → Establishes the primary directory context path inside the container
- `COPY` → Copies local host project structures into container working path
- `RUN` → Executes build commands inside image storage states during setup (e.g., `npm install`)
- `ENV` → Injects functional persistent environment variables
- `EXPOSE` → Documentational marker mapping open communication ports
- `CMD` → Sets the default starting program process execution string when containers spin up
