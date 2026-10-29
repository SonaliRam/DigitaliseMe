<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DM_VERSION', '1.0.0' );

function dm_theme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
	register_nav_menus(
		array(
			'header-left'     => __( 'Header Left', 'digitaliseme' ),
			'header-right'    => __( 'Header Right', 'digitaliseme' ),
			'footer-services' => __( 'Footer Services', 'digitaliseme' ),
			'footer-company'  => __( 'Footer Company', 'digitaliseme' ),
			'footer-legal'    => __( 'Footer Legal', 'digitaliseme' ),
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

	wp_enqueue_style(
		'dm-layout',
		$uri . '/assets/css/layout.css',
		array( 'dm-global' ),
		filemtime( $path . '/assets/css/layout.css' )
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
	$fonts = array( 'inter-tight-latin-800-normal.woff2', 'poppins-latin-400-normal.woff2' );
	foreach ( $fonts as $font ) {
		if ( ! file_exists( get_template_directory() . '/assets/fonts/' . $font ) ) {
			continue;
		}
		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( get_template_directory_uri() . '/assets/fonts/' . $font )
		);
	}
}
add_action( 'wp_head', 'dm_preload_fonts', 1 );

function dm_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'dm_theme_options',
		array(
			'title'    => __( 'Digitalise Me Theme', 'digitaliseme' ),
			'priority' => 30,
		)
	);

	$images = array(
		'dm_logo_header'   => __( 'Header logo (360 x 96 px)', 'digitaliseme' ),
		'dm_logo_footer'   => __( 'Footer logo (240 x 72 px)', 'digitaliseme' ),
		'dm_logo_wordmark' => __( 'Footer wordmark logo (1600 x 240 px)', 'digitaliseme' ),
	);

	foreach ( $images as $id => $label ) {
		$wp_customize->add_setting( $id, array( 'sanitize_callback' => 'esc_url_raw' ) );
		$wp_customize->add_control(
			new WP_Customize_Image_Control(
				$wp_customize,
				$id,
				array(
					'label'   => $label,
					'section' => 'dm_theme_options',
				)
			)
		);
	}

	$wp_customize->add_setting(
		'dm_footer_tagline',
		array(
			'default'           => __( 'Marketing Tied to Revenue, Not Just Reach.', 'digitaliseme' ),
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'dm_footer_tagline',
		array(
			'label'   => __( 'Footer tagline', 'digitaliseme' ),
			'section' => 'dm_theme_options',
			'type'    => 'text',
		)
	);

	foreach ( dm_social_networks() as $id => $network ) {
		$wp_customize->add_setting( 'dm_social_' . $id, array( 'sanitize_callback' => 'esc_url_raw' ) );
		$wp_customize->add_control(
			'dm_social_' . $id,
			array(
				// translators: %s: social network name.
				'label'   => sprintf( __( '%s URL', 'digitaliseme' ), $network['label'] ),
				'section' => 'dm_theme_options',
				'type'    => 'url',
			)
		);
	}
}
add_action( 'customize_register', 'dm_customize_register' );

function dm_image_url( $setting, $placeholder ) {
	$url = get_theme_mod( $setting );
	if ( $url ) {
		return $url;
	}
	return get_template_directory_uri() . '/assets/images/placeholders/' . $placeholder;
}

function dm_social_networks() {
	return array(
		'instagram' => array(
			'label' => 'Instagram',
			'icon'  => '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
		),
		'linkedin'  => array(
			'label' => 'LinkedIn',
			'icon'  => '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/></svg>',
		),
		'facebook'  => array(
			'label' => 'Facebook',
			'icon'  => '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M14 8h3V4h-3c-2.76 0-5 2.24-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9c0-.55.45-1 1-1z"/></svg>',
		),
	);
}

function dm_img_label( $setting, $label, $width, $height, $classes = '' ) {
	if ( get_theme_mod( $setting ) ) {
		return;
	}
	$size = absint( $width ) . ' x ' . absint( $height ) . ' px';
	printf(
		'<span class="img-label %1$s" aria-hidden="true">%2$s</span>',
		esc_attr( $classes ),
		esc_html( $label ? $label . ' · ' . $size : $size )
	);
}

function dm_menu( $location, $class ) {
	if ( ! has_nav_menu( $location ) ) {
		return;
	}
	wp_nav_menu(
		array(
			'theme_location' => $location,
			'container'      => false,
			'menu_class'     => $class,
			'depth'          => 1,
			'fallback_cb'    => false,
		)
	);
}

function dm_contact_url() {
	$page = get_page_by_path( 'contact-us' );
	return $page ? get_permalink( $page ) : home_url( '/contact-us/' );
}
