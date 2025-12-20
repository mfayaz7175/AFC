<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTutorialsTable extends Migration
{
    public function up()
    {
        Schema::create('tutorials', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            // video: one column for uploaded video file path, one for YouTube link
            $table->string('video')->nullable(); // will store the path to storage/app/public/tutorial/vid
            $table->string('youtube_link')->nullable();
            $table->string('profile_image'); // path to storage/app/public/tutorial/img
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tutorials');
    }
}
