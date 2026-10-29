(function () {
	'use strict';

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var gsap = window.gsap;
	var ScrollTrigger = window.ScrollTrigger;

	function initHeader() {
		var header = document.querySelector('[data-header]');
		var toggle = document.querySelector('[data-nav-toggle]');
		var menu = document.getElementById('mobile-menu');
		if (!header) {
			return;
		}

		function isMenuOpen() {
			return toggle && toggle.getAttribute('aria-expanded') === 'true';
		}

		function updateHeader() {
			header.classList.toggle('is-scrolled', isMenuOpen() || window.scrollY > 10);
		}

		function setMenu(open) {
			if (!toggle || !menu) {
				return;
			}
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
			menu.classList.toggle('is-open', open);
			document.documentElement.style.overflow = open ? 'hidden' : '';
			updateHeader();
		}

		if (toggle && menu) {
			toggle.addEventListener('click', function () {
				setMenu(!isMenuOpen());
			});

			menu.addEventListener('click', function (e) {
				if (e.target.closest('a')) {
					setMenu(false);
				}
			});

			document.addEventListener('keydown', function (e) {
				if (e.key === 'Escape' && isMenuOpen()) {
					setMenu(false);
					toggle.focus();
				}
			});
		}

		if (ScrollTrigger) {
			ScrollTrigger.create({ start: 10, end: 'max', onToggle: updateHeader });
		} else {
			window.addEventListener('scroll', updateHeader, { passive: true });
		}
		updateHeader();
	}

	function initHero() {
		if (!document.querySelector('.hero')) {
			return;
		}

		var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
		tl.from('[data-hero-bg]', { scale: 1.08, duration: 1.6, ease: 'power2.out' }, 0)
			.from('[data-header]', { yPercent: -120, autoAlpha: 0, duration: 0.8 }, 0.1)
			.from('[data-hero-line]', { yPercent: 110, duration: 1, stagger: 0.12 }, 0.25)
			.from('[data-hero-fade]', { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.15 }, 0.7);

		var subject = document.querySelector('[data-hero-subject] img');
		if (subject) {
			tl.from(subject, { yPercent: 100, duration: 1.4, ease: 'power3.out' }, 0);
		}

		gsap.to('[data-hero-bg]', {
			yPercent: 12,
			ease: 'none',
			scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
		});
	}

	function initReveals() {
		gsap.utils.toArray('[data-reveal]').forEach(function (el) {
			gsap.from(el, {
				y: 40,
				autoAlpha: 0,
				duration: 0.9,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 85%', once: true }
			});
		});

		gsap.utils.toArray('[data-stagger]').forEach(function (group) {
			gsap.from(group.children, {
				y: 24,
				autoAlpha: 0,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out',
				scrollTrigger: { trigger: group, start: 'top 85%', once: true }
			});
		});
	}

	function initFooterAccordion() {
		var cols = Array.prototype.slice.call(document.querySelectorAll('[data-footer-acc]'));
		var mobile = window.matchMedia('(max-width: 767px)');
		cols.forEach(function (col) {
			var btn = col.querySelector('.footer__toggle');
			btn.addEventListener('click', function () {
				if (!mobile.matches) {
					return;
				}
				var open = !col.classList.contains('is-open');
				cols.forEach(function (c) {
					c.classList.remove('is-open');
					c.querySelector('.footer__toggle').setAttribute('aria-expanded', 'false');
				});
				col.classList.toggle('is-open', open);
				btn.setAttribute('aria-expanded', open ? 'true' : 'false');
			});
		});
	}

	function initFooter() {
		var cols = document.querySelector('[data-footer-cols]');
		if (cols) {
			gsap.from(cols.children, {
				y: 30,
				autoAlpha: 0,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out',
				scrollTrigger: { trigger: cols, start: 'top 85%', once: true }
			});
		}

		if (document.querySelector('[data-wordmark]')) {
			gsap.from('[data-wordmark]', {
				y: 40,
				autoAlpha: 0,
				duration: 1.2,
				ease: 'power3.out',
				scrollTrigger: { trigger: '.footer__bar', start: 'top bottom', once: true }
			});
		}
	}

	function createAutoSlider(track, dotsWrap, onChange) {
		var slides = Array.prototype.slice.call(track.children);
		var mobile = window.matchMedia('(max-width: 767px)');
		var index = 0;
		var timer = null;
		var dots = [];
		var startX = null;

		function moveTrack(offset) {
			if (gsap && !reduceMotion) {
				gsap.to(track, { x: -offset, duration: 0.8, ease: 'power3.inOut' });
			} else {
				track.style.transform = 'translateX(' + -offset + 'px)';
			}
		}

		function goTo(i) {
			index = (i + slides.length) % slides.length;
			if (!mobile.matches) {
				return;
			}
			moveTrack(slides[index].offsetLeft - slides[0].offsetLeft);
			dots.forEach(function (d, n) {
				d.setAttribute('aria-current', n === index ? 'true' : 'false');
			});
			if (onChange) {
				onChange(index);
			}
		}

		function stop() {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		}

		function start() {
			stop();
			if (!mobile.matches || reduceMotion) {
				return;
			}
			timer = setInterval(function () {
				goTo(index + 1);
			}, 3200);
		}

		if (dotsWrap) {
			slides.forEach(function (slide, i) {
				var dot = document.createElement('button');
				dot.type = 'button';
				dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
				dot.addEventListener('click', function () {
					goTo(i);
					start();
				});
				dotsWrap.appendChild(dot);
				dots.push(dot);
			});
		}

		track.addEventListener('touchstart', function (e) {
			startX = e.touches[0].clientX;
			stop();
		}, { passive: true });

		track.addEventListener('touchend', function (e) {
			if (startX !== null) {
				var dx = e.changedTouches[0].clientX - startX;
				if (Math.abs(dx) > 40) {
					goTo(index + (dx < 0 ? 1 : -1));
				}
				startX = null;
			}
			start();
		});

		document.addEventListener('visibilitychange', function () {
			if (document.hidden) {
				stop();
			} else {
				start();
			}
		});

		function onBreakpoint() {
			if (gsap) {
				gsap.set(track, { x: 0 });
			}
			track.style.transform = '';
			index = 0;
			if (mobile.matches) {
				goTo(0);
			} else if (onChange) {
				onChange(-1);
			}
			start();
		}

		if (mobile.addEventListener) {
			mobile.addEventListener('change', onBreakpoint);
		}
		onBreakpoint();

		return {
			goTo: goTo,
			start: start,
			isMobile: function () {
				return mobile.matches;
			}
		};
	}

	function initAbout() {
		var track = document.querySelector('[data-about-track]');
		if (!track) {
			return;
		}

		var cards = Array.prototype.slice.call(track.querySelectorAll('.about-card'));

		function setActive(card) {
			cards.forEach(function (c) {
				var on = c === card;
				c.classList.toggle('is-active', on);
				c.setAttribute('aria-pressed', on ? 'true' : 'false');
			});
		}

		var slider = createAutoSlider(track, document.querySelector('[data-about-dots]'), function (i) {
			setActive(cards[i] || null);
		});

		cards.forEach(function (card, i) {
			card.addEventListener('click', function () {
				if (slider.isMobile()) {
					slider.goTo(i);
					slider.start();
					return;
				}
				setActive(card.classList.contains('is-active') ? null : card);
			});
		});
	}

	function initPlatforms() {
		var track = document.querySelector('[data-platforms-track]');
		if (!track) {
			return;
		}

		createAutoSlider(track, document.querySelector('[data-platforms-dots]'));

		if (!gsap || !ScrollTrigger || reduceMotion) {
			return;
		}

		gsap.timeline({ scrollTrigger: { trigger: track, start: 'top 80%', once: true } })
			.from(track.children, { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
			.from(track.querySelectorAll('.platforms__logo'), { scale: 0.8, autoAlpha: 0, duration: 0.4, stagger: 0.04, ease: 'back.out(1.7)' }, '-=0.3');
	}

	function initAboutReveal() {
		if (!document.querySelector('.about')) {
			return;
		}
		gsap.from('[data-about-reveal]', {
			y: 30,
			autoAlpha: 0,
			duration: 0.9,
			stagger: 0.12,
			ease: 'power3.out',
			scrollTrigger: { trigger: '.about', start: 'top 80%', once: true }
		});
		gsap.timeline({ scrollTrigger: { trigger: '[data-about-track]', start: 'top 85%', once: true } })
			.from('.about-card', { y: 80, autoAlpha: 0, duration: 1, stagger: 0.15, ease: 'power3.out' })
			.from('.about-card__word', { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.4');
	}

	function initServices() {
		var rows = gsap.utils.toArray('[data-svc-row]');
		var mm = gsap.matchMedia();

		mm.add('(max-width: 767px)', function () {
			rows.forEach(function (row) {
				gsap.timeline({
					defaults: { duration: 1, ease: 'power2.out' },
					scrollTrigger: { trigger: row, start: 'top 90%', end: 'top 40%', scrub: 0.8 }
				})
					.from(row.querySelector('[data-svc-text]'), { x: -60, autoAlpha: 0 }, 0)
					.from(row.querySelector('.svc-row__frame--u'), { xPercent: -110, autoAlpha: 0 }, 0.1)
					.from(row.querySelector('.svc-row__frame--arch'), { xPercent: 110, autoAlpha: 0 }, 0.1);
			});
		});

		mm.add('(min-width: 768px)', function () {
		rows.forEach(function (row) {
			var tl = gsap.timeline({
				defaults: { duration: 1, ease: 'power2.out' },
				scrollTrigger: {
					trigger: row,
					start: 'top 95%',
					end: 'top 45%',
					scrub: 0.8
				}
			});

			tl.from(row.querySelector('[data-svc-text]'), { x: -80, autoAlpha: 0 }, 0)
				.from(row.querySelector('[data-svc-img-top]'), { yPercent: -100, autoAlpha: 0 }, 0.1)
				.from(row.querySelector('[data-svc-img-bottom]'), { yPercent: 100, autoAlpha: 0 }, 0.2);
		});
		});
	}

	function initIndustries() {
		var bento = document.querySelector('[data-bento]');
		if (!bento) {
			return;
		}

		var tiles = Array.prototype.slice.call(bento.querySelectorAll('.bento__tile'));
		var timer = null;
		var current = -1;
		var ready = false;

		function flipNext() {
			var next;
			do {
				next = Math.floor(Math.random() * tiles.length);
			} while (next === current && tiles.length > 1);
			if (current > -1) {
				tiles[current].classList.remove('is-flipped');
			}
			tiles[next].classList.add('is-flipped');
			current = next;
		}

		function startFlips() {
			if (timer || !ready || reduceMotion) {
				return;
			}
			flipNext();
			timer = setInterval(flipNext, 2200);
		}

		function stopFlips() {
			clearInterval(timer);
			timer = null;
		}

		function onReady() {
			ready = true;
			bento.classList.add('is-ready');
			startFlips();
		}

		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (entries) {
				if (entries[0].isIntersecting) {
					startFlips();
				} else {
					stopFlips();
				}
			}, { threshold: 0.25 }).observe(bento);
		}

		document.addEventListener('visibilitychange', function () {
			if (document.hidden) {
				stopFlips();
			}
		});

		if (!gsap || !ScrollTrigger || reduceMotion) {
			onReady();
			return;
		}

		var sets = [['c', 'a'], ['b', 'e', 'd'], ['f', 'g']];
		var from = {
			a: { x: -120, y: 0 },
			b: { x: 0, y: -100 },
			c: { x: 140, y: 0 },
			d: { x: 0, y: 80 },
			e: { x: 0, y: 0, scale: 0.4 },
			f: { x: -140, y: 60 },
			g: { x: 140, y: 60 }
		};

		function part(key, selector) {
			return bento.querySelector('.bento__tile--' + key + ' ' + selector);
		}

		gsap.set('[data-ind-reveal]', { y: 30, autoAlpha: 0 });
		Object.keys(from).forEach(function (key) {
			gsap.set(part(key, '.bento__card'), Object.assign({ autoAlpha: 0 }, from[key]));
		});

		var tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' }, onComplete: onReady });

		tl.to('[data-ind-reveal]', { y: 0, autoAlpha: 1, duration: 0.8 });

		sets.forEach(function (set, i) {
			var at = 0.5 + i * 1;
			tl.to(set.map(function (k) { return part(k, '.bento__card'); }), { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 1.1, stagger: 0.15 }, at);
		});

		ScrollTrigger.create({
			trigger: bento,
			start: 'top 80%',
			once: true,
			onEnter: function () {
				tl.play();
			}
		});
	}

	function initBrands() {
		var grid = document.querySelector('[data-brands-grid]');
		if (!grid) {
			return;
		}

		var cells = Array.prototype.slice.call(grid.children);

		gsap.set('[data-brands-title]', { y: 30, autoAlpha: 0 });
		gsap.set(cells, { scale: 0.5, autoAlpha: 0 });

		function pickOrigin() {
			var box = grid.getBoundingClientRect();
			var tx = box.left + box.width * 0.7;
			var best = cells[0];
			var bestDist = Infinity;
			cells.forEach(function (cell) {
				var r = cell.getBoundingClientRect();
				var d = Math.hypot(r.left + r.width / 2 - tx, r.top - box.top);
				if (d < bestDist) {
					bestDist = d;
					best = cell;
				}
			});
			return best;
		}

		function ripple() {
			var origin = pickOrigin();
			var o = origin.getBoundingClientRect();
			var ox = o.left + o.width / 2;
			var oy = o.top + o.height / 2;
			var distances = cells.map(function (cell) {
				var r = cell.getBoundingClientRect();
				return Math.hypot(r.left + r.width / 2 - ox, r.top + r.height / 2 - oy);
			});
			var max = Math.max.apply(null, distances) || 1;

			origin.classList.add('is-origin');

			cells.forEach(function (cell, i) {
				var delay = cell === origin ? 0 : 0.25 + (distances[i] / max) * 0.9 + Math.random() * 0.12;
				gsap.to(cell, { scale: 1, autoAlpha: 1, duration: 0.6, delay: delay, ease: 'back.out(1.6)', clearProps: 'transform' });
			});
		}

		ScrollTrigger.create({
			trigger: grid,
			start: 'top 80%',
			once: true,
			onEnter: function () {
				gsap.to('[data-brands-title]', { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' });
				gsap.delayedCall(0.3, ripple);
			}
		});
	}

	function initAccordions() {
		Array.prototype.forEach.call(document.querySelectorAll('[data-accordion]'), function (list) {
			var items = Array.prototype.slice.call(list.children);
			items.forEach(function (item) {
				var trigger = item.querySelector('[aria-expanded]');
				trigger.addEventListener('click', function () {
					var opening = trigger.getAttribute('aria-expanded') !== 'true';
					items.forEach(function (other) {
						other.classList.remove('is-open');
						other.querySelector('[aria-expanded]').setAttribute('aria-expanded', 'false');
					});
					if (opening) {
						item.classList.add('is-open');
						trigger.setAttribute('aria-expanded', 'true');
					}
				});
			});
		});
	}

	document.addEventListener('DOMContentLoaded', function () {
		if (gsap && ScrollTrigger) {
			gsap.registerPlugin(ScrollTrigger);
		}

		initHeader();
		initAbout();
		initPlatforms();
		initAccordions();
		initIndustries();
		initFooterAccordion();

		if (!gsap || !ScrollTrigger || reduceMotion) {
			return;
		}

		initHero();
		initReveals();
		initAboutReveal();
		initServices();
		initBrands();
		initFooter();
	});
})();
