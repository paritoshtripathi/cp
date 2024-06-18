# Use an official Golang image as a build stage
FROM golang:1.17 AS build

# Set the Current Working Directory inside the container
WORKDIR /usr/src/app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build -o message-service ./cmd/message-service

# Start a new stage from scratch
FROM golang:1.17

# Set the Current Working Directory inside the container
WORKDIR /usr/src/app

# Copy the Pre-built binary file from the previous stage
COPY --from=build /usr/src/app/message-service .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./message-service"]
