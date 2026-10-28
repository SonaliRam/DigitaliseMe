<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$dm_values = array(
	__( 'Transparency', 'digitaliseme' ),
	__( 'Creativity', 'digitaliseme' ),
	__( 'Collaboration', 'digitaliseme' ),
	__( 'Accountability', 'digitaliseme' ),
	__( 'Continuous Learning', 'digitaliseme' ),
);
?>
<section class="section values page-width-full" aria-labelledby="values-title">
	<div class="page-width-medium values__head">
		<h2 id="values-title"><?php esc_html_e( 'What We Believe In', 'digitaliseme' ); ?></h2>
	</div>
	<?php get_template_part( 'template-parts/home/sub-banner' ); ?>
	<div class="values__strip">
		<div class="values__track">
			<?php for ( $dm_set = 0; $dm_set < 2; $dm_set++ ) : ?>
				<ul class="values__group"<?php echo $dm_set ? ' aria-hidden="true"' : ''; ?>>
					<?php foreach ( array_merge( $dm_values, $dm_values ) as $dm_value ) : ?>
						<li class="values__item"><?php echo esc_html( $dm_value ); ?></li>
					<?php endforeach; ?>
				</ul>
			<?php endfor; ?>
		</div>
	</div>
</section>
