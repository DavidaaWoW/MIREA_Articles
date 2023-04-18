<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/profile');

        $response->assertOk();
    }

    public function test_profile_information_can_be_filled(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/personal_information', [
                'name' => 'Фамилия Имя',
                'code' => '20И2837',
                'course' => '3',
                'institute' => 'ИТ',
                'faculty' => 'ИППО',
                'group' => 'ИКБО-10-20',
                'phone' => '80000000000',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/dashboard');

        $user->refresh();

        $this->assertSame('Фамилия Имя', $user->name);
        $this->assertSame('20И2837', $user->code);
        $this->assertSame(3, $user->course);
        $this->assertSame('ИТ', $user->institute);
        $this->assertSame('ИППО', $user->faculty);
        $this->assertSame('ИКБО-10-20', $user->group);
        $this->assertSame('80000000000', $user->phone);
    }

    public function test_profile_information_can_be_updated(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
    }

    public function test_user_can_delete_their_account(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete('/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function test_correct_password_must_be_provided_to_delete_account(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect('/profile');

        $this->assertNotNull($user->fresh());
    }

    public function test_can_view_another_profile(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/another_profile/'.$user2->id);

        $response->assertOk();
    }
}
