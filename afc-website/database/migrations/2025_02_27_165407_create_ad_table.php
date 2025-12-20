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
        Schema::create('ad', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('kdkk');
            $table->longText('description');
            $table->string('image')->nullable();
            $table->decimal('price',10,2);
            $table->string('currency')->default('AF');
            $table->string('status')->default('pending');
            $table->string('location')->nullable();
            $table->string('expires_at');


            $table->foreignId('created_by')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('updated_by')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null'); 

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ad');
    }
};
