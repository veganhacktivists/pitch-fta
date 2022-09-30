<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TriviaAnsweredQuestion extends Model
{
    use HasFactory;

    protected $fillable = ['trivia_question_id', 'trivia_answer_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(TriviaQuestion::class);
    }

    public function answer(): BelongsTo
    {
        return $this->belongsTo(TriviaAnswer::class);
    }
}
