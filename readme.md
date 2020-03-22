**UDEMY course by Ali Alaa**

Gutenberg Blocks for WordPress and React Developers 

https://www.udemy.com/course/gutenberg/

original files: 

https://github.com/alialaa/gutenberg-course-blocks/tree/master



https://wordpress.org/support/topic/calling-render_callback-inside-register_block_type-in-oop/

I came to the following solution:
Because we’re in OOP, means inside a php class, the class needs to be addressed too, if we want to access the function. So we put the function into the “register_block_type” like this:

register_block_type('nebula/latest-posts',[
  'render_callback' => [$this, 'nebula_get_latest_post']
]



==================
Issue Overview
The block name is not passed as a parameter to the render_callback callback function. 
This means it's not possible to use a generic callback which performs routing to render dynamic blocks 
(for example, a generic handler which routes block rendering to theme template parts).


You can pass block name via attributes using filter in php's render_block function.

function pass_block_name_to_render( $block, $source_block ) {
	$block['attrs']['_name'] = $block['blockName'];
	return $block;
}

add_action( 'render_block_data', 'pass_block_name_to_render', 10, 2 );


============
DOC 
Creating dynamic blocks
https://developer.wordpress.org/block-editor/tutorials/block-tutorial/creating-dynamic-blocks/

https://developer.wordpress.org/block-editor/developers/filters/block-filters/#removing-blocks


https://pantheon.io/blog/webinar-recap-extending-gutenberg-josh-pollock


https://github.com/CalderaWP/Caldera-Forms


Пример регистрации своего rest api и получения постов
https://github.com/humanmade/hm-gutenberg-tools/blob/master/inc/endpoints/class-post-select-controller.php
https://github.com/humanmade/hm-gutenberg-tools




Стили
add_action( 'enqueue_block_assets', array( $this, 'blocks_assets' ) );
wp_register_style( 'kadence-blocks-rowlayout', KADENCE_BLOCKS_URL . 'dist/blocks/row.style.build.css', array(), KADENCE_BLOCKS_VERSION );


if ( ! wp_style_is( 'kadence-blocks-rowlayout', 'enqueued' ) ) {
			wp_enqueue_style( 'kadence-blocks-rowlayout' );
		}
		

add_action( 'plugins_loaded', 'kadence_blocks_init' );
	add_action( 'init', 'kadence_gutenberg_editor_assets' );
	wp_register_style( 'kadence-blocks-editor-css',