<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<section class="hero" aria-labelledby="hero-title">
	<div class="hero__bg" data-hero-bg>
		<picture>
			<source media="(max-width: 767px)" srcset="<?php echo esc_url( dm_image_url( 'dm_hero_mobile', 'hero-mobile.svg' ) ); ?>" width="750" height="1334">
			<source media="(max-width: 1024px)" srcset="<?php echo esc_url( dm_image_url( 'dm_hero_tablet', 'hero-tablet.svg' ) ); ?>" width="1024" height="1366">
			<img src="<?php echo esc_url( dm_image_url( 'dm_hero_desktop', 'hero-desktop.svg' ) ); ?>" width="1920" height="1080" alt="" fetchpriority="high">
		</picture>
		<?php if ( ! get_theme_mod( 'dm_hero_subject' ) ) : ?>
			<?php dm_img_label( 'dm_hero_desktop', 'Hero banner desktop', 1920, 1080, 'img-label--center show-desktop' ); ?>
			<?php dm_img_label( 'dm_hero_tablet', 'Hero banner tablet', 1024, 1366, 'img-label--center show-tablet' ); ?>
			<?php dm_img_label( 'dm_hero_mobile', 'Hero banner mobile', 750, 1334, 'img-label--center show-mobile' ); ?>
		<?php endif; ?>
	</div>

	<h1 class="hero__title display-title page-width-medium" id="hero-title">
		<span class="hero__line"><span data-hero-line><?php esc_html_e( 'Grow', 'digitaliseme' ); ?></span> <span class="text-orange" data-hero-line><?php esc_html_e( 'Louder.', 'digitaliseme' ); ?></span></span>
	</h1>

	<?php if ( get_theme_mod( 'dm_hero_subject' ) ) : ?>
		<div class="hero__subject" data-hero-subject>
			<img src="<?php echo esc_url( get_theme_mod( 'dm_hero_subject' ) ); ?>" width="1920" height="1080" alt="" fetchpriority="high">
		</div>
	<?php endif; ?>

	<div class="hero__bottom page-width-medium">
		<div class="hero__intro" data-hero-fade>
			<p class="eyebrow"><?php esc_html_e( 'Digital Marketing Agency', 'digitaliseme' ); ?></p>
			<p><?php esc_html_e( 'Strategy, creativity and performance marketing that turn attention into real revenue.', 'digitaliseme' ); ?></p>
			<a class="primary-btn" href="<?php echo esc_url( dm_contact_url() ); ?>"><?php esc_html_e( 'Book a Strategy Call', 'digitaliseme' ); ?></a>
		</div>
		<div class="glass-card" data-hero-fade>
			<h6><?php esc_html_e( 'Built Around ROAS', 'digitaliseme' ); ?></h6>
			<p><?php esc_html_e( 'Campaigns measured by revenue, not impressions.', 'digitaliseme' ); ?></p>
		</div>
	</div>
</section>
