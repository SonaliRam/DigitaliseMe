<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
?>
<main id="main" class="site-main">
	<section class="nf" aria-labelledby="nf-title">
		<div class="page-width-medium nf__inner">
			<p class="nf__code" aria-hidden="true">
				<span data-nf-digit>4</span><span data-nf-digit class="nf__zero">0</span><span data-nf-digit>4</span>
			</p>
			<h1 class="nf__title" id="nf-title" data-nf-fade><?php esc_html_e( 'This Page Took a', 'digitaliseme' ); ?> <span class="stylish-em"><?php esc_html_e( 'Detour.', 'digitaliseme' ); ?></span></h1>
			<p class="nf__text" data-nf-fade><?php esc_html_e( 'The page you are looking for does not exist or has been moved. Let us get you back on track.', 'digitaliseme' ); ?></p>
			<div class="nf__actions" data-nf-fade>
				<a class="primary-btn" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back to Home', 'digitaliseme' ); ?></a>
				<a class="secondary-btn" href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>"><?php esc_html_e( 'Contact Us', 'digitaliseme' ); ?></a>
			</div>
		</div>
	</section>
</main>
<?php
get_footer();
