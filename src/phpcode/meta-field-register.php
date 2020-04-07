<?php

include_once('plugin_const.php');

function mytheme_blocks_register_meta() {

    register_meta('post', VggGutenConst::META_POST_FLD1, array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => false,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));     

    // будем держать в этом поле JSON массив с делами
    // JSON.stringify  /  JSON.parse
    // 
    //     "userId": 1,
    //     "id": 1,
    //     "title": "delectus aut autem",
    //     "completed": false
    //     
    register_meta('todo',  VggGutenConst::META_TODO_FLD1 , array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));     

    // VggGutenConst::NAMESPACE

}

add_action('init', 'mytheme_blocks_register_meta');

