<?php
get_header();
?>
<main id="main" class="site-main site-main--home">
	<?php get_template_part( 'template-parts/home/hero' ); ?>
	<?php get_template_part( 'template-parts/home/about' ); ?>
	<?php get_template_part( 'template-parts/home/services' ); ?>
	<?php get_template_part( 'template-parts/home/industries' ); ?>
	<?php get_template_part( 'template-parts/home/why' ); ?>
	<?php get_template_part( 'template-parts/home/brands' ); ?>
	<?php get_template_part( 'template-parts/home/platforms' ); ?>
	<?php get_template_part( 'template-parts/home/process' ); ?>
	<?php get_template_part( 'template-parts/home/values' ); ?>
	<?php get_template_part( 'template-parts/home/cta' ); ?>
</main>
<?php
get_footer();
