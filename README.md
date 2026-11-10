# AI Staff (working name)

Laravel 12 + React (Inertia) + Tailwind 4. Bilingual (ID/EN), AI staff catalog + streaming demo chat to a local OpenAI-compatible LLM.

## Run
    export PATH=/opt/plesk/php/8.4/bin:$PATH
    composer install && npm install
    cp .env.example .env && php artisan key:generate
    php artisan migrate --seed --seeder=AgentSeeder
    npm run dev   # or npm run build
    php artisan serve

## Local LLM (.env)
    LLM_BASE_URL=http://127.0.0.1:1234/v1   # LM Studio / Ollama (/v1) / llama.cpp / vLLM
    LLM_MODEL=<model id from GET /v1/models>
    LLM_API_KEY=                            # optional

Add/edit agents in `database/seeders/AgentSeeder.php` (translatable JSON fields id/en), then `php artisan db:seed --class=AgentSeeder`.
Chat endpoint: `POST /{locale}/agents/{slug}/chat` (SSE, throttled 12/min/IP).
