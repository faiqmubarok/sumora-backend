# Sumora Backend

Sumora Backend adalah REST API server yang dibangun menggunakan **Express.js** dan mengikuti pendekatan **layered architecture** untuk menjaga struktur yang bersih, scalable, dan maintainable.

## 🏗️ Tech Stack

- **Node.js** + **Express.js** (v5)
- **Prisma ORM** untuk koneksi database
- **PostgreSQL** (bisa diganti sesuai konfigurasi Prisma)
- **JWT (jsonwebtoken)** untuk authentication
- **bcrypt** untuk hashing password
- **dotenv** untuk environment variables
- **Yup** untuk validasi schema (bisa diubah ke Zod kalau perlu)
- **CORS** untuk cross-origin request
- **Layered Architecture** (routes → controllers → services → repositories)

---

## 📁 Project Structure (Layered Architecture)

```
src/
├── config/            # Konfigurasi database, env, dll
├── (features)/        # Folder fitur (repository, service, controller, validation)
└── index.js           # Entry point utama aplikasi
```

---

## 🚀 Getting Started

### 1. Clone repo

```bash
git clone https://github.com/faiqmubarok/sumora-backend.git
cd sumora-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Buat file `.env` di root project:

```
DATABASE_URL=postgresql://user:password@localhost:5432/sumora
JWT_SECRET=your_jwt_secret
```

### 4. Setup database via Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Start development server

```bash
npm run dev
```

---

## 🛡️ Authentication

Fitur login dan register menggunakan:

- **Email & Password**
- **Password** disimpan menggunakan `bcrypt` (hashing)
- **JWT** digunakan sebagai token otentikasi

### Login Response Example

```json
{
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

---

## ✅ Available Features

- [x] User Registration
- [x] User Login with JWT
- [x] Secure Password Hashing
- [x] Validation with Yup
- [x] Layered code structure
- [x] Modular error handling
- [x] Prisma ORM integration

---

## 🧪 API Testing

Kamu bisa menggunakan **Postman** atau **Insomnia** untuk menguji endpoint:

### Register

```
POST /api/v1/users/auth/register
```

### Login

```
POST /api/v1/users/auth/login
```

---

## 📝 License

MIT License

---

## ✍️ Author

Sumora Dev Team – [faiqmubarok]
