<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->text(20),
            'description' => $this->faker->text(30),
            'adult_price' => $this->random_int(800, 1600),
            'kid_price' => $this->random_int(400, 800),
            'pier_price' => $this->random_int(1200, 1800),
        ];
    }
}
