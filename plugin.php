<?php
/* 
* Plugin Name: vgg-guten-blocks
* Plugin URI: https://alialaa.com/
* Description: Блоки Гутенберг от VGG.
* Author: Gayrat 
* Author URI 
*/

if ( ! defined( 'ABSPATH' )) {
    exit;
}

// include_once('src/phpcode/metabox.php');

include_once('src/phpcode/meta-field-register.php');
include_once('src/phpcode/plugin_const.php');
include_once('src/phpcode/register-cust.php');
include_once('src/phpcode/logfile.php');

function mytheme_blocks_categories( $categories, $post ){
    return array_merge(
        $categories, 
        array(
            array(
                'slug' => VggGutenConst::SLUG_THEME_CATEGORY,
                'title'=> __(VggGutenConst::CATEGORY_BLK_NAME, VggGutenConst::NAMESPACE),
                'icon' => VggGutenConst::CATEGORY_BLK_NAME_ICON
            )
        )
            );
}
add_filter('block_categories','mytheme_blocks_categories',10,2);

function mytheme_blocks_register_block_type($block, $options = array ()) {
    register_block_type(
        VggGutenConst::NAMESPACE . $block,
        array_merge(
            array(
                'editor_script' => VggGutenConst::NAMESPACE . '-editor-script',
                'editor_style' => VggGutenConst::NAMESPACE . '-editor-style',
                'script' => VggGutenConst::NAMESPACE .'-script',
                'style' => VggGutenConst::NAMESPACE . '-style'
            ),
            $options
        )
        

    );
}

function mytheme_blocks_enqueue_assets() {
    wp_enqueue_script(
        VggGutenConst::NAMESPACE . '-editor-js',
        plugins_url('dist/editor_script.js', __FILE__),
        array('wp-data', 'wp-plugins', 'wp-edit-post', 'wp-i18n', 'wp-components', 'wp-data', 'wp-compose')
    );
}

// Позволяет добавить стили или скрипты в редактор блоков (Гутенберг) на страницу редактирования записи
add_action('enqueue_block_editor_assets', 'mytheme_blocks_enqueue_assets');

function mytheme_blocks_register() { 
    
  	// automatically load dependencies and version
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'dist/editor_script.asset.php');
    _log( $asset_file ); 

    wp_register_script(
        VggGutenConst::NAMESPACE . '-editor-script',
        plugins_url('dist/editor.js', __FILE__),
        array('wp-blocks','wp-i18n', 'wp-element', 'wp-editor', 'wp-components','lodash','wp-blob','wp-data','wp-html-entities','wp-compose')
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
    
    
    mytheme_blocks_register_block_type(VggGutenConst::BLK_NAME_SECOND);
    mytheme_blocks_register_block_type(VggGutenConst::BLK_NAME_TEAM_MEMBER);
    mytheme_blocks_register_block_type(VggGutenConst::BLK_NAME_TEAM_MEMBERS);
    
    mytheme_blocks_register_block_type(VggGutenConst::BLK_NAME_LATEST_POSTS, 
    array(
            'render_callback' => 'mytheme_blocks_render_latest_posts_block',
            'attributes'=> array(
                'numberOfPosts' => array(
                    'type' => 'number',
                    'default'=> 5 
                ),
                'postCategories' => array(
                    'type'=>'string',
                )
            )
        )
    );
    mytheme_blocks_register_block_type(VggGutenConst::BLK_NAME_REDUX);
    mytheme_blocks_register_block_type(vggGutenConst::BLK_NAME_TODO_LIST);
    mytheme_blocks_register_block_type(VggGutenConst::BLK_NAME_TODO_LIST_COUNT);
    mytheme_blocks_register_block_type(VggGutenConst::BLK_NAME_META);
}

add_action('init', 'mytheme_blocks_register');

function mytheme_blocks_render_latest_posts_block($attributes){
    $args = array(
        'posts_per_page' => $attributes['numberOfPosts']
    );
    if($attributes['postCategories']) {
        $args['cat'] = $attributes['postCategories'];
    }
    $query = new WP_Query($args);
    $posts = '';

    if($query->have_posts()) {
        $posts .= '<ul class="wp-block-mytheme-blocks-latest-posts">';
        while ($query->have_posts()) {
            $query->the_post();
            $posts .= '<li><a href="' .esc_url(get_the_permalink()) . '">'
            . get_the_title() . '</a></li>';
        }
        $posts .= '</ul>';
        wp_reset_postdata();
        return $posts;
    } else {
        return '<div>' . __('No Posts Found', "mytheme-blocks") . '</div>';
    }
}

/*
function mytheme_blocks_register_post_template() {
    $post_type_object = get_post_type_object('post');
    $post_type_object->template = array(
        array('mytheme-blocks/meta'),
        array('core/paragraph', array(
            'content' => 'cljljlj'
        )),
        array(
            'mytheme-blocks/team-members',
            array(
                columns => 2
            ),
            array(
                array('mytheme-blocks/team-member', array('title'=>'ljljljl;j')),
                array('mytheme-blocks/team-member'),
            )
        )
    );
}

add_action('init', 'mytheme_blocks_register_post_template');
*/