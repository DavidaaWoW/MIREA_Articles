<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
            $table->uuid()->primary();
            $table->string('name')->nullable();
            $table->string('email')->unique();
            $table->string('code')->nullable();
            $table->tinyInteger('course')->nullable();
            $table->string('institute')->nullable();
            $table->string('faculty')->nullable();
            $table->string('group')->nullable();
            $table->string('role')->nullable();
            $table->string('phone')->unique()->nullable();
            $table->string('password_hash');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
