const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const toggleScreen = player.querySelector('.toggleScreen');

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';  //coz caused is a property on the video and play is not
	video[method]();
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRateUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent  = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis= `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function switchScreen(e) {
	console.log(e);
	this.textContent = "»«" ;
	// top.window.resizeBy(500, 500);
	if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
	}
}

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;

toggle.addEventListener('click', togglePlay);
toggleScreen.addEventListener('click', switchScreen);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRateUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


