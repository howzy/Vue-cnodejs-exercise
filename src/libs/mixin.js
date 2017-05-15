export const loadMore = {
	directives: {
		'load-more': {
			bind: (el, binding) => {
				let windowHeight = window.screen.height;
				let height;
				let setTop;

				window.addEventListener('scroll', () => {
					height = el.clientHeight;
					setTop = el.offsetTop;
					loadMore();
				}, false)

				const loadMore = () => {
					if (document.body.scrollTop + windowHeight >= height + setTop) {
						binding.value();
					}
				}
			}
		}
	}
};