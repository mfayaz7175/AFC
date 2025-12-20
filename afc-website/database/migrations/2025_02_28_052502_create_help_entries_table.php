<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHelpEntriesTable extends Migration
{
    public function up()
    {
        Schema::create('help_entries', function (Blueprint $table) {
            $table->id();
            $table->enum('entry_type', ['faq', 'troubleshooting']);
            $table->string('title', 255);
            $table->text('content');
            $table->string('user_email', 255)->nullable()->comment('Email of the user who inserted the question');
            $table->tinyInteger('status')->default(1)->comment('0: hidden, 1: displayed');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('help_entries');
    }
}
