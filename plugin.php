<?php
/* 
* Plugin Name: VGG gutenberg learn blocks
* Plugin URI: https://alialaa.com/
* Description: Набор первых учебных блоков Гутенберг
* Author: alialla 
* Author URI https://alialaa.com/
*/

if ( ! defined( 'ABSPATH' )) {
    exit;
}

require_once ('plugin_const.php');

function mytheme_blocks_categories( $categories, $post ){
    return array_merge(
        $categories, 
        array(
            array(
                'slug' => VggGutenConst::SLUG_THEME_CATEGORY ,
                'title'=> __(VggGutenConst::THEME_CATEGORY, VggGutenConst::TRANSLATION_DOMAIN),
                'icon' => 'palmtree'
             )
        )
            );
}
// Позволяет добавить/удалить/изменить категории блоков Gutenberg.
add_filter('block_categories','mytheme_blocks_categories',10,2);

function mytheme_blocks_register_block_type($block, $options = array ()) {
    register_block_type(
        VggGutenConst::NAMESPACE . '/' .$block,
        array_merge(
            array(
                'editor_script' => VggGutenConst::NAMESPACE . '-editor-script',
                'editor_style' => VggGutenConst::NAMESPACE . '-editor-style',
                'script' => VggGutenConst::NAMESPACE . '-script',
                'style' => VggGutenConst::NAMESPACE . '-style'
            ),
            $options
        )
        

    );
}



function mytheme_blocks_register() { 
    
    wp_register_script(
        VggGutenConst::NAMESPACE . '-editor-script',
        plugins_url('dist/editor.js', __FILE__),
        array('wp-blocks','wp-i18n', 'wp-element', 'wp-editor', 'wp-components','lodash')
    );

    wp_register_script(
        VggGutenConst::NAMESPACE . '-script',
        plugins_url('dist/script.js', __FILE__),
        array('jquery')
    );

    wp_register_style(
        VggGutenConst::NAMESPACE . '-editor-style',
        plugins_url('dist/editor.css', __FILE__),
        array('wp-edit-blocks')   
    );
    
    wp_register_style(
        VggGutenConst::NAMESPACE . '-style',
        plugins_url('dist/style.css', __FILE__)
    );
    
    // mytheme_blocks_register_block_type('firstblock');
    mytheme_blocks_register_block_type('secondblock');
}

add_action('init', 'mytheme_blocks_register');