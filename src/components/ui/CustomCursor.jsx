'use client';

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let isVisible = false;
    let isMouseDown = false;
    let currentMode = 'default'; // 'default' | 'link' | 'product' | 'drag'
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
      }

      // Check hovered element
      const target = e.target;
      if (!target) return;

      const isProduct = target.closest('.product-card') || target.closest('[data-cursor="product"]') || target.closest('.product-card-image-box');
      const isDrag = target.closest('[data-cursor="drag"]') || target.closest('.drag-carousel');
      const isInteractive =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer');

      let nextMode = 'default';
      if (isProduct) {
        nextMode = 'product';
      } else if (isDrag) {
        nextMode = 'drag';
      } else if (isInteractive) {
        nextMode = 'link';
      }

      if (nextMode !== currentMode) {
        currentMode = nextMode;
        updateCursorClasses(currentMode, isMouseDown);
      }
    };

    const updateCursorClasses = (mode, pressed) => {
      cursor.className = 'luxury-cursor';

      if (mode === 'product') {
        cursor.classList.add('mode-product');
        if (text) text.textContent = 'VIEW';
      } else if (mode === 'drag') {
        cursor.classList.add('mode-drag');
        if (text) text.textContent = 'DRAG';
      } else if (mode === 'link') {
        cursor.classList.add('mode-link');
        if (text) text.textContent = '';
      } else {
        if (text) text.textContent = '';
      }

      if (pressed) {
        cursor.classList.add('mode-pressed');
      }
    };

    const onMouseDown = () => {
      isMouseDown = true;
      updateCursorClasses(currentMode, true);
    };

    const onMouseUp = () => {
      isMouseDown = false;
      updateCursorClasses(currentMode, false);
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      cursor.style.opacity = '1';
    };

    // 60-120fps hardware acceleration animation loop
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.22;
      cursorY += (mouseY - cursorY) * 0.22;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) ${
        isMouseDown ? 'scale(0.82)' : 'scale(1)'
      }`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="luxury-cursor"
      aria-hidden="true"
      style={{ opacity: 0 }}
    >
      <span ref={textRef} className="cursor-text" />
    </div>
  );
}
