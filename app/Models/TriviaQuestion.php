<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Query\Builder as QueryBuilder;

class TriviaQuestion extends Model
{
    use HasFactory;

    public function answers(): HasMany
    {
        return $this->hasMany(TriviaAnswer::class);
    }

    public function scopeWhereNotAnsweredBy(Builder $query, User $user)
    {
        return $query->whereNotExists(function (QueryBuilder $q) use ($user) {
            $q->select('id')
                ->from('trivia_answered_questions')
                ->where('trivia_answered_questions.user_id', $user->id)
                ->whereColumn(
                    'trivia_answered_questions.trivia_question_id',
                    'trivia_questions.id'
                );
        });
    }
}
