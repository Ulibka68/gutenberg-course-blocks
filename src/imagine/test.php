<?php

// include composer autoload
require 'vendor/autoload.php';

// import the Intervention Image Manager Class
use Intervention\Image\ImageManager ;
// create an image manager instance with favored driver
$manager = new ImageManager(array('driver' => 'imagick'));

$manager->make('2.jpg')->widen(1600)->save('bar.webp',60);
$manager->make('2.jpg')->widen(1600)->save('bar.jpg',60);
$manager->make('2.jpg')->widen(1600)->limitColors(255)->save('bar.png',60);
