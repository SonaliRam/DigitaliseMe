<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="screen-reader-text skip-link" href="#main"><?php esc_html_e( 'Skip to content', 'digitaliseme' ); ?></a>

<header class="site-header" data-header>
	<div class="site-header__inner">
		<nav class="site-header__nav" aria-label="<?php esc_attr_e( 'Primary', 'digitaliseme' ); ?>">
			<?php dm_menu( 'header-left', 'nav-group' ); ?>
		</nav>

		<a class="site-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<img src="<?php echo esc_url( dm_image_url( 'dm_logo_header', 'logo-header.svg' ) ); ?>" width="180" height="48" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
			<?php dm_img_label( 'dm_logo_header', 'Logo', 360, 96, 'img-label--center' ); ?>
		</a>

		<div class="site-header__nav site-header__nav--right">
			<nav aria-label="<?php esc_attr_e( 'Secondary', 'digitaliseme' ); ?>">
				<?php dm_menu( 'header-right', 'nav-group' ); ?>
			</nav>
			<a class="primary-btn site-header__cta" href="<?php echo esc_url( dm_contact_url() ); ?>">
				<?php esc_html_e( 'Get in Touch', 'digitaliseme' ); ?>
			</a>
		</div>

		<button class="nav-toggle" type="button" aria-label="<?php esc_attr_e( 'Open menu', 'digitaliseme' ); ?>" aria-expanded="false" aria-controls="mobile-menu" data-nav-toggle>
			<span></span><span></span>
		</button>
	</div>

	<nav class="mobile-menu" id="mobile-menu" aria-label="<?php esc_attr_e( 'Mobile', 'digitaliseme' ); ?>">
		<?php dm_menu( 'header-left', 'mobile-menu__list' ); ?>
		<?php dm_menu( 'header-right', 'mobile-menu__list' ); ?>
		<a class="primary-btn" href="<?php echo esc_url( dm_contact_url() ); ?>"><?php esc_html_e( 'Get in Touch', 'digitaliseme' ); ?></a>
	</nav>
</header>
