// Play an Animate.css animation by adding the animation class and then removing it

const AnimationName = {
    bounce: "animate__bounce",
    flash: "animate__flash",
    pulse: "animate__pulse",
    rubberBand: "animate__rubberBand",
    shakeX: "animate__shakeX",
    headShake: "animate__headShake",
    swing: "animate__swing",
    tada: "animate__tada",
    wobble: "animate__wobble",
    jello: "animate__jello",
    heartBeat: "animate__heartBeat"
} as const;

type AnimationNameKey = keyof typeof AnimationName

function PlayAnimation(el: HTMLElement, name: AnimationNameKey) {
        el.classList.add(AnimationName[name], "animate__animated");
        const handleEnd = () => {
            el.classList.remove(AnimationName[name], "animate__animated");
            el.removeEventListener("animationend", handleEnd);
        };
        el.addEventListener("animationend", handleEnd);
}

export default PlayAnimation;