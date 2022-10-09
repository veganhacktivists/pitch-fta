<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('badge_tasks', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('badge_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->timestamps();
            $table->string('title');
            $table->string('description');
            $table->string('completion_message')->nullable();
            $table->string('icon_path');
            $table->string('permalink')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('badge_tasks');
    }
};
