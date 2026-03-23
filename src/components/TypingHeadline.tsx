import React, { useState, useEffect } from 'react';

interface TypingHeadlineProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingHeadline({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1000,
}: TypingHeadlineProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhraseIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < phrase.length) {
          setCurrentText(phrase.substring(0, currentText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(phrase.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="relative inline-block">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
        {currentText}
      </span>
      <span className="inline-block w-[3px] h-[0.8em] bg-accent-primary ml-1 align-middle animate-pulse-fast md:shadow-[0_0_8px_var(--color-accent-primary)] will-change-[opacity] transform-gpu" />
    </span>
  );
}
