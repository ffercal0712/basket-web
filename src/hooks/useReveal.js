import { useCallback, useEffect, useState } from 'react';

export function useReveal(rootMargin = '-60px 0px') {
    const [node, setNode] = useState(null);

    const ref = useCallback((nextNode) => {
        setNode(nextNode);
    }, []);

    useEffect(() => {
        if (!node) return undefined;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add('is-revealed');
                    obs.disconnect();
                }
            },
            { rootMargin }
        );

        obs.observe(node);
        return () => obs.disconnect();
    }, [node, rootMargin]);

    return ref;
}
