"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const QweLogo = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const texts = ['qwe', 'qwe software services'];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentTextIndex = 0;

    const typeSequence = async () => {
      const currentFullText = texts[currentTextIndex];

      // Type out the text
      for (let i = 0; i <= currentFullText.length; i++) {
        await new Promise(resolve => {
          timeout = setTimeout(resolve, 150); // Typing speed
        });
        setDisplayText(currentFullText.slice(0, i));
      }

      // Hold for a moment
      await new Promise(resolve => {
        timeout = setTimeout(resolve, 2000); // Wait before deleting
      });

      // Delete the text
      for (let i = currentFullText.length; i >= 0; i--) {
        await new Promise(resolve => {
          timeout = setTimeout(resolve, 50); // Deleting speed (faster)
        });
        setDisplayText(currentFullText.slice(0, i));
      }

      // Blink cursor only
      await new Promise(resolve => {
        timeout = setTimeout(resolve, 500); // Short pause before next word
      });

      // Switch to next text
      currentTextIndex = (currentTextIndex + 1) % texts.length;

      // Restart cycle
      typeSequence();
    };

    typeSequence();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="relative inline-block align-middle">
      {/* Invisible ghost element to reserve space for the longest text */}
      <div
        className="invisible flex items-center font-type-machine text-sm font-semibold tracking-wider px-1"
        aria-hidden="true"
      >
        <span className="text-qwe">&gt;</span>
        <span className="text-current">qwe software services</span>
        <span>_</span>
      </div>

      <motion.div
        className="absolute top-0 left-0 flex items-center font-type-machine text-sm font-semibold tracking-wider px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-qwe">&gt;</span>
        <span className="text-current whitespace-nowrap">{displayText}</span>
        <span
          className={`text-qwe transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
        >
          _
        </span>
      </motion.div>
    </div>
  );
};

export default QweLogo;
