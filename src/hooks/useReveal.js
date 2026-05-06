import { useEffect, useRef } from 'react';

export function useReveal(rootMargin = '-60px 0px') {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-revealed');
                    obs.disconnect();
                }
            },
            { rootMargin }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [rootMargin]);
    return ref;
}
