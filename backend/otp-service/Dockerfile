# OTP Service Dockerfile
FROM golang:1.20 AS builder
WORKDIR /usr/src/app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o otp-service ./cmd/otp-service

FROM golang:1.20
WORKDIR /root/
COPY --from=builder /usr/src/app/otp-service .
CMD ["./otp-service"]
