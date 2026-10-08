import { useEffect, useRef, useCallback } from 'react';

export default function VaultKineticSeal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const activeFaceIndex = useRef(0);
  const lastAngle = useRef(0);
  const facesRef = useRef<HTMLDivElement[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const angleRad = Math.atan2(y, x);
    let currentAngle = (angleRad * (180 / Math.PI) + 360) % 360;

    const newFace = Math.floor(currentAngle / 30) % 12;

    if (newFace !== activeFaceIndex.current) {
      const prevStrip = facesRef.current[activeFaceIndex.current]?.querySelector('.vault-content-strip');
      if (prevStrip) prevStrip.classList.remove('lit');

      activeFaceIndex.current = newFace;

      const newStrip = facesRef.current[newFace]?.querySelector('.vault-content-strip');
      if (newStrip) newStrip.classList.add('lit');
    }

    lastAngle.current = currentAngle;

    if (lightRef.current) {
      lightRef.current.style.transform = `rotate(${currentAngle}deg)`;
    }
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 100 : 150;
    const textContent = 'FIDES \u2022 CONSEIL \u2022 PATRIMONIUM \u2022 CONFIDENTIA \u2022 ';
    const ringsCount = isMobile ? 6 : 12;

    const circumference = 2 * Math.PI * radius;
    const repetitions = Math.ceil(circumference / 120);

    wrapper.innerHTML = '';
    facesRef.current = [];

    // Create light emitter
    const lightEmitter = document.createElement('div');
    lightEmitter.className = 'vault-light-emitter';
    const lightPoint = document.createElement('div');
    lightPoint.className = 'light-point';
    lightEmitter.appendChild(lightPoint);
    wrapper.appendChild(lightEmitter);
    lightRef.current = lightEmitter;

    for (let i = 0; i < ringsCount; i++) {
      const group = document.createElement('div');
      group.className = 'vault-ring-group';

      const offset = (i - ringsCount / 2) * 15;
      group.style.transform = `rotateY(${i * (360 / ringsCount)}deg) translateZ(${offset}px)`;

      const face = document.createElement('div');
      face.className = 'vault-ring-face';

      const randomTilt = (Math.random() - 0.5) * 10;
      face.style.transform = `translateZ(${radius}px) rotateY(${(360 / ringsCount) * i}deg) rotateX(${randomTilt}deg)`;
      face.style.width = `${radius * 2}px`;
      face.style.marginLeft = `-${radius}px`;

      const strip = document.createElement('div');
      strip.className = 'vault-content-strip';
      strip.innerHTML = Array(repetitions).fill(textContent).join('&nbsp;&nbsp;&nbsp;');

      face.appendChild(strip);
      group.appendChild(face);
      wrapper.appendChild(group);

      facesRef.current.push(face);
    }

    wrapper.addEventListener('mousemove', handleMouseMove);

    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div
      className="vault-wrapper"
      ref={wrapperRef}
      style={{ width: 300, height: 300 }}
    />
  );
}
