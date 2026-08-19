<?php
require_once __DIR__ . '/../config.php';
$orders = woo_get('orders', ['per_page'=>100, 'status'=>'any', 'orderby'=>'date', 'order'=>'desc']);
$products = woo_get('products', ['per_page'=>100, 'status'=>'publish']);
$customers = woo_get('customers', ['per_page'=>100]);
$revenue = 0.0; $pending = 0; $lowStock = 0; $outOfStock = 0;
foreach ($orders as $o) { $revenue += (float)($o['total'] ?? 0); if (in_array($o['status'] ?? '', ['pending','on-hold','processing'], true)) $pending++; }
foreach ($products as $p) { $q = $p['stock_quantity']; if ($q === null) continue; if ((int)$q <= 0) $outOfStock++; elseif ((int)$q <= 5) $lowStock++; }
json_response(['orders_count'=>count($orders),'customers_count'=>count($customers),'products_count'=>count($products),'revenue'=>round($revenue,2),'pending_orders'=>$pending,'low_stock'=>$lowStock,'out_of_stock'=>$outOfStock]);
