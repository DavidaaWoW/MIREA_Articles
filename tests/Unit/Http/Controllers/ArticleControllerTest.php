<?php

namespace Http\Controllers;

use App\Http\Controllers\ArticleController;
use App\Models\Article;
use App\Models\User;
use Database\Factories\ArticleFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleControllerTest extends TestCase
{

    use RefreshDatabase;

    public function testAddSingleArticle()
    {
        $user = User::factory()->create();
        $article = Article::factory()->create();
//        fwrite(STDERR, print_r($article, TRUE));
        $response = $this->actingAs($user)->post('add_article', [
            'title' => fake()->sentence(),
            'file_dir' => fake()->word(),
            'indexability' => "РИНЦ",
            'udc' => "00".fake()->randomDigitNotNull().".".fake()->randomDigitNotNull(),
            'scientific_adviser' => fake('ru_RU')->lastName().' '.fake('ru_RU')->randomLetter().'. '.fake('ru_RU')->randomLetter().'.',
            'publication_place' => fake('ru_RU')->sentence(),
            'verification_status' => 'accepted',
            'user_id' => $user->id
        ]);

        $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/personal_information');
    }

    public function testGetArticlesByUDC()
    {
        $user = User::factory()->create();
        $article = Article::factory()->create();
        $response = $this->actingAs($user)->get('/articles/'.$article->udc);

        $response
            ->assertSessionHasNoErrors();
    }

    public function testGetArticlesOnReview()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $article = Article::factory()->create();
        $response = $this->actingAs($user)->get('/articles_on_review');

        $response
            ->assertSessionHasNoErrors();
    }

    public function testChangeArticleStatus()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $article = Article::factory()->create(['verification_status' => 'on_review']);

        $response = $this->actingAs($user)->post('/change_article_status', [
            'id' => $article->id,
            'result' => 'accepted'
        ]);

        $response
            ->assertSessionHasNoErrors();

        $article->refresh();

        $this->assertSame('accepted', $article->verification_status);
    }

    public function testSearchArticle()
    {
        $user = User::factory()->create();
        $article = Article::factory()->create();
        $response = $this->actingAs($user)->get('/search');

        $response
            ->assertSessionHasNoErrors();
    }

    public function testDownloadFile()
    {
        $user = User::factory()->create();
        $article = Article::factory()->create();
        $response = $this->actingAs($user)->get('/download/'.$article->id);

        $response
            ->assertSessionHasNoErrors();
    }

    public function testAddArticleZIP()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/add_article_zip', [
            'title' => fake()->words(3),
            'indexability' => 'РИНЦ'
        ]);

        $response
            ->assertSessionHasNoErrors();
    }

    public function testGetSingleArticle()
    {
        $user = User::factory()->create();
        $article = Article::factory()->create();
        $response = $this->actingAs($user)->get('/single_article/'.$article->id);

        $response
            ->assertSessionHasNoErrors();
    }

    public function testGetArticleByProfileId()
    {
        $user = User::factory()->create();
        $article = Article::factory()->create();
        $response = $this->actingAs($user)->get('/profile/my_articles');

        $response
            ->assertSessionHasNoErrors();
    }
}
