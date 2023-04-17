<?php

namespace Http\Controllers;

use App\Http\Controllers\FeedbackController;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class FeedbackControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testAddFeedback()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/add_feedback', [
            'message' => fake('ru_RU')->words(20),
            'user_id' => $user->id
        ]);

        $response
            ->assertSessionHasNoErrors();
    }

    public function testGetFeedback()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $feedback = Feedback::factory()->create();

        $response = $this->actingAs($user)->get('/feedback_list');

        $response
            ->assertSessionHasNoErrors();
    }
}
