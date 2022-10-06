<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table
                ->string('referral_code', 4)
                ->nullable()
                ->unique();
        });

        DB::table('users')->update([
            'referral_code' => DB::raw('(SUBSTR(MD5(RAND()), 1, 4))'),
        ]);

        Schema::table('users', function (Blueprint $table) {
            $table
                ->string('referral_code', 4)
                ->nullable(false)
                ->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('referral_code');
        });
    }
};
