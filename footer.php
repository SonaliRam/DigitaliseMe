<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$dm_industries = array( 'D2C Brands', 'E-commerce', 'Real Estate', 'Healthcare', 'Lifestyle', 'Hospitality', 'Professional Services' );
?>
<footer class="site-footer on-dark">
	<div class="page-width-medium">
		<div class="footer__top" data-footer-cols>
			<div class="footer__brand">
				<a class="footer__logo-link" href="<?php echo esc_url( home_url( '/' ) ); ?>">
					<img class="footer__logo" src="<?php echo esc_url( home_url( '/wp-content/uploads/2026/11/dm-wordmark-white.gif' ) ); ?>" width="760" height="350" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" decoding="async">
				</a>
				<p class="footer__address">C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051</p>
				<ul class="footer__social">
					<?php foreach ( dm_social_networks() as $dm_id => $dm_network ) : ?>
						<li>
							<a href="<?php echo esc_url( get_theme_mod( 'dm_social_' . $dm_id, '#' ) ); ?>" aria-label="<?php echo esc_attr( $dm_network['label'] ); ?>" target="_blank" rel="noopener">
								<?php echo $dm_network['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div class="footer__col" data-footer-acc>
				<h6><button class="footer__toggle" type="button" aria-expanded="false"><?php esc_html_e( 'Services', 'digitaliseme' ); ?></button></h6>
				<?php dm_menu( 'footer-services', 'footer__list' ); ?>
			</div>

			<div class="footer__col" data-footer-acc>
				<h6><button class="footer__toggle" type="button" aria-expanded="false"><?php esc_html_e( 'Company', 'digitaliseme' ); ?></button></h6>
				<?php dm_menu( 'footer-company', 'footer__list' ); ?>
			</div>

			<div class="footer__col" data-footer-acc>
				<h6><button class="footer__toggle" type="button" aria-expanded="false"><?php esc_html_e( 'Industries', 'digitaliseme' ); ?></button></h6>
				<ul class="footer__list">
					<?php foreach ( $dm_industries as $dm_industry ) : ?>
						<li><?php echo esc_html( $dm_industry ); ?></li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>

		<div class="footer__bar">
			<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( get_bloginfo( 'name' ) ); ?>. <?php esc_html_e( 'All rights reserved.', 'digitaliseme' ); ?></p>
			<?php dm_menu( 'footer-legal', 'footer__legal' ); ?>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
