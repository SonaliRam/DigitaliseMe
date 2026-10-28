<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$dm_industry_tiles = array(
	array( 'a', __( 'D2C Brands', 'digitaliseme' ), 600, 880 ),
	array( 'b', __( 'E-commerce', 'digitaliseme' ), 600, 360 ),
	array( 'c', __( 'Real Estate', 'digitaliseme' ), 1200, 800 ),
	array( 'd', __( 'Healthcare', 'digitaliseme' ), 600, 360 ),
	array( 'e', __( 'Lifestyle', 'digitaliseme' ), 500, 500 ),
	array( 'f', __( 'Hospitality', 'digitaliseme' ), 1000, 460 ),
	array( 'g', __( 'Professional Services', 'digitaliseme' ), 1400, 460 ),
);
?>
<section class="industries section" aria-labelledby="industries-title">
	<div class="page-width-medium">
		<div class="industries__head" data-ind-reveal>
			<h2 id="industries-title"><?php esc_html_e( 'Explore Services', 'digitaliseme' ); ?></h2>
			<p><?php esc_html_e( 'Helping Businesses Across Multiple Industries', 'digitaliseme' ); ?></p>
		</div>

		<ul class="bento" data-bento>
			<?php foreach ( $dm_industry_tiles as $dm_tile ) : ?>
				<?php
				list( $dm_key, $dm_name, $dm_w, $dm_h ) = $dm_tile;
				$dm_img = dm_image_url( 'dm_industry_' . $dm_key, 'industry-' . $dm_key . '.svg' );
				?>
				<li class="bento__tile bento__tile--<?php echo esc_attr( $dm_key ); ?>">
					<div class="bento__card">
						<div class="bento__inner">
							<div class="bento__face bento__face--front">
								<img src="<?php echo esc_url( $dm_img ); ?>" width="<?php echo esc_attr( $dm_w ); ?>" height="<?php echo esc_attr( $dm_h ); ?>" alt="<?php echo esc_attr( $dm_name ); ?>" loading="lazy">
								<?php dm_img_label( 'dm_industry_' . $dm_key, '', $dm_w, $dm_h, 'img-label--center' ); ?>
							</div>
							<div class="bento__face bento__face--back" aria-hidden="true">
								<img src="<?php echo esc_url( $dm_img ); ?>" width="<?php echo esc_attr( $dm_w ); ?>" height="<?php echo esc_attr( $dm_h ); ?>" alt="" loading="lazy">
								<div class="bento__glass"><h4><?php echo esc_html( $dm_name ); ?></h4></div>
							</div>
						</div>
					</div>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
