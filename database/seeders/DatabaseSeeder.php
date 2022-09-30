<?php

namespace Database\Seeders;

use App\Models\TriviaAnswer;
use App\Models\TriviaQuestion;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        TriviaQuestion::factory(10)
            ->has(
                TriviaAnswer::factory()->state(['is_correct' => true]),
                'answers'
            )
            ->has(TriviaAnswer::factory(3), 'answers')
            ->create();
    }
}
