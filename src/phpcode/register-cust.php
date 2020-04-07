<?php

function cptui_register_my_cpts() {

/**
 * Post Type: Todo's.
 */

$labels = [
    "name" => __( "Todo's", "guten-vgg" ),
    "singular_name" => __( "Todo", "guten-vgg" ),
];

$args = [
    "label" => __( "Todo's", "guten-vgg" ),
    "labels" => $labels,
    "description" => "",
    "public" => true,
    "publicly_queryable" => true,
    "show_ui" => true,
    "show_in_rest" => true,
    "has_archive" => false,
    "show_in_menu" => true,
    "show_in_nav_menus" => true,
    "delete_with_user" => false,
    "exclude_from_search" => false,
    "capability_type" => "post",
    "map_meta_cap" => true,
    "hierarchical" => false,
    "query_var" => true,
    "supports" => [ "title", "editor", "thumbnail","author" ],
    "menu_icon" => "dashicons-editor-customchar"
];

register_post_type( "todo", $args );
}

add_action( 'init', 'cptui_register_my_cpts' );

