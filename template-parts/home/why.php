<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$dm_why_points = array(
	__( 'Proven ROAS across performance marketing campaigns', 'digitaliseme' ),
	__( 'Meaningful client revenue managed across brands', 'digitaliseme' ),
	__( 'Direct access to your team, no account manager relay', 'digitaliseme' ),
	__( 'Clear reporting, explained in plain language, no confusing marketing terms', 'digitaliseme' ),
	__( 'Flexible scope as your business grows.', 'digitaliseme' ),
);
?>
<section class="why section" aria-labelledby="why-title">
	<div class="page-width-medium why__grid">
		<div class="why__media" data-reveal>
			<img src="<?php echo esc_url( dm_image_url( 'dm_why_image', 'why.svg' ) ); ?>" width="1200" height="1400" alt="" loading="lazy">
			<?php dm_img_label( 'dm_why_image', '', 1200, 1400, 'img-label--center' ); ?>
		</div>

		<div class="why__content">
			<h2 id="why-title" data-reveal><?php esc_html_e( 'Why Digitalise Me', 'digitaliseme' ); ?></h2>
			<ul class="why__list" data-stagger>
				<?php foreach ( $dm_why_points as $dm_point ) : ?>
					<li class="why__item">
						<span class="why__icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
						</span>
						<p><?php echo esc_html( $dm_point ); ?></p>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
</section>
