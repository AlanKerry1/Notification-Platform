<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&height=180&color=0:de7300,100:540085&text=Notification%20Platform&fontAlign=50&fontAlignY=40&animation=twinkling&descAlign=50&descAlignY=58&fontColor=ffffff&fontSize=42&section=header&reversal=false" width="100%"/>
</div>

## 📌 About project
 
> **Notification Platform** — Platform for sending notifications via Telegram.

This application, consisting of two microservices communicating via RabbitMQ, allows a bot to send messages via Telegram.
 
---
 
## ✅ What's implemented


 
| Feature | Comment |
|-------------|----------|
| 🏛️ Clean Architecture & SOLID | Project follows Domain-Driven Design and Clean Architecture principles with clear separation of concerns |
| 🏗️ Microservices Architecture | Two decoupled services: Producer and Consumer |
| 🐇 RabbitMQ Broker | Asynchronous communication using exchange/queue pattern for message delivery |
| 🆔 Idempotency (UUID, Redis) | Producer attaches unique IDs to events; Consumer ensures single-time processing |
| 🛡️ Retry Loop Protection (Redis) | In case of internal errors, the consumer will return the message to the queue and try again until the number of attempts is exhausted. |
| 🔄 Reliable Messaging | Producer implements Publisher Confirms and Retries for connection stability |
| 📥 Manual Ack Strategy | Consumer uses manual acknowledgments to prevent message loss on processing failure |
| 🤖 Telegram Integration | Dedicated module in Consumer for real-time notifications via Telegram Bot API |
| 🛡️ DTO Validation | Strict input validation in Producer using class-validator and class-transformer |
| 📖 Swagger (OpenAPI) |Producer API is fully documented with interactive UI for event triggering |
| 🪵 Event Logging | Detailed logs for every stage |
| 🐳 Docker Compose | Orchestration of Producer, Consumer, Redis and RabbitMQ in a single network |
 
---
 
## 🚀 Quick start
 
## 🐳 Running with Docker

> Requirements: Docker Compose, Telegram Bot Token

```bash
# Run from the project root
cp .env.docker.example .env.docker
```
### You should set your env variables:
 - RABBITMQ_DEFAULT_USER
 - RABBITMQ_DEFAULT_PASS
 - RMQ_CONNECTION_STRING
 - TELEGRAM_BOT_TOKEN

```bash
# Run from the project root
docker-compose up -d
```

> Once the container is running, you can open http://localhost:3000/api/v1/docs/ in your browser and test it directly from the Swagger documentation page

---
 
## 👨‍💻 Author

GitHub: [@AlanKerry1](https://github.com/AlanKerry1)
 
<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=0:de7300,100:540085&fontAlign=50&fontAlignY=40&animation=twinkling&descAlign=50&descAlignY=58&fontColor=ffffff&fontSize=42&section=footer&reversal=false" width="100%"/>
 
</div>
 
