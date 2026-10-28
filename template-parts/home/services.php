<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$dm_services = array(
	array( __( 'Branding', 'digitaliseme' ), __( 'Build a brand people remember.', 'digitaliseme' ) ),
	array( __( 'Social Media Marketing', 'digitaliseme' ), __( 'Content and strategy that builds a real community.', 'digitaliseme' ) ),
	array( __( 'Performance Marketing', 'digitaliseme' ), __( 'Meta and Google Ads campaigns built around ROAS, not impressions.', 'digitaliseme' ) ),
	array( __( 'SEO', 'digitaliseme' ), __( 'Rank higher, get found by people already searching for you.', 'digitaliseme' ) ),
	array( __( 'Website Design & Development', 'digitaliseme' ), __( 'Shopify, WooCommerce, and WordPress sites designed to convert.', 'digitaliseme' ) ),
	array( __( 'Content Production', 'digitaliseme' ), __( 'Photography, videography, and creative content for every platform.', 'digitaliseme' ) ),
);
?>
<section class="svc section" aria-labelledby="svc-title">
	<div class="page-width-medium">
		<h2 class="svc__title" id="svc-title"><?php esc_html_e( 'Our Services', 'digitaliseme' ); ?></h2>

		<div class="svc__list">
			<?php foreach ( $dm_services as $dm_i => $dm_service ) : ?>
				<?php $dm_n = $dm_i + 1; ?>
				<article class="svc-row" data-svc-row>
					<div class="svc-row__text" data-svc-text>
						<h3><?php echo esc_html( $dm_service[0] ); ?></h3>
						<p><?php echo esc_html( $dm_service[1] ); ?></p>
					</div>

					<div class="svc-row__media" aria-hidden="true">
						<div class="svc-row__frame svc-row__frame--u">
							<div class="svc-row__img" data-svc-img-top>
								<img src="<?php echo esc_url( dm_image_url( 'dm_service_' . $dm_n . '_a', 'service-' . $dm_n . '-a.svg' ) ); ?>" width="600" height="840" alt="" loading="lazy">
								<?php dm_img_label( 'dm_service_' . $dm_n . '_a', 'Service ' . $dm_n . ' A', 600, 840, 'img-label--center' ); ?>
							</div>
						</div>
						<div class="svc-row__frame svc-row__frame--arch">
							<div class="svc-row__img" data-svc-img-bottom>
								<img src="<?php echo esc_url( dm_image_url( 'dm_service_' . $dm_n . '_b', 'service-' . $dm_n . '-b.svg' ) ); ?>" width="600" height="760" alt="" loading="lazy">
								<?php dm_img_label( 'dm_service_' . $dm_n . '_b', 'Service ' . $dm_n . ' B', 600, 760, 'img-label--center' ); ?>
							</div>
						</div>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>
