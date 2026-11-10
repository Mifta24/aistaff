<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteController extends Controller
{
    public function root(Request $request)
    {
        $locale = $request->getPreferredLanguage(config('aistaff.locales')) ?: config('aistaff.default_locale');

        return redirect("/{$locale}");
    }

    public function home(string $locale)
    {
        $agents = Agent::where('active', true)->orderBy('sort')->get();

        return Inertia::render('home', [
            'agents' => $agents->map->toLocale($locale)->values(),
        ]);
    }

    public function agents(Request $request, string $locale)
    {
        $agents = Agent::where('active', true)->orderBy('sort')->get();

        return Inertia::render('agents/index', [
            'agents' => $agents->map->toLocale($locale)->values(),
            'categories' => $agents->pluck('category')->unique()->values(),
            'filters' => ['q' => $request->string('q')->toString(), 'category' => $request->string('category')->toString()],
        ]);
    }

    public function show(string $locale, string $slug)
    {
        $agent = Agent::where('active', true)->where('slug', $slug)->firstOrFail();
        $related = Agent::where('active', true)->where('slug', '!=', $slug)
            ->orderByRaw('category = ? desc', [$agent->category])->orderBy('sort')->limit(3)->get();

        return Inertia::render('agents/show', [
            'agent' => $agent->toLocale($locale, true),
            'related' => $related->map->toLocale($locale)->values(),
        ]);
    }
}
