<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TriviaAnswer extends Model
{
    use HasFactory;

    protected $hidden = ['is_correct'];

    public function question(): BelongsTo
    {
        return $this->belongsTo(TriviaQuestion::class);
    }
}
