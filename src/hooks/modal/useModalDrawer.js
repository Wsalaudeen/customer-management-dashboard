import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to manage modal drawer lifecycle, entry/exit animations,
 * background scroll locking, and keyboard accessibility (Escape key & Focus Trap).
 */
export function useModalDrawer(isOpen, onClose) {
  const [mounted, setMounted] = useState(isOpen);
  const [isAnimated, setIsAnimated] = useState(isOpen);

  const drawerRef = useRef(null);
  const firstInputRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Drawer entrance/exit animations, body scroll lock, focus restoration
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setIsAnimated(true);
      previousActiveElement.current = document.activeElement;

      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }

      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimated(false);
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);

      document.body.style.overflow = '';

      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard accessibility: Escape key to close & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = Array.from(
          drawerRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const isVisible = isOpen || mounted;

  return {
    drawerRef,
    firstInputRef,
    isVisible,
    isAnimated,
  };
}
