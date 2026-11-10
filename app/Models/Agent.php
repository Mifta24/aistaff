<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    protected $guarded = [];

    protected $casts = [
        'name' => 'array',
        'tagline' => 'array',
        'description' => 'array',
        'skills' => 'array',
        'starters' => 'array',
        'featured' => 'boolean',
        'active' => 'boolean',
        'price' => 'float',
    ];

    /** Flatten translatable fields for a locale (fallback: id). */
    public function toLocale(string $locale, bool $full = false): array
    {
        $t = fn ($v) => $v[$locale] ?? $v['id'] ?? (is_array($v) ? reset($v) : $v);

        $data = [
            'slug' => $this->slug,
            'category' => $this->category,
            'icon' => $this->icon,
            'color' => $this->color,
            'name' => $t($this->name),
            'tagline' => $t($this->tagline),
            'level_min' => $this->level_min,
            'level_max' => $this->level_max,
            'price' => $this->price,
            'featured' => $this->featured,
            'starters' => $t($this->starters),
        ];

        if ($full) {
            $data += [
                'description' => $t($this->description),
                'skills' => $t($this->skills),
            ];
        }

        return $data;
    }
}
