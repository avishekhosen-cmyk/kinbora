# Kinbora Business API

PHP 8+ REST API integration layer for the Kinbora Business mobile app.

## Environment

Copy `.env.example` to `.env` and configure:

- `WOOCOMMERCE_BASE_URL`
- `WOOCOMMERCE_CONSUMER_KEY`
- `WOOCOMMERCE_CONSUMER_SECRET`
- `APP_API_KEY`

Never commit real credentials.

## Endpoints

- `GET /health.php`
- `GET /api/products.php`
- `GET /api/orders.php`
- `GET /api/customers.php`

The API proxies read-only WooCommerce data first. Write operations should be added only after authentication, role authorization, validation, audit logging, and webhook/idempotency handling are implemented.
