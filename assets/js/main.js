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
				scrollTrigger: { trigger: el, start: 'top 85%', once: true }
			});
		});

		gsap.utils.toArray('[data-slide-right]').forEach(function (el) {
			gsap.from(el, {
				x: 80,
				autoAlpha: 0,
				duration: 1,
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

		gsap.timeline({ scrollTrigger: { trigger: track, start: 'top 80%', once: true } })
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
			scrollTrigger: { trigger: '.about', start: 'top 80%', once: true }
		});
		gsap.from('.about-card', {
			y: 80,
			autoAlpha: 0,
			duration: 1,
			stagger: 0.15,
			ease: 'power3.out',
			scrollTrigger: { trigger: '[data-about-track]', start: 'top 85%', once: true }
		});
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


	/* About Us: Our Mission image loops */
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
	  if (desk) { loops.push({ mq: '(min-width: 768px)', loop: createLoop(desk, desktopSlots(desk), 2600) }); }
	  if (mob) { loops.push({ mq: '(max-width: 767px)', loop: createLoop(mob, mobileSlots(mob), 2400) }); }

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
	    scrollTrigger: { trigger: '.am-stage', start: 'top 90%', once: true }
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

		gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 75%', once: true } })
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
				start: 'top 80%',
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
			var tl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 70%', once: true } });
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
		});
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
			gsap.from(items, { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: list, start: 'top 85%', once: true } });
		}
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
		initAboutMission();
		initAboutStory();
		initBannerVideo();
		initAboutWhy();
		initContactHero();
		initContactCards();
		initEnquiryForm();
		initFaq();

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
