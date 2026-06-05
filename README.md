# HashNama – Cryptocurrency Asset Platform

**HashNama** is a cryptocurrency asset management platform that allows users to monitor their digital wallets and track cryptocurrency prices. Backend functionality for wallet balance tracking and analytics is implemented. Features like chat (public/private) and full wallet management are under development.

![Screenshot 2025-02-20 234137](https://github.com/user-attachments/assets/3a65c90b-6822-40c6-b419-d7cf6c47b376)
![Screenshot 2025-02-20 234053](https://github.com/user-attachments/assets/c2d8267b-4280-4a96-86e0-52f88ca0cb88)

---

## Features

### Wallet Overview

* Users can add wallets using **public addresses** or via connection to **MetaMask**.
* View wallet balances and perform data analysis to determine wallet health scores.
* Track **profit and loss** based on cryptocurrency price fluctuations.

### Market and Watchlist

* Display **real-time cryptocurrency prices**, market capitalization, and circulating supply.
* Add cryptocurrencies to a **watchlist**.
* Set **price alerts** to stay informed about market changes.

---

## Technical Details

* **Frontend:** Developed using Vanilla JavaScript (partial implementation).
* **Backend:** Implemented using **Node.js** and **Express.js**; wallet overview functionality is complete.
* **Database:** **MongoDB**.

> Note: Some features such as full wallet management and online chat are not fully implemented; backend currently supports only wallet balance tracking.

---

## Installation

### Steps to run

1. Clone the repository:

   ```bash
   git clone https://github.com/HashNama/Hash-nama.git
   ```

2. Enter the project directory:

   ```bash
   cd Hash-nama
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and fill in the following keys:

   ```
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

## README Notes

* Focuses on backend functionality.
* Frontend is partially implemented; chat and full wallet management are under development.
* Images are preserved to illustrate current interface.
