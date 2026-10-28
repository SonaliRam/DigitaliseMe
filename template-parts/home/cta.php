<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<section class="section cta page-width-full common-cta" aria-labelledby="cta-title">
	<div class="page-width-medium cta__grid">
		<div class="cta__content">
			<h2 id="cta-title"><?php esc_html_e( 'Your Competitors Are Already Online. Let’s Make Sure You’re the One People Notice First.', 'digitaliseme' ); ?></h2>
			<a class="primary-btn" href="<?php echo esc_url( dm_contact_url() ); ?>"><?php esc_html_e( 'Book a Strategy Call', 'digitaliseme' ); ?></a>
		</div>
		<div class="cta__media">
			<img src="<?php echo esc_url( dm_image_url( 'dm_cta_gif', 'process.svg' ) ); ?>" width="600" height="600" alt="" loading="lazy">
			<?php dm_img_label( 'dm_cta_gif', 'GIF', 600, 600, 'img-label--center' ); ?>
		</div>
	</div>
</section>
