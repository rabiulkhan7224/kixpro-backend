# kixpro-backend

A modular e-commerce backend built with NestJS, TypeORM, PostgreSQL, Redis/BullMQ, Stripe, and Resend email delivery.

## Overview

This repository contains the backend API for the KixPro e-commerce platform. It exposes REST endpoints for users, authentication, products, collections, categories, brands, inventory, cart, orders, payments, shipping, reviews, notifications, media, and email processing.

Key technologies:
- NestJS 11
- TypeScript
- TypeORM
- PostgreSQL
- Redis + BullMQ
- JWT Authentication
- Swagger API docs
- Stripe payments
- Resend email integration

## Features

- User account management with registration, update, verification, and role handling
- JWT auth and secured routes
- Catalog modules: products, product variants, categories, collections, brands, medias
- Inventory management and stock tracking
- Shopping cart and order lifecycle support
- Payment processing module for Stripe integration
- Shipping and address management
- Reviews and product feedback
- Notifications and email queueing via BullMQ
- Global validation, serialization, logging, and exception handling

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` or create a new environment file.

Required variables:
- `NODE_ENV` (default: `development`)
- `PORT` (default: `3000`)
- `DATABASE_URL` or all of:
  - `DB_HOST`
  - `DB_PORT`
  - `DB_USERNAME`
  - `DB_PASSWORD`
  - `DB_NAME`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `APP_NAME` (optional)

Example `.env`:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=kixpro
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=no-reply@kixpro.com
APP_NAME=kixpro
```

### 3. Start the app in development

```bash
npm run start:dev
```

### 4. Access the application

- API Base Prefix: `http://localhost:3000/v1/api`
- Swagger UI: `http://localhost:3000/api`

> Note: `SwaggerModule` is configured and documentation is available at `/api`, while the REST routes are prefixed with `/v1/api`.

## Database & Migrations

This project uses TypeORM with Postgres. In development, `synchronize` is enabled automatically. In production, migrations should be applied before starting the app.

Available migration commands:

```bash
npm run migration:generate -- --name add_some_change
npm run migration:run
npm run migration:revert
npm run migration:show
```

## BullMQ and Redis

The backend registers BullMQ queues for
- `email`
- `notification`
- `orders`

Redis connection is configured from `REDIS_HOST` and `REDIS_PORT`.

## Available npm scripts

- `npm run build` — compile the project
- `npm run start` — run NestJS in production mode
- `npm run start:dev` — run with hot reload
- `npm run start:prod` — run migrations then start built app
- `npm run lint` — run ESLint and auto-fix
- `npm run test` — run Jest unit tests
- `npm run test:e2e` — run end-to-end tests
- `npm run test:cov` — run tests with coverage
- `npm run doc` — generate Compodoc documentation
- `npm run db:check` — run database health check script

## Project Structure

- `src/app.module.ts` — root application module
- `src/main.ts` — NestJS bootstrap and global middleware
- `src/auth/` — authentication, JWT, guards, and auth flows
- `src/users/` — user management and account APIs
- `src/products/` — product catalog and filtering
- `src/orders/` — order lifecycle and retrieval
- `src/payments/` — payment gateway integration
- `src/shipping/` — shipping and address handling
- `src/reviews/` — product review support
- `src/notifications/` — notification queue and delivery
- `src/email/` — email templates and sending logic
- `src/common/` — shared filters, interceptors, Redis, and utilities

## Notes

- Use `.env.development` or `.env.production` to maintain separate environment settings.
- In production, SSL for the database connection is enabled automatically when `NODE_ENV=production`.
- The project includes Swagger and global validation to keep API contracts explicit.

## Documentation

The repository contains generated documentation in `documentation/`.

To run Compodoc and serve docs locally:

```bash
npm run doc
```

## License

This repository is currently configured as `UNLICENSED` in `package.json`. Update the license metadata as needed for your project.
