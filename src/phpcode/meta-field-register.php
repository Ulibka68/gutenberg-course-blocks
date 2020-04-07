<?php

include_once('plugin_const.php');

function mytheme_blocks_register_meta() {

    register_meta('post', VggGutenConst::META_POST_FLD1, array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));     

    
    register_meta(
        'todo',  
        VggGutenConst::META_TODO_FLD1 , 
        array(
            'show_in_rest' => true,
            'type' => 'string',
            'single' => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback' => function() {
                return current_user_can('edit_posts');
            }
        )
    );     


}

add_action('init', 'mytheme_blocks_register_meta');

