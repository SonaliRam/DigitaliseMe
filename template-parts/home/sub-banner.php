<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="sub-banner page-width-full">
	<picture>
		<source media="(max-width: 767px)" srcset="<?php echo esc_url( dm_image_url( 'dm_sub_banner_mobile', 'hero-mobile.svg' ) ); ?>" width="750" height="900">
		<img src="<?php echo esc_url( dm_image_url( 'dm_sub_banner_desktop', 'hero-desktop.svg' ) ); ?>" width="1920" height="600" alt="" loading="lazy">
	</picture>
	<?php dm_img_label( 'dm_sub_banner_desktop', 'Sub banner desktop', 1920, 600, 'img-label--center hide-mobile' ); ?>
	<?php dm_img_label( 'dm_sub_banner_mobile', 'Sub banner mobile', 750, 900, 'img-label--center show-mobile' ); ?>
</div>
