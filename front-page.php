<?php
get_header();
?>
<main id="main" class="site-main site-main--home">
	<?php
	while ( have_posts() ) :
		the_post();
		the_content();
	endwhile;
	?>
</main>
<?php
get_footer();
