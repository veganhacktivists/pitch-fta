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
        Schema::table('badges', function (Blueprint $table) {
            $table->unsignedInteger('num_votes')->default(0);
        });
        Schema::table('badge_tasks', function (Blueprint $table) {
            $table->unsignedInteger('num_votes')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('badges', function (Blueprint $table) {
            $table->dropColumn('num_votes');
        });
        Schema::table('badge_tasks', function (Blueprint $table) {
            $table->dropColumn('num_votes');
        });
    }
};
