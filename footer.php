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
					<img class="footer__logo" src="<?php echo esc_url( dm_image_url( 'dm_logo_footer', 'logo-footer.svg' ) ); ?>" width="200" height="60" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" loading="lazy">
					<?php dm_img_label( 'dm_logo_footer', 'Logo', 240, 72, 'img-label--center' ); ?>
				</a>
				<h4 class="footer__tagline"><?php echo esc_html( get_theme_mod( 'dm_footer_tagline', __( 'Marketing Tied to Revenue, Not Just Reach.', 'digitaliseme' ) ) ); ?></h4>
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
