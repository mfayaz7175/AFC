<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSupportEmailsTable extends Migration
{
    public function up()
    {
        Schema::create('support_emails', function (Blueprint $table) {
            $table->id();
            $table->string('user_email'); // Automatically set from auth – not editable by the user
            $table->string('name');
            $table->string('category')->default('technical'); // technical, account, trading, or other
            $table->text('message');
            $table->string('attachment')->nullable(); // Files saved at storage/app/public/emailAttachments
            $table->boolean('read')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('support_emails');
    }
}
