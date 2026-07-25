<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;

class ChatbotController extends Controller
{
    public function respond(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'messages' => ['required', 'array', 'min:1'],
            'messages.*.role' => ['required', 'string', Rule::in(['system', 'user', 'assistant'])],
            'messages.*.content' => ['required', 'string'],
        ]);

        $apiKey = config('services.openrouter.key');

        if (! $apiKey) {
            return response()->json([
                'message' => 'AI chat service is not configured.',
            ], 500);
        }

        $response = Http::acceptJson()
            ->withToken($apiKey)
            ->withHeaders([
                'HTTP-Referer' => config('services.openrouter.site_url'),
                'X-OpenRouter-Title' => config('services.openrouter.site_name'),
            ])
            ->timeout(60)
            ->post(config('services.openrouter.url'), [
                'model' => config('services.openrouter.model'),
                'messages' => $validated['messages'],
                'temperature' => 0.3,
                'max_tokens' => 512,
            ]);

        $payload = $response->json();

        if ($response->failed()) {
            return response()->json([
                'message' => data_get($payload, 'error.message')
                    ?? data_get($payload, 'message')
                    ?? 'The AI provider request failed.',
            ], $response->status() ?: 502);
        }

        $reply = data_get($payload, 'choices.0.message.content');

        if (is_array($reply)) {
            $reply = collect($reply)
                ->map(fn ($part) => data_get($part, 'text', ''))
                ->filter()
                ->implode("\n");
        }

        if (! is_string($reply) || trim($reply) === '') {
            return response()->json([
                'message' => 'The AI provider returned an empty response.',
            ], 502);
        }

        return response()->json([
            'reply' => $reply,
        ]);
    }
}
