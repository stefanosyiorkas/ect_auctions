# 📦 Online Auction Platform (PWA)

Η παρούσα εφαρμογή αποτελεί την υποχρεωτική εργασία για το μεταπτυχιακό μάθημα "Τεχνολογίες Ηλεκτρονικού Εμπορίου" και αφορά την υλοποίηση μιας Progressive Web Application (PWA) για ηλεκτρονικές δημοπρασίες.

---

## 🛠️ Τεχνολογίες

### Frontend
- React.js (Create React App)
- React Router v6
- Axios
- CSS (custom components + responsive layout)

### Backend
- Spring Boot 3.5.0
- Spring Web, Spring Data JPA, Spring Security (basic config)
- MySQL 8
- RESTful API με Dockerized build

### Database
- MySQL schema με πίνακες: `users`, `auctions`, `bids`

### DevOps
- Docker & Docker Compose
- Fully containerized (frontend, backend, db)

---

## 📂 Δομή Project

```
project-root/
├── backend/             # Spring Boot backend
├── frontend/            # React frontend
├── docker-compose.yml  # Multi-service definition
```

---

## 🚀 Οδηγίες Εκτέλεσης

### 1. Κλώνος Project

```bash
git clone https://github.com/your-username/auction-pwa.git
cd auction-pwa
```

### 2. Εκκίνηση με Docker Compose

```bash
docker-compose up --build
```

- React app: [http://localhost:3000](http://localhost:3000)
- Spring Boot API: [http://localhost:8080](http://localhost:8080)
- MySQL: accessible on port 3306

---

## 🧪 Test Users

| Username  | Password | Ρόλος   |
|-----------|----------|---------|
| stefanos  | 123456   | Seller  |

---

## 🔐 Authentication

Η εφαρμογή υποστηρίζει βασική login/registration ροή:
- Τα στοιχεία αποθηκεύονται στη MySQL
- Ο χρήστης αποθηκεύεται στο `localStorage` και προστατεύει τα routes

---

## ✨ Λειτουργικότητες

### Χρήστες
- Εγγραφή / Login
- Προστατευμένα routes (με localStorage check)

### Δημοπρασίες
- Λίστα ενεργών δημοπρασιών (GET `/api/auctions`)
- Δημιουργία νέας δημοπρασίας (POST `/api/auctions`)
- Λεπτομέρεια δημοπρασίας και προσφορά (bid)

### Προσφορές (Bids)
- Καταχώρηση προσφοράς (POST `/api/bids`)
- Ενημέρωση τρέχουσας τιμής δημοπρασίας

---

## 📱 PWA Support

- Υποστήριξη PWA manifest, service worker
- Responsiveness σε mobile & desktop

---

## 📌 Περιβάλλοντα / Ρυθμίσεις

### Spring `application.properties`

```properties
spring.datasource.url=jdbc:mysql://db:3306/auction_db
spring.datasource.username=user
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

---

## 📦 Docker Compose Overview

```yaml
services:
  db:
    image: mysql:8
    ports: ["3306:3306"]
    environment: ...

  backend:
    build: ./backend
    ports: ["8080:8080"]
    depends_on: [db]

  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on: [backend]
```

---

## 👨‍🎓 Φοιτητής

**Ονοματεπώνυμο:** Στεφάνος Γιωρκάς  
**Μάθημα:** Τεχνολογίες Ηλεκτρονικού Εμπορίου  
**Ημερομηνία Παράδοσης:** 2025-06-29

---

## 📬 Επικοινωνία

Για οποιαδήποτε απορία σχετικά με το project, μπορείτε να επικοινωνήσετε στο:  
📧 **sgiorkas@cs-example.edu**