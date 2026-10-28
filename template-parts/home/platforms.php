<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$dm_platform_groups = array(
	array(
		'title' => __( 'Advertising', 'digitaliseme' ),
		'text'  => __( 'Where your campaigns run.', 'digitaliseme' ),
		'tools' => array( 'meta-ads' => 'Meta Ads', 'google-ads' => 'Google Ads', 'meta-business-suite' => 'Meta Business Suite' ),
	),
	array(
		'title' => __( 'Websites & E-commerce', 'digitaliseme' ),
		'text'  => __( 'Where your customers buy.', 'digitaliseme' ),
		'tools' => array( 'shopify' => 'Shopify', 'woocommerce' => 'WooCommerce', 'wordpress' => 'WordPress' ),
	),
	array(
		'title' => __( 'Analytics & SEO', 'digitaliseme' ),
		'text'  => __( 'How we measure and get you found.', 'digitaliseme' ),
		'tools' => array( 'ga4' => 'Google Analytics 4', 'search-console' => 'Google Search Console' ),
	),
	array(
		'title' => __( 'Design', 'digitaliseme' ),
		'text'  => __( 'Where your creative comes to life.', 'digitaliseme' ),
		'tools' => array( 'canva' => 'Canva', 'figma' => 'Figma' ),
	),
);
?>
<section class="platforms section" aria-labelledby="platforms-title">
	<div class="page-width-medium">
		<div class="platforms__head" data-reveal>
			<p class="eyebrow"><?php esc_html_e( 'Tools & Platforms', 'digitaliseme' ); ?></p>
			<h2 id="platforms-title"><?php esc_html_e( 'Platforms We Work With', 'digitaliseme' ); ?></h2>
		</div>
	</div>

	<div class="page-width-medium platforms__slider">
		<div class="platforms__grid" data-platforms-track>
			<?php foreach ( $dm_platform_groups as $dm_group ) : ?>
				<div class="platforms__card">
					<h4><?php echo esc_html( $dm_group['title'] ); ?></h4>
					<p><?php echo esc_html( $dm_group['text'] ); ?></p>
					<div class="platforms__logos">
						<?php foreach ( $dm_group['tools'] as $dm_slug => $dm_tool ) : ?>
							<span class="platforms__logo" title="<?php echo esc_attr( $dm_tool ); ?>">
								<img src="<?php echo esc_url( dm_image_url( 'dm_platform_' . str_replace( '-', '_', $dm_slug ), 'platform.svg' ) ); ?>" width="144" height="144" alt="<?php echo esc_attr( $dm_tool ); ?>" loading="lazy">
								<?php dm_img_label( 'dm_platform_' . str_replace( '-', '_', $dm_slug ), '', 144, 144, 'img-label--center' ); ?>
							</span>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
		<div class="slider-dots" data-platforms-dots></div>
	</div>
</section>
