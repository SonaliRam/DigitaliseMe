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

	if ( is_front_page() ) {
		wp_enqueue_style(
			'dm-home',
			$uri . '/assets/css/home.css',
			array( 'dm-global' ),
			filemtime( $path . '/assets/css/home.css' )
		);
	}

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
		'dm_hero_desktop'  => __( 'Banner image: desktop (1920 x 1080 px)', 'digitaliseme' ),
		'dm_hero_tablet'   => __( 'Banner image: tablet (1024 x 1366 px)', 'digitaliseme' ),
		'dm_hero_mobile'   => __( 'Banner image: mobile (750 x 1334 px)', 'digitaliseme' ),
		'dm_about_1_desktop' => __( 'About image 1: desktop (840 x 1120 px)', 'digitaliseme' ),
		'dm_about_1_mobile'  => __( 'About image 1: mobile (640 x 800 px)', 'digitaliseme' ),
		'dm_about_2_desktop' => __( 'About image 2: desktop (840 x 920 px)', 'digitaliseme' ),
		'dm_about_2_mobile'  => __( 'About image 2: mobile (640 x 800 px)', 'digitaliseme' ),
		'dm_about_3_desktop' => __( 'About image 3: desktop (840 x 760 px)', 'digitaliseme' ),
		'dm_about_3_mobile'  => __( 'About image 3: mobile (640 x 800 px)', 'digitaliseme' ),
	);

	$industries = array(
		'a' => 'D2C Brands (600 x 880 px)',
		'b' => 'E-commerce (600 x 360 px)',
		'c' => 'Real Estate (1200 x 800 px)',
		'd' => 'Healthcare (600 x 360 px)',
		'e' => 'Lifestyle, circle (500 x 500 px)',
		'f' => 'Hospitality (1000 x 460 px)',
		'g' => 'Professional Services (1400 x 460 px)',
	);
	$images['dm_why_image'] = __( 'Why Digitalise Me image (1200 x 1400 px)', 'digitaliseme' );
	$images['dm_sub_banner_desktop'] = __( 'Sub banner: desktop (1920 x 600 px)', 'digitaliseme' );
	$images['dm_sub_banner_mobile']  = __( 'Sub banner: mobile (750 x 900 px)', 'digitaliseme' );
	$images['dm_hero_subject'] = __( 'Hero statue, transparent PNG/WebP (1920 x 1080 px)', 'digitaliseme' );
	$images['dm_cta_gif'] = __( 'CTA GIF, square (600 x 600 px)', 'digitaliseme' );
	$images['dm_process_image'] = __( 'Our Process image, square (1000 x 1000 px, shown at 500 x 500)', 'digitaliseme' );

	for ( $i = 1; $i <= dm_brand_count(); $i++ ) {
		// translators: %d: brand number.
		$images[ 'dm_brand_' . $i ] = sprintf( __( 'Brand logo %d (400 x 200 px)', 'digitaliseme' ), $i );
	}

	$platforms = array(
		'meta_ads'            => 'Meta Ads',
		'google_ads'          => 'Google Ads',
		'meta_business_suite' => 'Meta Business Suite',
		'shopify'             => 'Shopify',
		'woocommerce'         => 'WooCommerce',
		'wordpress'           => 'WordPress',
		'ga4'                 => 'Google Analytics 4',
		'search_console'      => 'Google Search Console',
		'canva'               => 'Canva',
		'figma'               => 'Figma',
	);
	foreach ( $platforms as $key => $name ) {
		// translators: %s: tool name.
		$images[ 'dm_platform_' . $key ] = sprintf( __( 'Platform logo: %s (144 x 144 px)', 'digitaliseme' ), $name );
	}

	foreach ( $industries as $key => $label ) {
		// translators: %s: industry name and image size.
		$images[ 'dm_industry_' . $key ] = sprintf( __( 'Industry image: %s', 'digitaliseme' ), $label );
	}

	for ( $i = 1; $i <= 6; $i++ ) {
		// translators: %d: service number.
		$images[ 'dm_service_' . $i . '_a' ] = sprintf( __( 'Service %d: image A (600 x 840 px)', 'digitaliseme' ), $i );
		// translators: %d: service number.
		$images[ 'dm_service_' . $i . '_b' ] = sprintf( __( 'Service %d: image B (600 x 760 px)', 'digitaliseme' ), $i );
	}

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

function dm_brand_count() {
	return 15;
}
