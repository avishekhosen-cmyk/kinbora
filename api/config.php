<?php
declare(strict_types=1);

function env_value(string $name): string {
    $value = getenv($name);
    return $value === false ? '' : trim($value);
}

function json_response(mixed $data, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function require_app_key(): void {
    $expected = env_value('APP_API_KEY');
    if ($expected === '') return;
    $provided = $_SERVER['HTTP_X_API_KEY'] ?? '';
    if (!hash_equals($expected, $provided)) json_response(['error' => 'Unauthorized'], 401);
}

function woo_get(string $resource, array $query = []): array {
    $base = rtrim(env_value('WOOCOMMERCE_BASE_URL'), '/');
    $key = env_value('WOOCOMMERCE_CONSUMER_KEY');
    $secret = env_value('WOOCOMMERCE_CONSUMER_SECRET');
    if ($base === '' || $key === '' || $secret === '') {
        json_response(['error' => 'WooCommerce integration is not configured'], 503);
    }
    $url = $base . '/wp-json/wc/v3/' . ltrim($resource, '/');
    if ($query) $url .= '?' . http_build_query($query);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
        CURLOPT_USERPWD => $key . ':' . $secret,
        CURLOPT_HTTPHEADER => ['Accept: application/json'],
    ]);
    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    if ($body === false || $error !== '') json_response(['error' => 'WooCommerce request failed'], 502);
    $data = json_decode($body, true);
    if ($code < 200 || $code >= 300) json_response(['error' => 'WooCommerce returned an error', 'status' => $code], $code >= 400 && $code < 600 ? $code : 502);
    return is_array($data) ? $data : [];
}

require_app_key();
