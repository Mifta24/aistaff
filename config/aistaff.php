<?php

return [
    'locales' => ['id', 'en'],
    'default_locale' => 'id',

    'categories' => ['sales', 'finance', 'marketing', 'language', 'operations', 'support', 'hospitality', 'legal'],

    // Local LLM (OpenAI-compatible: LM Studio, Ollama, llama.cpp, vLLM...)
    'llm' => [
        'base_url' => env('LLM_BASE_URL', 'http://127.0.0.1:1234/v1'),
        'model' => env('LLM_MODEL', 'local-model'),
        'api_key' => env('LLM_API_KEY'),
        'timeout' => (int) env('LLM_TIMEOUT', 120),
        'temperature' => (float) env('LLM_TEMPERATURE', 0.6),
        'max_tokens' => (int) env('LLM_MAX_TOKENS', 1024),
        'max_history' => 20,
        'max_message_chars' => 4000,
    ],
];
