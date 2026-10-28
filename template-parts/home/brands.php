<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<section class="brands section" aria-labelledby="brands-title">
	<div class="page-width-medium">
		<h2 class="brands__title" id="brands-title" data-brands-title>
			<?php esc_html_e( 'Explore the', 'digitaliseme' ); ?> <span class="text-orange"><?php esc_html_e( 'Brands', 'digitaliseme' ); ?></span> <?php esc_html_e( 'We’ve Helped Grow.', 'digitaliseme' ); ?>
			<em class="stylish-em"><?php esc_html_e( 'Yours could be next.', 'digitaliseme' ); ?></em>
		</h2>

		<ul class="brands__grid" data-brands-grid>
			<?php for ( $dm_n = 1; $dm_n <= dm_brand_count(); $dm_n++ ) : ?>
				<li class="brands__cell">
					<img src="<?php echo esc_url( dm_image_url( 'dm_brand_' . $dm_n, 'brand.svg' ) ); ?>" width="400" height="200" alt="<?php echo esc_attr( sprintf( __( 'Brand %d logo', 'digitaliseme' ), $dm_n ) ); ?>" loading="lazy">
					<?php dm_img_label( 'dm_brand_' . $dm_n, '', 400, 200, 'img-label--center' ); ?>
				</li>
			<?php endfor; ?>
		</ul>
	</div>
</section>
