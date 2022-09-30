<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TriviaAnswerFactory extends Factory
{
    public function definition()
    {
        return [
            'text' => fake()->sentence(),
            'is_correct' => false,
        ];
    }
}
