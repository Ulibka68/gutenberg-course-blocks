<?php

function mytheme_blocks_register_meta() {
    register_meta('post', '_mytheme_blocks_post_subtitle', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => false,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));     
}

add_action('init', 'mytheme_blocks_register_meta');

