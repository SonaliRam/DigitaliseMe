(function () {
	'use strict';

	if (typeof window.gsap === 'undefined') {
		return;
	}

	var gsap = window.gsap;

	if (window.ScrollTrigger) {
		gsap.registerPlugin(window.ScrollTrigger);
	}

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	gsap.defaults({ duration: 0.8, ease: 'power3.out' });

	function initReveals() {
		var items = gsap.utils.toArray('[data-reveal]');
		if (!items.length) {
			return;
		}

		if (reduceMotion) {
			gsap.set(items, { autoAlpha: 1, y: 0 });
			return;
		}

		items.forEach(function (el) {
			gsap.fromTo(
				el,
				{ autoAlpha: 0, y: 30 },
				{
					autoAlpha: 1,
					y: 0,
					scrollTrigger: {
						trigger: el,
						start: 'top 85%',
						once: true
					}
				}
			);
		});
	}

	function initStagger() {
		var groups = gsap.utils.toArray('[data-stagger]');
		if (!groups.length || reduceMotion) {
			return;
		}

		groups.forEach(function (group) {
			gsap.fromTo(
				group.children,
				{ autoAlpha: 0, y: 24 },
				{
					autoAlpha: 1,
					y: 0,
					stagger: 0.1,
					scrollTrigger: {
						trigger: group,
						start: 'top 85%',
						once: true
					}
				}
			);
		});
	}

	document.addEventListener('DOMContentLoaded', function () {
		document.documentElement.classList.add('gsap-ready');
		initReveals();
		initStagger();
	});
})();
