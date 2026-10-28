<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$dm_process_steps = array(
	array( __( 'Discover', 'digitaliseme' ), __( 'We audit your current marketing, market, and competitors before touching a single campaign.', 'digitaliseme' ) ),
	array( __( 'Strategise', 'digitaliseme' ), __( 'We build a plan tied to your revenue goals, not vanity metrics.', 'digitaliseme' ) ),
	array( __( 'Create', 'digitaliseme' ), __( 'Design, copy, and campaigns get built and reviewed with you.', 'digitaliseme' ) ),
	array( __( 'Launch', 'digitaliseme' ), __( 'Everything goes live, tracked from day one.', 'digitaliseme' ) ),
	array( __( 'Optimise', 'digitaliseme' ), __( 'We adjust weekly based on real performance data, not a quarterly report.', 'digitaliseme' ) ),
);
?>
<section class="process section" aria-labelledby="process-title">
	<div class="page-width-medium process__grid">
		<div class="process__media" data-reveal>
			<img src="<?php echo esc_url( dm_image_url( 'dm_process_image', 'process.svg' ) ); ?>" width="500" height="500" alt="" loading="lazy">
			<?php dm_img_label( 'dm_process_image', '', 500, 500, 'img-label--center' ); ?>
		</div>

		<div class="process__content">
			<h2 id="process-title" data-reveal><?php esc_html_e( 'Our Process', 'digitaliseme' ); ?></h2>

			<div class="process__list" data-accordion data-stagger>
				<?php foreach ( $dm_process_steps as $dm_i => $dm_step ) : ?>
					<?php
					$dm_open     = 0 === $dm_i;
					$dm_panel_id = 'process-panel-' . ( $dm_i + 1 );
					?>
					<div class="process__item<?php echo $dm_open ? ' is-open' : ''; ?>">
						<h3 class="process__heading">
							<button class="process__trigger" type="button" aria-expanded="<?php echo $dm_open ? 'true' : 'false'; ?>" aria-controls="<?php echo esc_attr( $dm_panel_id ); ?>">
								<span class="process__num" aria-hidden="true"><?php echo esc_html( sprintf( '%02d', $dm_i + 1 ) ); ?></span>
								<span class="process__title"><?php echo esc_html( $dm_step[0] ); ?></span>
								<span class="process__icon" aria-hidden="true"></span>
							</button>
						</h3>
						<div class="process__panel" id="<?php echo esc_attr( $dm_panel_id ); ?>" role="region">
							<div class="process__panel-inner">
								<p><?php echo esc_html( $dm_step[1] ); ?></p>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</section>
