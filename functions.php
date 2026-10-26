<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DM_VERSION', '1.0.0' );

function dm_theme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'digitaliseme' ),
			'footer'  => __( 'Footer Menu', 'digitaliseme' ),
		)
	);
}
add_action( 'after_setup_theme', 'dm_theme_setup' );
