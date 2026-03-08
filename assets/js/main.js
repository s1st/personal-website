/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
	Rewritten to vanilla JS — no jQuery dependency
*/

(function() {

	var body = document.body,
		wrapper = document.getElementById('wrapper'),
		header = document.getElementById('header'),
		footer = document.getElementById('footer'),
		main = document.getElementById('main'),
		articles = Array.from(main.querySelectorAll(':scope > article'));

	// Breakpoints.
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '361px',   '480px'  ],
		xxsmall:  [ null,      '360px'  ]
	});

	// Play initial animations on page load.
	window.addEventListener('load', function() {
		setTimeout(function() {
			body.classList.remove('is-preload');
		}, 100);
	});

	// Nav.
	var nav = header.querySelector('nav'),
		navItems = Array.from(nav.querySelectorAll('li'));

	// Add "middle" alignment classes if we're dealing with an even number of items.
	if (navItems.length % 2 === 0) {
		nav.classList.add('use-middle');
		navItems[navItems.length / 2].classList.add('is-middle');
	}

	// Main.
	var delay = 325,
		locked = false;

	function showArticle(id, initial) {

		var article = main.querySelector('#' + id);

		// No such article? Bail.
		if (!article)
			return;

		// Already locked? Speed through "show" steps w/o delays.
		if (locked || (typeof initial !== 'undefined' && initial === true)) {

			body.classList.add('is-switching');
			body.classList.add('is-article-visible');

			articles.forEach(function(a) { a.classList.remove('active'); });

			header.style.display = 'none';
			footer.style.display = 'none';

			main.style.display = '';
			article.style.display = '';

			article.classList.add('active');

			locked = false;

			setTimeout(function() {
				body.classList.remove('is-switching');
			}, (initial ? 1000 : 0));

			return;
		}

		// Lock.
		locked = true;

		// Article already visible? Just swap articles.
		if (body.classList.contains('is-article-visible')) {

			var current = main.querySelector('article.active');

			if (current)
				current.classList.remove('active');

			setTimeout(function() {

				if (current)
					current.style.display = 'none';

				article.style.display = '';
				article.classList.add('active');

				setTimeout(function() {
					locked = false;
				}, delay);

			}, 25);

		}

		// Otherwise, handle as normal.
		else {

			body.classList.add('is-article-visible');

			articles.forEach(function(a) { a.classList.remove('active'); });

			header.style.display = 'none';
			footer.style.display = 'none';

			main.style.display = '';
			article.style.display = '';

			article.classList.add('active');

			setTimeout(function() {
				locked = false;
			}, delay);

		}

	}

	function hideArticle(addState) {

		var article = main.querySelector('article.active');

		// Article not visible? Bail.
		if (!body.classList.contains('is-article-visible'))
			return;

		// Add state?
		if (typeof addState !== 'undefined' && addState === true)
			history.pushState(null, null, '#');

		// Already locked? Speed through "hide" steps w/o delays.
		if (locked) {

			body.classList.add('is-switching');

			if (article)
				article.classList.remove('active');

			if (article)
				article.style.display = 'none';
			main.style.display = 'none';

			footer.style.display = '';
			header.style.display = '';

			body.classList.remove('is-article-visible');

			locked = false;

			body.classList.remove('is-switching');

			window.scrollTo(0, 0);

			return;

		}

		// Lock.
		locked = true;

		// Deactivate article.
		if (article)
			article.classList.remove('active');

		// Hide article.
		setTimeout(function() {

			if (article)
				article.style.display = 'none';
			main.style.display = 'none';

			footer.style.display = '';
			header.style.display = '';

			setTimeout(function() {

				body.classList.remove('is-article-visible');

				window.scrollTo(0, 0);

				setTimeout(function() {
					locked = false;
				}, delay);

			}, 25);

		}, delay);

	}

	// Articles — add close buttons and stop propagation.
	articles.forEach(function(article) {

		var close = document.createElement('div');
		close.className = 'close';
		close.textContent = 'Close';
		article.appendChild(close);

		close.addEventListener('click', function() {
			location.hash = '';
		});

		article.addEventListener('click', function(event) {
			event.stopPropagation();
		});

	});

	// Events.
	body.addEventListener('click', function(event) {
		if (body.classList.contains('is-article-visible'))
			hideArticle(true);
	});

	window.addEventListener('keyup', function(event) {
		if (event.keyCode === 27) {
			if (body.classList.contains('is-article-visible'))
				hideArticle(true);
		}
	});

	window.addEventListener('hashchange', function(event) {

		// Empty hash?
		if (location.hash === '' || location.hash === '#') {
			event.preventDefault();
			event.stopPropagation();
			hideArticle();
		}

		// Otherwise, check for a matching article.
		else if (main.querySelector('article' + location.hash)) {
			event.preventDefault();
			event.stopPropagation();
			showArticle(location.hash.substr(1));
		}

	});

	// Scroll restoration.
	if ('scrollRestoration' in history)
		history.scrollRestoration = 'manual';
	else {

		var oldScrollPos = 0,
			scrollPos = 0;

		window.addEventListener('scroll', function() {
			oldScrollPos = scrollPos;
			scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
		});

		window.addEventListener('hashchange', function() {
			window.scrollTo(0, oldScrollPos);
		});

	}

	// Initialize.

	// Hide main, articles.
	main.style.display = 'none';
	articles.forEach(function(a) { a.style.display = 'none'; });

	// Initial article.
	if (location.hash !== '' && location.hash !== '#')
		window.addEventListener('load', function() {
			showArticle(location.hash.substr(1), true);
		});

})();
