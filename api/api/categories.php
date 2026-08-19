<?php
require_once __DIR__ . '/../config.php';
json_response(woo_get('products/categories', ['per_page'=>100, 'orderby'=>'name', 'order'=>'asc']));
