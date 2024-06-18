<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('evenements', function (Blueprint $table) {
        $table->id();
        $table->string('description');
        $table->string('type');
        $table->string('localisation');
        $table->date('date');
        $table->decimal('prix', 8, 2);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('evenements');
    }
};
