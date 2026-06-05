# HashNama - Cryptocurrency Asset Management Platform

**HashNama** is a cryptocurrency asset management platform that allows users to efficiently manage their digital wallets, track real-time crypto prices, and take advantage of advanced features such as **public and private chats**, **watchlists**, and **price alerts**.

---

![Screenshot 2025-02-20 234137](https://github.com/user-attachments/assets/3a65c90b-6822-40c6-b419-d7cf6c47b376)
![Screenshot 2025-02-20 234053](https://github.com/user-attachments/assets/c2d8267b-4280-4a96-86e0-52f88ca0cb88)

---

## Features

### 1. Wallet Management

* Users can register wallets using a **public address** or via **MetaMask** integration.
* View **wallet balance** and analyze data to determine wallet health scores.
* Calculate **profit and loss** based on cryptocurrency price changes.

### 2. Public and Private Chats

* Engage with other users through a **public chat**.
* Create **private chats** with friends using a unique room code.

### 3. Market Tracking and Watchlists

* View **real-time cryptocurrency prices**, **market capitalization**, **circulating supply**, and more.
* Add cryptocurrencies to a personalized **watchlist**.
* Set **price alerts** to receive notifications about significant changes.

---

## Technical Stack

* **Frontend:** Vanilla JavaScript
* **Backend:** Node.js and Express.js
* **Database:** MongoDB

---

## Project Setup

### Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/HashNama/Hash-nama.git
```

2. Navigate into the project directory:

```bash
cd Hash-nama
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root and configure the following environment variables:

```bash
PORT

DB_URI

ACCESS_TOKEN_SECRET_KEY
REFRESH_TOKEN_SECRET_KEY
ACCESS_TOKEN_EXPIRES_IN_SECONDS
REFRESH_TOKEN_EXPIRES_IN_SECONDS

MORALIS_API_KEY

EMAIL_USERNAME
EMAIL_PASSWORD

DOMAIN
NODE_ENV
```

5. Start the application:

```bash
npm start
```

---

## Notes

* The backend is fully implemented; the frontend is partially developed and planned for future updates.
* Images in this README are preserved and reflect the current UI status.
* MongoDB connection, authentication tokens, and Moralis API key must be configured correctly for full functionality.
