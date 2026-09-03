import { useEffect, useRef } from 'react';


const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (ref.current) {
          ref.current.classList.toggle("show", entry.isIntersecting);
        }
      },
      { threshold: 0.0 }
    );

    if(ref.current) 
      observer.observe(ref.current);
    
    return () => {
      if (ref.current)
        observer.unobserve(ref.current);
    };
  }, []);

  return <div ref={ref} className="hidden">{children}</div>
};


export default RevealOnScroll;

