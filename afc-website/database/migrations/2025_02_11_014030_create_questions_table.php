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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
    
            $table->unsignedBigInteger('reference_id');
            
            $table->string('type'); // e.g., "four-answer" or "written"
            $table->unsignedInteger('num_questions')->default(1);
            $table->text('text');
            $table->text('correct_answer');
            // Use a JSON column for options; for written questions, this can be null
            $table->json('options')->nullable();
            $table->timestamps();


            $table->foreign('reference_id')
                  ->references('id')
                  ->on('references')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
