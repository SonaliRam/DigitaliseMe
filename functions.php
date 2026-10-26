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

function dm_enqueue_assets() {
	$uri  = get_template_directory_uri();
	$path = get_template_directory();

	wp_enqueue_style(
		'dm-global',
		$uri . '/assets/css/global.css',
		array(),
		filemtime( $path . '/assets/css/global.css' )
	);

	wp_enqueue_script(
		'gsap',
		$uri . '/assets/js/vendor/gsap.min.js',
		array(),
		'3.15.0',
		array( 'in_footer' => true, 'strategy' => 'defer' )
	);

	wp_enqueue_script(
		'gsap-scrolltrigger',
		$uri . '/assets/js/vendor/ScrollTrigger.min.js',
		array( 'gsap' ),
		'3.15.0',
		array( 'in_footer' => true, 'strategy' => 'defer' )
	);

	wp_enqueue_script(
		'dm-main',
		$uri . '/assets/js/main.js',
		array( 'gsap', 'gsap-scrolltrigger' ),
		filemtime( $path . '/assets/js/main.js' ),
		array( 'in_footer' => true, 'strategy' => 'defer' )
	);
}
add_action( 'wp_enqueue_scripts', 'dm_enqueue_assets' );

function dm_preload_fonts() {
	$fonts = array( 'jost-latin-700-normal.woff2', 'poppins-latin-400-normal.woff2' );
	foreach ( $fonts as $font ) {
		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( get_template_directory_uri() . '/assets/fonts/' . $font )
		);
	}
}
add_action( 'wp_head', 'dm_preload_fonts', 1 );

