<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BadgeTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'icon_path',
        'completion_message',
        'badge_id',
        'permalink',
    ];

    protected $hidden = ['permalink'];

    public function badge(): BelongsTo
    {
        return $this->belongsTo(Badge::class);
    }
}
