<?php
require_once __DIR__ . '/../config.php';
$page = max(1, (int)($_GET['page'] ?? 1));
$perPage = min(100, max(1, (int)($_GET['per_page'] ?? 25)));
$search = trim((string)($_GET['search'] ?? ''));
$query = ['page' => $page, 'per_page' => $perPage];
if ($search !== '') $query['search'] = $search;
json_response(woo_get('products', $query));
