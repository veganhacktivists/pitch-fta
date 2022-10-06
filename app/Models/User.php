<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $attributes = ['num_votes' => 2];

    protected $fillable = ['name', 'email', 'password'];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function ideas(): HasMany
    {
        return $this->hasMany(Idea::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    public function doodles(): HasMany
    {
        return $this->hasMany(Doodle::class);
    }

    public function answeredQuestions(): HasMany
    {
        return $this->hasMany(TriviaAnsweredQuestion::class);
    }

    public function scopeHasAccount(Builder $query, string $email): bool
    {
        return $query->where('email', $email)->exists();
    }

    public function awardVotes(int $numVotes)
    {
        return $this->increment('num_votes', $numVotes);
    }

    public function castVote(Idea $idea, int $numVotes = 1)
    {
        $numVotes = min($this->num_votes, $numVotes);

        if ($this->num_votes <= 0) {
            return;
        }

        $this->votes()->createMany(
            array_map(function ($ideaId) {
                return [
                    'idea_id' => $ideaId,
                ];
            }, array_fill(0, $numVotes, $idea->id))
        );

        self::where('id', $this->id)->decrement(
            'num_votes',
            min($this->num_votes, $numVotes)
        );
    }
}
