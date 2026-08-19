# Kinbora Business App

Mobile-first business management system for Kinbora (`https://kinbora.com`).

## Goal

Manage the Kinbora e-commerce business from a phone while keeping the existing storefront separate and safe.

## Planned architecture

- `apps/mobile`: Expo + React Native + TypeScript business app
- `apps/web-admin`: optional responsive admin web panel
- `api`: PHP 8+ REST API for business-only application data and integration logic
- `docs`: setup, API, WooCommerce integration, and deployment documentation

## Integration principle

The existing Kinbora/WooCommerce store should remain the source of truth for products, customers, orders, inventory, coupons, reviews, payments, shipping, and refunds whenever the existing API supports those operations. Do not duplicate store data unnecessarily.

## Mobile access

The mobile app is designed for Android and iOS through Expo. The repository also contains a browser-friendly web admin path for situations where a desktop browser is more convenient.

## Security

Never commit real WooCommerce keys, database credentials, payment secrets, notification secrets, or other private credentials. Use environment variables and Replit Secrets/GitHub Actions Secrets.

## Development

The implementation should be built in phases:

1. Inspect existing Kinbora storefront and confirm WooCommerce/API capabilities.
2. Create the API integration layer.
3. Create authentication and role-based permissions.
4. Build dashboard, orders, products, inventory, customers, reports, and remaining business modules.
5. Add notifications, audit logs, exports, security hardening, and tests.
6. Verify mobile and API behavior before deployment.

## Mobile-first navigation

Dashboard, Orders, Products, Inventory, Customers, Reports, and More.

More includes Marketing, Coupons, Reviews, Returns, Suppliers, Purchase Orders, Expenses, Support, Staff, Notifications, Settings, and Audit Logs.
