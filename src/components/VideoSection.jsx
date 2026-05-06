import videoSrc from "../assets/videos/Info_Torneo_Basket.mp4";
import { useReveal } from "../hooks/useReveal.js";

function VideoSection() {
    const ref = useReveal();
    return (
        <section className="video-section">
            <div ref={ref} className="video-wrapper reveal">
                <video
                    className="video-player"
                    src={videoSrc}
                    controls
                    preload="metadata"
                    playsInline
                >
                    Tu navegador no soporta la reproducción de vídeo.
                </video>
            </div>
        </section>
    );
}

export default VideoSection;
