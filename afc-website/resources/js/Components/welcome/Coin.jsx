import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './style/coin.css';

const Coin = () => {
  const coinRef = useRef(null);

  useEffect(() => {
    // GSAP animation setup
    gsap.fromTo(
      coinRef.current,
      {
        opacity: 0,                    // Initially invisible
        y: 0,                          // Start position
        rotationX: 0,                   // No rotation initially
        rotationY: 0,                   // No rotation initially
        rotationZ: 0,                   // No Z-axis rotation initially
      },
      {
        opacity: 1,                     // Fade in effect
        y: -250,                        // Coin falls down
        rotationX: 1080,                // Spin in X-axis
        rotationY: 1080,                // Spin in Y-axis
        rotationZ: 720,                 // Additional Z-axis rotation for the roll effect
        ease: 'power4.out',             // Easing for a smooth fall
        duration: 2,                    // Fall duration
        onComplete: () => {
          // After landing, add bounce effect
          gsap.to(coinRef.current, {
            y: -15,                      // Bounce distance
            duration: 1.0,
            ease: 'bounce.out',           // Bounce easing
            yoyo: true,                   // Bounce back down
            repeat: 0,
            onComplete: () => {
              // After bouncing, initiate rolling to the bottom-left corner
              gsap.to(coinRef.current, {
                rotationX: 0,
                rotationY: 0,
                rotationZ: 3600,            // Full roll effect
                y: 0,                       // Settle the coin on the surface
                x: 0,                       // Move coin to the left side
                left: 0,                    // Set the coin to the left side
                bottom: 0,                  // Set the coin at the bottom
                marginLeft: '0',            // Ensure it's aligned with the left edge
                marginBottom: '0',          // Ensure it's aligned with the bottom edge
                duration: 4,                // Roll duration
                ease: 'power3.out',         // Rolling easing for natural motion
                onComplete: () => {
                  // Stop rolling and add final resting effect
                  gsap.to(coinRef.current, {
                    rotationZ: 0,            // Stop rolling
                    duration: 0,             // Smooth stop duration
                    ease: 'power1.out',      // Smooth easing for stop
                  });
                },
              });
            },
          });
        },
      }
    );
  }, []); // Ensure the effect only runs once

  return (
    <img
      src="/img/coin.png"
      alt="Coin"
      ref={coinRef}
      className="coin"
    />
  );
};

export default Coin;
