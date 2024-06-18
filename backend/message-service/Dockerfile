# Message Service Dockerfile
FROM golang:1.20 AS builder
WORKDIR /usr/src/app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o message-service ./cmd/message-service

FROM golang:1.20
WORKDIR /root/
COPY --from=builder /usr/src/app/message-service .
CMD ["./message-service"]
