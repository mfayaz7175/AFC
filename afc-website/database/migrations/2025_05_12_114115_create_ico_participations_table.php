<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ico_participations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('wallet_address');
            $table->decimal('eth_amount', 18, 8);
            $table->decimal('afcoin_amount', 18, 8);
            $table->decimal('rate', 18, 8);
            $table->string('tx_hash')->unique();
            $table->enum('status', ['pending', 'confirmed', 'failed'])->default('confirmed');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ico_participations');
    }
};
