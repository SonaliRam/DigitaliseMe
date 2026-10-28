<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$dm_about_page = get_page_by_path( 'about-us' );
$dm_about_url  = $dm_about_page ? get_permalink( $dm_about_page ) : home_url( '/about-us/' );

$dm_about_cards = array(
	array(
		'word'   => __( 'Growth', 'digitaliseme' ),
		'height' => 1120,
	),
	array(
		'word'   => __( 'Develop', 'digitaliseme' ),
		'height' => 920,
	),
	array(
		'word'   => __( 'Design', 'digitaliseme' ),
		'height' => 760,
	),
);
?>
<section class="about section" aria-labelledby="about-title">
	<div class="page-width-medium">
		<div class="about__top">
			<h2 id="about-title" data-about-reveal><?php esc_html_e( 'About Us', 'digitaliseme' ); ?></h2>

			<div class="about__intro" data-about-reveal>
				<p class="eyebrow"><?php esc_html_e( 'Who We Are', 'digitaliseme' ); ?></p>
				<p><?php esc_html_e( 'We work with brands that want marketing tied to revenue, not just reach. Founded in [year], Digitalise Me has grown from [origin story] into a full-service digital marketing agency for D2C, e-commerce, real estate, and lifestyle brands across India, the UAE, and the UK.', 'digitaliseme' ); ?></p>
			</div>

			<a class="secondary-btn about__cta" href="<?php echo esc_url( $dm_about_url ); ?>" data-about-reveal>
				<?php esc_html_e( 'About Us', 'digitaliseme' ); ?>
			</a>
		</div>
	</div>

	<div class="page-width-medium about__slider">
		<div class="about__cards" data-about-track>
			<?php foreach ( $dm_about_cards as $dm_i => $dm_card ) : ?>
				<?php $dm_n = $dm_i + 1; ?>
				<button class="about-card" type="button" aria-pressed="false">
					<picture>
						<source media="(max-width: 767px)" srcset="<?php echo esc_url( dm_image_url( 'dm_about_' . $dm_n . '_mobile', 'about-' . $dm_n . '-mobile.svg' ) ); ?>" width="640" height="800">
						<img src="<?php echo esc_url( dm_image_url( 'dm_about_' . $dm_n . '_desktop', 'about-' . $dm_n . '-desktop.svg' ) ); ?>" width="840" height="<?php echo esc_attr( $dm_card['height'] ); ?>" alt="" loading="lazy">
					</picture>
					<?php dm_img_label( 'dm_about_' . $dm_n . '_desktop', 'About image ' . $dm_n, 840, $dm_card['height'], 'hide-mobile' ); ?>
					<?php dm_img_label( 'dm_about_' . $dm_n . '_mobile', 'About image ' . $dm_n, 640, 800, 'show-mobile' ); ?>
					<h2 class="about-card__word"><?php echo esc_html( $dm_card['word'] ); ?></h2>
				</button>
			<?php endforeach; ?>
		</div>
		<div class="slider-dots" data-about-dots></div>
	</div>
</section>
