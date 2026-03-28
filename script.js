document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.tiktok-video');

    // 1. Play/Pause on click
    videos.forEach(video => {
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });

    // 2. Intersection Observer for Autoplay (TikTok Scroll Effect)
    const observerOptions = {
        root: document.querySelector('.feed-container'),
        rootMargin: '0px',
        threshold: 0.7 // Trigger when 70% of the video is visible
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Play video when it comes into view
                video.play().catch(err => console.log("Autoplay prevented:", err));
            } else {
                // Pause and reset video when it leaves view
                video.pause();
                video.currentTime = 0;
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    videos.forEach(video => {
        observer.observe(video);
    });
});
