<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Badge extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'completion_message',
        'icon_path',
        'num_votes',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(BadgeTask::class);
    }
}
