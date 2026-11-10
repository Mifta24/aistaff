<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('category')->index();
            $table->string('icon')->default('sparkles');
            $table->string('color')->default('violet');
            $table->json('name');
            $table->json('tagline');
            $table->json('description');
            $table->json('skills');
            $table->json('starters');
            $table->text('system_prompt');
            $table->unsignedTinyInteger('level_min')->default(1);
            $table->unsignedTinyInteger('level_max')->default(3);
            $table->decimal('price', 8, 2)->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('active')->default(true);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agents');
    }
};
