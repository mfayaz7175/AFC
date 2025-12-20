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
        Schema::create('notifies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('message');
            $table->string('target');
            $table->string('email');
            // Add the schedule column as a datetime, nullable if desired.
            $table->dateTime('schedule')->nullable();
            $table->string('expires_at');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifies');
    }
};
