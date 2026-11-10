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

		var lastY = window.scrollY;

		function updateHeader() {
			var y = window.scrollY;
			header.classList.toggle('is-scrolled', isMenuOpen() || y > 10);
			if (isMenuOpen() || y < 120 || y < lastY - 4) {
				header.classList.remove('is-hidden');
			} else if (y > lastY + 4) {
				header.classList.add('is-hidden');
			}
			if (Math.abs(y - lastY) > 4) {
				lastY = y;
			}
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

		window.addEventListener('scroll', updateHeader, { passive: true });
		updateHeader();
	}

	function initHeroCombo() {
		var combos = document.querySelectorAll('[data-hero-combo]');
		if (!combos.length) {
			return;
		}
		if (!gsap || reduceMotion) {
			combos.forEach(function (c) {
				c.classList.add('is-static');
			});
			return;
		}
		var blocks = [];
		var outlines = [];
		var fills = [];
		var words = [];
		combos.forEach(function (c) {
			blocks.push(c.querySelector('.hero__combo-block'));
			outlines.push(c.querySelector('.hero__combo-outline'));
			fills.push(c.querySelector('.hero__combo-fill'));
			words.push(c.querySelectorAll('.hero__combo-outline .hero__word'));
		});
		words.forEach(function (w) {
			gsap.set(w, { yPercent: 110 });
		});
		var tl = gsap.timeline({ delay: 0.3 });
		tl.to(blocks, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' })
			.set(outlines, { visibility: 'visible' })
			.set(blocks, { transformOrigin: 'right center' })
			.to(blocks, { scaleX: 0, duration: 0.7, ease: 'power3.inOut' }, 'out');
		words.forEach(function (w) {
			tl.to(w, { yPercent: 0, duration: 0.8, ease: 'power3.out', stagger: 0.22 }, 'out+=0.25');
		});
		tl.to(fills, { clipPath: 'inset(0 0% 0 0)', duration: 0.35, ease: 'power2.out' }, '>-0.1');
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
				y: 24,
				autoAlpha: 0,
				duration: 0.6,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 95%', once: true }
			});
		});

		gsap.utils.toArray('[data-zoom-out]').forEach(function (el) {
			var img = el.querySelector('img');
			if (!img) {
				return;
			}
			gsap.set(el, { overflow: 'hidden' });
			gsap.from(img, {
				scale: 1.1,
				duration: 1.6,
				ease: 'power2.out',
				scrollTrigger: { trigger: el, start: 'top 95%', once: true }
			});
		});

		gsap.utils.toArray('[data-slide-right]').forEach(function (el) {
			gsap.from(el, {
				x: 80,
				autoAlpha: 0,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 95%', once: true }
			});
		});

		gsap.utils.toArray('[data-stagger]').forEach(function (group) {
			gsap.from(group.children, {
				y: 24,
				autoAlpha: 0,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out',
				scrollTrigger: { trigger: group, start: 'top 95%', once: true }
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
				scrollTrigger: { trigger: cols, start: 'top 95%', once: true }
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

		createAutoSlider(track, document.querySelector('[data-about-dots]'), function () {
			setActive(null);
		});

		cards.forEach(function (card) {
			card.addEventListener('click', function () {
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

		function setupMarquee(box) {
			var logos = Array.prototype.slice.call(box.querySelectorAll('.platforms__logo:not([data-clone])'));
			var inner = box.querySelector('.platforms__marquee');
			if (inner) {
				logos.forEach(function (l) { box.appendChild(l); });
				box.removeChild(inner);
				box.classList.remove('is-marquee');
			}
			box.style.flexWrap = 'nowrap';
			var overflow = box.scrollWidth > box.clientWidth + 1;
			box.style.flexWrap = '';
			if (!overflow || reduceMotion) {
				return;
			}
			inner = document.createElement('div');
			inner.className = 'platforms__marquee';
			logos.forEach(function (l) { inner.appendChild(l); });
			logos.forEach(function (l) {
				var c = l.cloneNode(true);
				c.setAttribute('data-clone', '');
				c.setAttribute('aria-hidden', 'true');
				inner.appendChild(c);
			});
			box.appendChild(inner);
			box.classList.add('is-marquee');
			inner.style.setProperty('--marquee-time', (logos.length * 2.5) + 's');
		}
		var boxes = Array.prototype.slice.call(track.querySelectorAll('.platforms__logos'));
		boxes.forEach(setupMarquee);
		var resizeTimer;
		window.addEventListener('resize', function () {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () { boxes.forEach(setupMarquee); }, 250);
		});

		if (!gsap || !ScrollTrigger || reduceMotion) {
			return;
		}

		gsap.timeline({ scrollTrigger: { trigger: track, start: 'top 95%', once: true } })
			.from(track.children, { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
			.from(track.querySelectorAll('.platforms__logos'), { autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.3');
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
			scrollTrigger: { trigger: '.about', start: 'top 95%', once: true }
		});
		gsap.from('.about-card', {
			y: 80,
			autoAlpha: 0,
			duration: 1,
			stagger: 0.15,
			ease: 'power3.out',
			scrollTrigger: { trigger: '[data-about-track]', start: 'top 95%', once: true }
		});
	}

	function initServices() {
		var rows = gsap.utils.toArray('[data-svc-row]');
		gsap.utils.toArray('[data-svc-points]').forEach(function (list) {
			gsap.from(list.children, { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: list, start: 'top 95%', once: true } });
		});
		var mm = gsap.matchMedia();

		mm.add('(max-width: 767px)', function () {
			rows.forEach(function (row) {
				gsap.timeline({
					defaults: { duration: 1, ease: 'power2.out' },
					scrollTrigger: { trigger: row, start: 'top 90%', end: 'top 40%', scrub: 0.8 }
				})
					.from(row.querySelector('[data-svc-text]'), { x: -60, autoAlpha: 0 }, 0)
					.from(row.querySelector('.svc-row__frame--u'), { xPercent: 110, autoAlpha: 0 }, 0.1)
					.from(row.querySelector('.svc-row__frame--arch'), { xPercent: -110, autoAlpha: 0 }, 0.1);
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

		var sets = [['a', 'c', 'h'], ['b', 'e', 'd'], ['f', 'g']];
		var from = {
			a: { x: -120, y: 0 },
			b: { x: 0, y: -100 },
			c: { x: 140, y: 0 },
			d: { x: 0, y: 80 },
			e: { x: 0, y: 0, scale: 0.4 },
			f: { x: -140, y: 60 },
			g: { x: 140, y: 60 },
			h: { x: 140, y: 0 }
		};

		function part(key, selector) {
			return bento.querySelector('.bento__tile--' + key + ' ' + selector);
		}

		gsap.set('[data-ind-reveal]', { y: 30, autoAlpha: 0 });
		Object.keys(from).forEach(function (key) {
			gsap.set(part(key, '.bento__card'), Object.assign({ autoAlpha: 0 }, from[key]));
		});

		var tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' }, onComplete: onReady });

		tl.to('[data-ind-reveal]', { y: 0, autoAlpha: 1, duration: 0.6 });

		sets.forEach(function (set, i) {
			var at = 0.15 + i * 0.25;
			tl.to(set.map(function (k) { return part(k, '.bento__card'); }), { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.8, stagger: 0.08 }, at);
		});

		ScrollTrigger.create({
			trigger: bento,
			start: 'top 95%',
			once: true,
			onEnter: function () {
				tl.play();
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

	function createLoop(track, getSlots, interval) {
	  var items = Array.prototype.slice.call(track.children);
	  var order = items.map(function (el, i) { return i; });
	  var timer = null;
	  var visible = true;

	  function slotFor(pos, slots) {
	    if (pos < slots.length) {
	      return slots[pos];
	    }
	    return slots.hidden;
	  }

	  function place(animate) {
	    var slots = getSlots();
	    order.forEach(function (itemIndex, pos) {
	      var el = items[itemIndex];
	      var s = slotFor(pos, slots);
	      var props = { x: s.x, y: s.y, width: s.w, height: s.h, rotate: s.r || 0, zIndex: s.z || 1, autoAlpha: s.a === undefined ? 1 : s.a };
	      if (animate && window.gsap) {
	        gsap.to(el, Object.assign({ duration: 1.1, ease: 'power3.inOut', overwrite: true }, props));
	      } else if (window.gsap) {
	        gsap.set(el, props);
	      }
	    });
	  }

	  function step() {
	    var slots = getSlots();
	    var first = order.shift();
	    order.push(first);
	    var el = items[first];
	    if (window.gsap) {
	      var exit = slots.exit;
	      gsap.to(el, {
	        x: exit.x, y: exit.y, width: exit.w, height: exit.h, rotate: exit.r || 0, autoAlpha: exit.a === undefined ? 1 : exit.a,
	        duration: 1.1, ease: 'power3.inOut', overwrite: true,
	        onComplete: function () {
	          var enter = slots.enter;
	          gsap.set(el, { x: enter.x, y: enter.y, width: enter.w, height: enter.h, rotate: enter.r || 0, zIndex: 0, autoAlpha: enter.a === undefined ? 1 : enter.a });
	        }
	      });
	    }
	    order.forEach(function (itemIndex, pos) {
	      if (itemIndex === first) {
	        return;
	      }
	      var s = slotFor(pos, slots);
	      gsap.to(items[itemIndex], { x: s.x, y: s.y, width: s.w, height: s.h, rotate: s.r || 0, zIndex: s.z || 1, autoAlpha: s.a === undefined ? 1 : s.a, duration: 1.1, ease: 'power3.inOut', overwrite: true });
	    });
	  }

	  function start() {
	    if (!timer && visible) {
	      step();
	      timer = setInterval(step, interval);
	    }
	  }

	  function stop() {
	    clearInterval(timer);
	    timer = null;
	  }

	  place(false);
	  window.addEventListener('resize', function () { place(false); });
	  if ('IntersectionObserver' in window) {
	    new IntersectionObserver(function (entries) {
	      visible = entries[0].isIntersecting;
	      if (visible) { start(); } else { stop(); }
	    }).observe(track);
	  }
	  document.addEventListener('visibilitychange', function () {
	    if (document.hidden) { stop(); } else { start(); }
	  });
	  return { start: start, stop: stop, place: place };
	}

	function desktopSlots(track) {
	  return function () {
	    var W = track.clientWidth;
	    var H = track.clientHeight;
	    var gap = 20;
	    var w = (W - gap * 4) / 5;
	    var heights = [0.62, 0.8, 1, 0.8, 0.62];
	    var slots = heights.map(function (k, i) {
	      return { x: i * (w + gap), y: 0, w: w, h: H * k, z: i === 2 ? 3 : 2 };
	    });
	    slots.hidden = { x: W + gap, y: 0, w: w, h: H * 0.62, z: 1 };
	    slots.exit = { x: -w - gap, y: 0, w: w, h: H * 0.62 };
	    slots.enter = slots.hidden;
	    return slots;
	  };
	}

	function mobileSlots(track) {
	  return function () {
	    var W = track.clientWidth;
	    var cardW = W * 0.72;
	    var small = 150;
	    var big = 230;
	    var midTop = 145;
	    return Object.assign([
	      { x: 0, y: midTop - small + 20, w: cardW * 0.92, h: small, r: -6, z: 1, a: 1 },
	      { x: 0, y: midTop, w: cardW, h: big, r: 0, z: 3, a: 1 },
	      { x: 0, y: midTop + big - 20, w: cardW * 0.92, h: small, r: 6, z: 2, a: 1 }
	    ], {
	      hidden: { x: 0, y: midTop + big + small, w: cardW * 0.92, h: small, r: 8, z: 0, a: 0 },
	      exit: { x: 0, y: -small, w: cardW * 0.92, h: small, r: -8, a: 0 },
	      enter: { x: 0, y: midTop + big + small, w: cardW * 0.92, h: small, r: 8, a: 0 }
	    });
	  };
	}

	function initAboutMission() {
	  if (!document.querySelector('.am')) {
	    return;
	  }
	  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	  if (!window.gsap) {
	    return;
	  }
	  if (window.ScrollTrigger) {
	    gsap.registerPlugin(ScrollTrigger);
	  }

	  var desk = document.querySelector('[data-am-desktop]');
	  var mob = document.querySelector('[data-am-mobile]');
	  var loops = [];
	  if (desk) { loops.push({ mq: '(min-width: 768px)', loop: createLoop(desk, desktopSlots(desk), 2200) }); }
	  if (mob) { loops.push({ mq: '(max-width: 767px)', loop: createLoop(mob, mobileSlots(mob), 2000) }); }

	  function sync() {
	    loops.forEach(function (o) {
	      if (!reduce && window.matchMedia(o.mq).matches) {
	        o.loop.place(false);
	        o.loop.start();
	      } else {
	        o.loop.stop();
	      }
	    });
	  }
	  sync();
	  window.addEventListener('resize', sync);

	  if (reduce || !window.ScrollTrigger) {
	    return;
	  }

	  gsap.fromTo('[data-am-title]', { scale: 0.55, autoAlpha: 0.2 }, {
	    scale: 1,
	    autoAlpha: 1,
	    ease: 'none',
	    scrollTrigger: { trigger: '.am', start: 'top 90%', end: 'top 25%', scrub: true }
	  });

	  gsap.fromTo('[data-am-text]', { y: 120, autoAlpha: 0 }, {
	    y: 0,
	    autoAlpha: 1,
	    ease: 'none',
	    scrollTrigger: { trigger: '[data-am-text]', start: 'top 100%', end: 'top 65%', scrub: true }
	  });

	  gsap.from('.am-stage', {
	    y: 100,
	    autoAlpha: 0,
	    duration: 1.2,
	    ease: 'power3.out',
	    scrollTrigger: { trigger: '.am-stage', start: 'top 95%', once: true }
	  });
	}

	function initAboutStory() {
		var section = document.querySelector('[data-as]');
		if (!section) {
			return;
		}
		var textEl = section.querySelector('[data-as-type]');
		var fullText = textEl.textContent.trim();
		var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || !window.gsap || !window.ScrollTrigger) {
			return;
		}
		var mobile = window.matchMedia('(max-width: 767px)').matches;
		var fill = section.querySelector('[data-as-fill]');
		gsap.set(fill, mobile ? { scaleY: 0 } : { scaleX: 0 });
		gsap.set(section.querySelector('[data-as-media]'), { autoAlpha: 0, scale: 0.85 });
		textEl.textContent = '';
		textEl.style.visibility = 'hidden';

		function typeText() {
			var caret = document.createElement('span');
			caret.className = 'as__caret';
			var node = document.createTextNode('');
			textEl.textContent = '';
			textEl.appendChild(node);
			textEl.appendChild(caret);
			textEl.style.visibility = 'visible';
			var i = 0;
			var timer = setInterval(function () {
				i += 2;
				node.textContent = fullText.slice(0, i);
				if (i >= fullText.length) {
					clearInterval(timer);
					setTimeout(function () { caret.remove(); }, 1500);
				}
			}, 28);
		}

		gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 95%', once: true } })
			.to(fill, mobile ? { scaleY: 1, duration: 1, ease: 'power3.inOut' } : { scaleX: 1, duration: 1, ease: 'power3.inOut' })
			.to(section.querySelector('[data-as-media]'), { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' })
			.call(typeText);
	}

	function initBannerVideo() {
		var video = document.querySelector('[data-ab-video]');
		if (!video) {
			return;
		}
		var mq = window.matchMedia('(max-width: 767px)');
		function pick() {
			var src = mq.matches ? video.getAttribute('data-src-mobile') : video.getAttribute('data-src-desktop');
			if (src && video.getAttribute('src') !== src) {
				video.setAttribute('src', src);
				video.load();
				var play = video.play();
				if (play && play.catch) {
					play.catch(function () {});
				}
			}
		}
		pick();
		if (mq.addEventListener) {
			mq.addEventListener('change', pick);
		}
	}

	function initAboutWhy() {
		var el = document.querySelector('.awSwiper');
		if (!el || !window.Swiper) {
			return;
		}
		new Swiper(el, {
			direction: 'vertical',
			slidesPerView: 1,
			spaceBetween: 30,
			speed: 800,
			rewind: true,
			autoplay: { delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true },
			mousewheel: { releaseOnEdges: true, thresholdDelta: 20 },
			keyboard: { enabled: true },
			pagination: { el: el.querySelector('.swiper-pagination'), clickable: true }
		});
	}

	function initContactCards() {
		var grid = document.querySelector('[data-cc-grid]');
		if (!grid || !gsap || !ScrollTrigger || reduceMotion) {
			return;
		}
		var cards = gsap.utils.toArray(grid.querySelectorAll('[data-cc-card]'));
		var fan = [
			{ x: -70, y: 10, r: -14 },
			{ x: 0, y: -12, r: -2 },
			{ x: 70, y: 14, r: 12 }
		];
		function offset(card, i, axis) {
			var g = grid.getBoundingClientRect();
			var c = card.getBoundingClientRect();
			var gx = g.left + g.width / 2;
			var gy = g.top + g.height / 2;
			var cx = c.left + c.width / 2;
			var cy = c.top + c.height / 2;
			var f = fan[i] || fan[1];
			return axis === 'x' ? gx - cx + f.x : gy - cy + f.y;
		}
		var tl = gsap.timeline({
			scrollTrigger: {
				trigger: grid,
				start: 'top 95%',
				end: 'top 35%',
				scrub: 0.6,
				invalidateOnRefresh: true
			}
		});
		cards.forEach(function (card, i) {
			var f = fan[i] || fan[1];
			tl.fromTo(card, {
				x: function () { return offset(card, i, 'x'); },
				y: function () { return offset(card, i, 'y'); },
				rotate: f.r
			}, {
				x: 0,
				y: 0,
				rotate: 0,
				ease: 'none',
				force3D: true,
				duration: 1,
				immediateRender: true
			}, 0);
		});
	}

	function initEnquiryForm() {
		var section = document.querySelector('.ef');
		if (!section) {
			return;
		}
		var form = section.querySelector('[data-ef-form]');
		var thanks = section.querySelector('[data-ef-thanks]');
		var panel = section.querySelector('[data-ef-panel]');
		var copy = section.querySelector('[data-ef-copy]');
		if (gsap && ScrollTrigger && !reduceMotion) {
			var mobile = window.matchMedia('(max-width: 767px)').matches;
			var tl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 95%', once: true } });
			tl.fromTo(panel, { clipPath: mobile ? 'polygon(0 0, 0 0, 0 100%, 0 82%)' : 'polygon(16% 0, 16% 0, 0 100%, 0 100%)' }, { clipPath: mobile ? 'polygon(0 0, 100% 0, 100% 100%, 0 82%)' : 'polygon(16% 0, 100% 0, 100% 100%, 0 100%)', duration: 1.3, ease: 'power3.inOut' })
				.from(copy.children, { x: -40, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, 0.7)
				.from(form.children, { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.07, ease: 'power2.out' }, 0.2);
		}
		if (!form || !thanks) {
			return;
		}
		var rules = {
			'ef-name': function (v) {
				if (!v) { return 'Please enter your name.'; }
				if (v.length < 2) { return 'Name must be at least 2 characters.'; }
				if (v.length > 60) { return 'Name must be under 60 characters.'; }
				if (!/^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F .'-]*$/.test(v)) { return 'Name can only contain letters, spaces, dots, hyphens and apostrophes.'; }
				return '';
			},
			'ef-email': function (v) {
				if (!v) { return 'Please enter your email address.'; }
				if (v.length > 120 || !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(v)) { return 'Please enter a valid email address, e.g. name@company.com.'; }
				return '';
			},
			'ef-phone': function (v) {
				var digits = v.replace(/\D/g, '');
				if (!v) { return 'Please enter your phone number.'; }
				if (!/^\+?[0-9\s()-]+$/.test(v)) { return 'Phone number can only contain digits, spaces, +, - and brackets.'; }
				if (v.charAt(0) !== '+' && digits.length === 10 && !/^[6-9]/.test(digits)) { return 'Please enter a valid 10-digit mobile number.'; }
				if (digits.length < 10 || digits.length > 15) { return 'Phone number must have 10 to 15 digits.'; }
				return '';
			},
			'ef-company': function (v) {
				if (!v) { return ''; }
				if (v.length < 2) { return 'Company name must be at least 2 characters.'; }
				if (v.length > 100) { return 'Company name must be under 100 characters.'; }
				return '';
			},
			'ef-details': function (v) {
				if (!v) { return 'Please tell us about your project.'; }
				if (v.length < 20) { return 'Please add a little more detail (at least 20 characters).'; }
				if (v.length > 2000) { return 'Project details must be under 2000 characters.'; }
				return '';
			}
		};
		var inputs = form.querySelectorAll('.ef-field__input');
		inputs.forEach(function (input) {
			var err = document.createElement('span');
			err.className = 'ef-field__error';
			err.id = input.id + '-error';
			input.closest('.ef-field').appendChild(err);
			input.setAttribute('aria-describedby', err.id);
		});
		function check(input) {
			var rule = rules[input.id];
			var msg = rule ? rule(input.value.trim()) : '';
			var field = input.closest('.ef-field');
			field.classList.toggle('is-invalid', !!msg);
			field.querySelector('.ef-field__error').textContent = msg;
			input.setAttribute('aria-invalid', msg ? 'true' : 'false');
			return !msg;
		}
		inputs.forEach(function (input) {
			input.addEventListener('blur', function () {
				if (input.value.trim() || input.closest('.ef-field').classList.contains('is-invalid')) {
					check(input);
				}
			});
			input.addEventListener('input', function () {
				if (input.closest('.ef-field').classList.contains('is-invalid')) {
					check(input);
				}
			});
		});
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			var ok = true;
			inputs.forEach(function (input) {
				if (!check(input) && ok) {
					input.focus();
					ok = false;
				}
			});
			if (!ok) {
				return;
			}
			var endpoint = form.getAttribute('data-endpoint') || '';
			var submitBtn = form.querySelector('.ef__submit');
			var status = form.querySelector('[data-ef-status]');
			var btnText = submitBtn ? submitBtn.textContent : '';
			function fail(msg) {
				if (submitBtn) {
					submitBtn.disabled = false;
					submitBtn.textContent = btnText;
				}
				if (status) {
					status.textContent = msg || 'Sorry, your enquiry could not be sent. Please try again or email us directly.';
					status.hidden = false;
				}
			}
			if (!/^https:\/\/script\.google\.com\//.test(endpoint)) {
				fail('The form is not connected yet. Please email us directly.');
				return;
			}
			if (status) {
				status.hidden = true;
			}
			if (submitBtn) {
				submitBtn.disabled = true;
			}
			var body = new URLSearchParams(new FormData(form));
			body.append('page', window.location.href);
			fetch(endpoint, { method: 'POST', body: body, mode: 'no-cors', keepalive: true }).catch(function () {});
			done();
		});
		function done() {
			var left = form.parentNode;
			left.style.minHeight = left.offsetHeight + 'px';
			function showThanks() {
				form.hidden = true;
				thanks.hidden = false;
				if (gsap && !reduceMotion) {
					gsap.from(thanks.children, { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.6)' });
				}
			}
			if (gsap && !reduceMotion) {
				gsap.to(form, { y: -20, autoAlpha: 0, duration: 0.4, ease: 'power2.in', onComplete: showThanks });
			} else {
				showThanks();
			}
		}
	}

	function initFaq() {
		var list = document.querySelector('[data-faq]');
		if (!list) {
			return;
		}
		var items = list.querySelectorAll('[data-faq-item]');
		var animate = gsap && !reduceMotion;
		function close(item) {
			var a = item.querySelector('.faq-item__a');
			if (!animate) {
				item.open = false;
				return;
			}
			gsap.to(a, { height: 0, duration: 0.4, ease: 'power2.inOut', onComplete: function () {
				item.open = false;
				gsap.set(a, { clearProps: 'height' });
			} });
		}
		function open(item) {
			var a = item.querySelector('.faq-item__a');
			item.open = true;
			if (animate) {
				gsap.fromTo(a, { height: 0 }, { height: 'auto', duration: 0.5, ease: 'power2.out', clearProps: 'height' });
				gsap.fromTo(a.firstElementChild, { y: -8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.1, ease: 'power2.out' });
			}
		}
		items.forEach(function (item) {
			item.querySelector('summary').addEventListener('click', function (e) {
				e.preventDefault();
				if (item.open) {
					close(item);
					return;
				}
				items.forEach(function (other) {
					if (other !== item && other.open) {
						close(other);
					}
				});
				open(item);
			});
		});
		if (animate && ScrollTrigger) {
			gsap.from(items, { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: list, start: 'top 95%', once: true } });
		}
	}

	function initServicesTyping(hero) {
		var el = hero.querySelector('[data-sh-type]');
		if (!el) {
			return;
		}
		var words = (el.getAttribute('data-words') || '').split('|');
		if (reduceMotion || words.length < 2) {
			return;
		}
		var w = 0;
		var i = words[0].length;
		var deleting = true;
		function tick() {
			var word = words[w];
			if (deleting) {
				i--;
				el.textContent = word.slice(0, i);
				if (i <= 0) {
					deleting = false;
					w = (w + 1) % words.length;
					setTimeout(tick, 350);
					return;
				}
				setTimeout(tick, 45);
			} else {
				i++;
				el.textContent = words[w].slice(0, i);
				if (i >= words[w].length) {
					deleting = true;
					setTimeout(tick, 2000);
					return;
				}
				setTimeout(tick, 90);
			}
		}
		setTimeout(tick, 3200);
	}

	function initServicesHero() {
		var hero = document.querySelector('.sh');
		if (!hero) {
			return;
		}
		initServicesTyping(hero);
		if (!gsap || reduceMotion) {
			return;
		}
		var tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 });
		tl.from(hero.querySelectorAll('[data-sh-word]'), { yPercent: 110, rotate: 3, duration: 1.1, stagger: 0.14 }, 0.1)
			.from(hero.querySelector('.sh__text'), { y: 30, autoAlpha: 0, filter: 'blur(6px)', duration: 0.9 }, 0.55)
			.from(hero.querySelector('[data-sh-btn]'), { y: 24, scale: 0.9, autoAlpha: 0, duration: 0.8, ease: 'back.out(1.6)' }, 0.75);
		function countUp(timeline, els, attr, at) {
			els.forEach(function (el, i) {
				var end = parseInt(el.getAttribute(attr), 10);
				var start = parseInt(el.getAttribute(attr.replace('count', 'from')) || '0', 10);
				var obj = { v: start };
				el.textContent = start;
				timeline.to(obj, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(obj.v); } }, at + i * 0.3);
			});
		}
		if (window.matchMedia('(min-width: 768px)').matches) {
			tl.from(hero.querySelector('[data-sh-line]'), { scaleX: 0, duration: 1.4, ease: 'power2.inOut' }, 0.9)
				.from(hero.querySelectorAll('.sh-tl__dot'), { scale: 0, duration: 0.5, stagger: 0.3, ease: 'back.out(2)' }, 1)
				.from(hero.querySelectorAll('.sh-tl__num, .sh-tl__label'), { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, 1.05);
			countUp(tl, hero.querySelectorAll('[data-sh-count]'), 'data-sh-count', 1.05);
			return;
		}
		var grid = document.querySelector('[data-ss]');
		if (!grid || !ScrollTrigger) {
			return;
		}
		var st = gsap.timeline({ scrollTrigger: { trigger: grid, start: 'top 95%', once: true } });
		st.fromTo(grid, { '--ss-plus': 0 }, { '--ss-plus': 1, duration: 1, ease: 'power2.inOut' }, 0)
			.from(grid.querySelectorAll('.ss__num, .ss__label'), { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0.2);
		countUp(st, grid.querySelectorAll('[data-ss-count]'), 'data-ss-count', 0.2);
	}

	function initServiceCards() {
		var section = document.querySelector('.sv');
		if (!section || !window.Swiper) {
			return;
		}
		var dotsBox = section.querySelector('[data-sv-dots]');
		var count = section.querySelectorAll('.svSwiper .swiper-slide').length;
		var dots = [];
		var mobile = window.matchMedia('(max-width: 767px)');
		var animate = gsap && !reduceMotion;

		function play(slide) {
			if (!animate || !slide) {
				return;
			}
			var media = slide.querySelector('[data-sv-media]');
			var full = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
			var shape = mobile.matches ? full : 'polygon(0 0, 100% 0, 84% 100%, 0 100%)';
			var tl = gsap.timeline();
			tl.fromTo(media, { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }, { clipPath: shape, duration: 1.1, ease: 'power3.inOut', clearProps: mobile.matches ? 'clipPath' : '' }, 0);
			var img = media.querySelector('img');
			if (img) {
				tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0);
			}
			tl.fromTo(slide.querySelectorAll('[data-sv-anim]'), { y: 28, autoAlpha: 0, filter: 'blur(4px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'filter' }, 0.35)
				.fromTo(slide.querySelectorAll('.sv-card__pills li'), { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.8)' }, 0.6)
				.fromTo(slide.querySelector('[data-sv-steps]'), { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }, 0.8);
		}

		var swiper = new Swiper(section.querySelector('.svSwiper'), {
			direction: 'vertical',
			rewind: true,
			speed: 900,
			allowTouchMove: true,
			mousewheel: { releaseOnEdges: true, thresholdDelta: 20 },
			keyboard: { enabled: true, onlyInViewport: true },
			autoplay: reduceMotion ? false : { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true },
			pagination: { el: section.querySelector('.sv-progress'), type: 'progressbar', progressbarOpposite: true },
			on: {
				slideChangeTransitionStart: function (s) {
					dots.forEach(function (d, i) {
						d.classList.toggle('is-active', i === s.realIndex);
						d.setAttribute('aria-current', i === s.realIndex ? 'true' : 'false');
					});
					play(s.slides[s.activeIndex]);
				}
			}
		});

		for (var i = 0; i < count; i++) {
			(function (n) {
				var b = document.createElement('button');
				b.type = 'button';
				b.className = 'sv__dot' + (n === 0 ? ' is-active' : '');
				b.setAttribute('aria-label', 'Go to service ' + (n + 1));
				b.addEventListener('click', function () {
					swiper.slideTo(n);
				});
				dotsBox.appendChild(b);
				dots.push(b);
			})(i);
		}

		if (swiper.autoplay) {
			swiper.autoplay.stop();
		}
		var hash = window.location.hash.slice(1);
		var target = hash ? section.querySelector('.svSwiper .swiper-slide[data-hash="' + hash + '"]') : null;
		if (target) {
			var slides = Array.prototype.slice.call(section.querySelectorAll('.svSwiper .swiper-slide'));
			swiper.slideTo(slides.indexOf(target), 0);
			setTimeout(function () {
				section.querySelector('.sv__dark').scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 300);
		}
		if (animate && ScrollTrigger) {
			gsap.from(section.querySelector('[data-sv-head]'), { y: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 95%', once: true } });
			ScrollTrigger.create({
				trigger: section.querySelector('.sv__dark'),
				start: 'top 95%',
				once: true,
				onEnter: function () {
					play(swiper.slides[swiper.activeIndex]);
					if (swiper.autoplay) {
						swiper.autoplay.start();
					}
				}
			});
		} else if (swiper.autoplay && !reduceMotion) {
			swiper.autoplay.start();
		}
	}

	function initWorkPage() {
		var page = document.querySelector('.wk');
		if (!page) {
			return;
		}
		var animate = gsap && !reduceMotion;
		var social = page.querySelector('.wkSocialSwiper');
		if (social && window.Swiper) {
			new Swiper(social, {
				slidesPerView: 'auto',
				spaceBetween: 24,
				loop: true,
				speed: reduceMotion ? 300 : 5000,
				autoplay: reduceMotion ? false : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true },
				breakpoints: { 0: { spaceBetween: 14 }, 768: { spaceBetween: 24 } }
			});
		}
		initReels(page);

		var filters = page.querySelectorAll('[data-filter]');
		var cases = page.querySelectorAll('[data-cases] .wk-case');
		var grid = page.querySelector('[data-cases]');
		var moreBtn = page.querySelector('[data-cases-more]');
		var current = 'all';
		var rowsShown = 2;

		function columns() {
			if (!grid) {
				return 1;
			}
			var cols = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(function (v) {
				return v.trim() !== '';
			}).length;
			return cols || 1;
		}

		function renderCases(newFrom) {
			var limit = rowsShown * columns();
			var matched = 0;
			var fresh = [];
			cases.forEach(function (c) {
				var on = current === 'all' || c.getAttribute('data-cat') === current;
				c.classList.toggle('is-hidden', !on);
				if (on) {
					matched++;
					var visible = matched <= limit;
					c.classList.toggle('is-collapsed', !visible);
					if (visible && matched > newFrom) {
						fresh.push(c);
					}
				} else {
					c.classList.remove('is-collapsed');
				}
			});
			if (moreBtn) {
				moreBtn.hidden = matched <= limit;
			}
			return fresh;
		}

		function showCases(list) {
			if (animate && list.length) {
				gsap.fromTo(list, { y: 30, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' });
			}
		}

		renderCases(Infinity);

		filters.forEach(function (btn) {
			btn.setAttribute('aria-pressed', btn.classList.contains('is-active') ? 'true' : 'false');
			btn.addEventListener('click', function () {
				current = btn.getAttribute('data-filter');
				rowsShown = 2;
				filters.forEach(function (b) {
					b.classList.toggle('is-active', b === btn);
					b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
				});
				showCases(renderCases(0));
			});
		});

		if (moreBtn) {
			moreBtn.addEventListener('click', function (e) {
				e.preventDefault();
				var before = rowsShown * columns();
				rowsShown += 2;
				showCases(renderCases(before));
			});
		}

		var lastCols = columns();
		window.addEventListener('resize', function () {
			var cols = columns();
			if (cols !== lastCols) {
				lastCols = cols;
				renderCases(Infinity);
			}
		});

		if (!animate) {
			return;
		}
		gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 })
			.from(page.querySelectorAll('.wk-hero [data-word]'), { yPercent: 110, rotate: 3, duration: 1.1, stagger: 0.15 })
			.from(page.querySelector('.wk-hero .eyebrow'), { y: 20, autoAlpha: 0, duration: 0.6 }, 0)
			.from(page.querySelector('.wk-hero__text'), { y: 30, autoAlpha: 0, filter: 'blur(6px)', duration: 0.9, clearProps: 'filter' }, 0.5)
			.from(page.querySelector('.wk-hero__actions'), { y: 24, autoAlpha: 0, duration: 0.7 }, 0.7)
			.from(page.querySelector('.wk-hero__strip'), { y: 30, autoAlpha: 0, duration: 0.9 }, 0.9);
		gsap.to(page.querySelector('.wk-hero__blob--a'), { x: -60, y: 50, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
		gsap.to(page.querySelector('.wk-hero__blob--b'), { x: 60, y: -40, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });

		if (!ScrollTrigger) {
			return;
		}
		gsap.from(page.querySelectorAll('[data-tile]'), { y: 60, autoAlpha: 0, scale: 0.94, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: page.querySelector('.wk-results__grid'), start: 'top 95%', once: true } });
		page.querySelectorAll('[data-count]').forEach(function (el) {
			var end = parseInt(el.getAttribute('data-count'), 10);
			if (!end) {
				return;
			}
			var o = { v: 0 };
			gsap.to(o, { v: end, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 95%', once: true }, onUpdate: function () { el.textContent = Math.round(o.v).toLocaleString('en-US'); } });
		});
		gsap.from(cases, { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: page.querySelector('[data-cases]'), start: 'top 95%', once: true } });
		gsap.from(page.querySelectorAll('[data-social] .wk-phone'), { y: 60, rotate: 4, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: page.querySelector('[data-social]'), start: 'top 95%', once: true } });
		page.querySelectorAll('[data-site]').forEach(function (site, i) {
			var dir = i % 2 ? 1 : -1;
			gsap.timeline({ scrollTrigger: { trigger: site, start: 'top 95%', once: true } })
				.from(site.querySelector('.wk-laptop'), { x: 80 * dir, autoAlpha: 0, duration: 1, ease: 'power3.out' })
				.from(site.querySelector('.wk-mobile'), { y: 80, rotate: 8, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.4)' }, 0.3)
				.from(site.querySelectorAll('.wk-site__info > *'), { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 0.3);
			gsap.to(site.querySelector('.wk-mobile'), { y: -40, ease: 'none', scrollTrigger: { trigger: site, start: 'top bottom', end: 'bottom top', scrub: true } });
		});
		gsap.from(page.querySelectorAll('[data-ind]'), { y: 50, autoAlpha: 0, rotateX: -30, transformOrigin: 'top center', duration: 0.8, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: page.querySelector('.wk-ind__grid'), start: 'top 95%', once: true } });
	}

	function init404() {
		var nf = document.querySelector('.nf');
		if (!nf || !gsap || reduceMotion) {
			return;
		}
		var digits = nf.querySelectorAll('[data-nf-digit]');
		gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 })
			.from(digits, { yPercent: 120, rotate: function (i) { return [-12, 0, 12][i]; }, autoAlpha: 0, duration: 1.2, stagger: 0.12 })
			.from(nf.querySelectorAll('[data-nf-fade]'), { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, 0.6);
		gsap.to(nf.querySelector('.nf__zero'), { y: -14, rotate: 6, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.4 });
		nf.addEventListener('mousemove', function (e) {
			var x = (e.clientX / window.innerWidth - 0.5) * 30;
			var y = (e.clientY / window.innerHeight - 0.5) * 20;
			gsap.to(nf.querySelector('.nf__code'), { x: x, y: y * 0.5, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
		});
	}

	function initContactHero() {
		var hero = document.querySelector('.ch');
		if (!hero) {
			return;
		}
		var bubbles = hero.querySelectorAll('[data-ch-bubble]');
		if (!window.gsap || reduceMotion) {
			bubbles.forEach(function (b) { b.classList.add('is-sent'); });
			return;
		}
		var tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 });
		tl.from(hero.querySelector('.ch__eyebrow'), { y: 20, autoAlpha: 0, duration: 0.7 })
			.from(hero.querySelectorAll('[data-ch-word]'), { yPercent: 110, rotate: 4, duration: 1.1, stagger: 0.12 }, 0.15)
			.from(hero.querySelector('.ch__text'), { y: 30, autoAlpha: 0, filter: 'blur(6px)', duration: 0.9 }, 0.55)
			.from(hero.querySelector('.ch__content .primary-btn'), { y: 24, scale: 0.9, autoAlpha: 0, duration: 0.8, ease: 'back.out(1.6)' }, 0.75)
			.from(hero.querySelectorAll('.ch-icon'), { scale: 0, autoAlpha: 0, duration: 0.7, stagger: { each: 0.07, from: 'random' }, ease: 'back.out(1.8)' }, 0.4)
			.from(hero.querySelectorAll('.ch-star'), { autoAlpha: 0, duration: 0.8, stagger: 0.15 }, 1)
			.from(bubbles, { scale: 0, autoAlpha: 0, transformOrigin: '100% 100%', duration: 0.6, stagger: 0.8, ease: 'back.out(1.8)' }, 1.3)
			.call(function () {
				bubbles.forEach(function (b, i) {
					setTimeout(function () { b.classList.add('is-sent'); }, 1400 + i * 1200);
				});
			});

		var icons = gsap.utils.toArray(hero.querySelectorAll('.ch-icon'));
		if (window.matchMedia('(hover: hover)').matches) {
			hero.addEventListener('mousemove', function (e) {
				var r = hero.getBoundingClientRect();
				var x = (e.clientX - r.left) / r.width - 0.5;
				var y = (e.clientY - r.top) / r.height - 0.5;
				icons.forEach(function (icon, i) {
					var depth = 10 + (i % 4) * 8;
					gsap.to(icon, { x: x * depth, y: y * depth, duration: 0.8, ease: 'power2.out' });
				});
			});
			hero.addEventListener('mouseleave', function () {
				gsap.to(icons, { x: 0, y: 0, duration: 1, ease: 'power2.out' });
			});
		}
	}

	function initReels(scope) {
		var videos = scope.querySelectorAll('video[data-reel]');
		if (!videos.length) {
			return;
		}
		function load(v) {
			if (!v.getAttribute('src')) {
				v.src = v.getAttribute('data-reel') + '#t=0.1';
				v.preload = 'metadata';
			}
		}
		if (!('IntersectionObserver' in window)) {
			videos.forEach(load);
			return;
		}
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				var v = e.target;
				if (e.isIntersecting) {
					load(v);
					if (!reduceMotion) {
						var p = v.play();
						if (p && p.catch) {
							p.catch(function () {});
						}
					}
				} else if (!v.paused) {
					v.pause();
				}
			});
		}, { rootMargin: '200px 0px', threshold: 0.2 });
		videos.forEach(function (v) {
			io.observe(v);
		});
	}

	function initGridWarp() {
		var canvas = document.querySelector('[data-grid-warp]');
		if (!canvas || !canvas.getContext) {
			return;
		}
		var hero = canvas.parentElement;
		var ctx = canvas.getContext('2d');
		var gap = 32;
		var radius = 190;
		var push = 26;
		var w = 0;
		var h = 0;
		var mouse = { x: -9999, y: -9999 };
		var pos = { x: -9999, y: -9999 };
		var strength = 0;
		var target = 0;
		var raf = 0;

		function resize() {
			var dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = hero.clientWidth;
			h = hero.clientHeight;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			draw();
		}

		function point(x, y) {
			var dx = x - pos.x;
			var dy = y - pos.y;
			var d = Math.sqrt(dx * dx + dy * dy);
			var f = d < radius ? (1 - d / radius) * strength : 0;
			var k = d > 0 ? (f * f * push) / d : 0;
			return { x: x + dx * k, y: y + dy * k, f: f };
		}

		function draw() {
			ctx.clearRect(0, 0, w, h);
			var cols = Math.ceil(w / gap) + 1;
			var rows = Math.ceil(h / gap) + 1;
			var ox = (w - (cols - 1) * gap) / 2;
			var oy = (h - (rows - 1) * gap) / 2;
			var grid = [];
			var r;
			var c;
			for (r = 0; r < rows; r++) {
				grid[r] = [];
				for (c = 0; c < cols; c++) {
					grid[r][c] = point(ox + c * gap, oy + r * gap);
				}
			}
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'rgba(15, 51, 156, 0.07)';
			ctx.beginPath();
			for (r = 0; r < rows; r++) {
				for (c = 0; c < cols; c++) {
					var p = grid[r][c];
					if (c === 0) { ctx.moveTo(p.x, p.y); } else { ctx.lineTo(p.x, p.y); }
				}
			}
			for (c = 0; c < cols; c++) {
				for (r = 0; r < rows; r++) {
					var q = grid[r][c];
					if (r === 0) { ctx.moveTo(q.x, q.y); } else { ctx.lineTo(q.x, q.y); }
				}
			}
			ctx.stroke();
			for (r = 0; r < rows; r++) {
				for (c = 0; c < cols; c++) {
					var d = grid[r][c];
					ctx.fillStyle = 'rgba(15, 51, 156, ' + (0.14 + d.f * 0.6) + ')';
					ctx.beginPath();
					ctx.arc(d.x, d.y, 1 + d.f * 2.4, 0, Math.PI * 2);
					ctx.fill();
				}
			}
			if (strength > 0.05) {
				ctx.fillStyle = 'rgba(249, 120, 53, ' + strength + ')';
				ctx.beginPath();
				ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		function tick() {
			pos.x += (mouse.x - pos.x) * 0.18;
			pos.y += (mouse.y - pos.y) * 0.18;
			strength += (target - strength) * 0.12;
			draw();
			var moving = Math.abs(mouse.x - pos.x) > 0.3 || Math.abs(mouse.y - pos.y) > 0.3 || Math.abs(target - strength) > 0.01;
			raf = moving ? requestAnimationFrame(tick) : 0;
		}

		function start() {
			if (!raf) {
				raf = requestAnimationFrame(tick);
			}
		}

		resize();
		window.addEventListener('resize', resize);

		if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
			return;
		}

		hero.addEventListener('mousemove', function (e) {
			var rect = hero.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
			if (target === 0) {
				pos.x = mouse.x;
				pos.y = mouse.y;
			}
			target = 1;
			start();
		});
		hero.addEventListener('mouseleave', function () {
			target = 0;
			start();
		});
	}

	document.addEventListener('DOMContentLoaded', function () {
		if (gsap && ScrollTrigger) {
			gsap.registerPlugin(ScrollTrigger);
		}

		initHeader();
		initHeroCombo();
		initGridWarp();
		initAbout();
		initPlatforms();
		initAccordions();
		initIndustries();
		initFooterAccordion();
		initAboutMission();
		initAboutStory();
		initBannerVideo();
		initAboutWhy();
		initContactHero();
		initContactCards();
		initEnquiryForm();
		initFaq();
		initServicesHero();
		initServiceCards();
		initWorkPage();
		init404();

		if (!gsap || !ScrollTrigger || reduceMotion) {
			return;
		}

		initHero();
		initReveals();
		initAboutReveal();
		initServices();
		initFooter();
	});
})();
