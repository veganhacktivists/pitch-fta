<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TriviaQuestionFactory extends Factory
{
    public function definition()
    {
        return [
            'text' => substr(fake()->sentence(), 0, -1) . '?',
        ];
    }
}
