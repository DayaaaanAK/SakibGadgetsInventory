# Sakib Gadgets E-commerce Platform

## Overview

Sakib Gadgets' Inventory is an inventory management platform built for managing customers, products, and orders. It provides a user-friendly interface for administrators to add and view customer, products and order info as well handle instant payment through PortWallet API.

## Features

1. Customer Management: Add and view customer details such as name, email, phone number, and address.
2. Product Management: Add and view product information including name, price, description, and quantity.
3. Order Management: Create, view, and update orders. Each order includes customer information, product details, total price, status, and payment URL.
4. Authentication: Secure authentication system for administrators.
5. Payment System: Generate invoices for order using PortPos online payment, via PortWallet API.

## Technologies Used

- Frontend: HTML, CSS, JavaScript (with EJS templating)
- Backend: Node.js with Express.js
- Database: PostgreSQL with Sequelize ORM
- Authentication: Session token with Passport Local Strategy
- HTTP Requests: Fetch API for server to API communication

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DayaaaanAK/SakibGadgetsInventory.git
```

2. Install dependencies:

```bash
cd server
npm install
```

3. Set up environment variables:

Create a .env file in the root directory.

Define the following variables:

```plaintext
PORT=
SESSION_SECRET=
APPKEY=
SECRETKEY=
POOL_URI=
INVOICE_API=
REDIRECT_URI=
```

4. Start the server:

```bash
npm start
```

5. Open your web browser and visit http://localhost:PORT (as specified in the environment variable) to access the application.

## Usage

- Admin Dashboard: Log in as an administrator to access the dashboard.
- Customer Management: Add and view customer details.
- Product Management: Add and view product information.
- Order Management: Create, view, and update orders. Generate invoice after creating order along with payment link.

## SQL Schema

![image](https://github.com/DayaaaanAK/SakibGadgetsInventory/assets/95142739/8cd920f1-2e55-4fb6-847f-075c425b5124)

