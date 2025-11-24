"use client";

import React, { useEffect, useRef } from 'react';

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Mouse state
        let mouse = { x: -1000, y: -1000 };

        // Vibrant Theme Colors (Teal, Gold, Blue, Pink, White)
        const colors = [
            '#2dd4bf', // Teal
            '#facc15', // Gold
            '#60a5fa', // Blue
            '#f472b6', // Pink (for vibrancy)
            '#ffffff'  // White
        ];

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            life: number; // Particle life for fading
            maxLife: number;

            constructor(x: number, y: number, type: 'trail' | 'ambient') {
                this.x = x;
                this.y = y;
                this.color = colors[Math.floor(Math.random() * colors.length)];

                if (type === 'trail') {
                    // Trail particles: Fast, chaotic, short life
                    this.size = Math.random() * 5 + 2;
                    this.speedX = Math.random() * 4 - 2;
                    this.speedY = Math.random() * 4 - 2;
                    this.life = 100;
                    this.maxLife = 100;
                } else {
                    // Ambient particles: Slow, steady, infinite life
                    this.size = Math.random() * 2 + 1;
                    this.speedX = Math.random() * 0.5 - 0.25;
                    this.speedY = Math.random() * 0.5 - 0.25;
                    this.life = 1000; // Effectively infinite
                    this.maxLife = 1000;
                }
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Shrink and fade trail particles
                if (this.life < 1000) {
                    this.life -= 2;
                    this.size *= 0.95; // Shrink
                }

                // Bounce ambient particles off walls
                if (this.life >= 1000) {
                    if (this.x > width || this.x < 0) this.speedX *= -1;
                    if (this.y > height || this.y < 0) this.speedY *= -1;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
                ctx.fillStyle = this.color;

                // Add glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;

                // Fade out based on life
                ctx.globalAlpha = Math.max(0, this.life / 100);

                ctx.fill();

                // Reset context
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }
        }

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            particles = [];
            // Add some initial ambient particles
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(Math.random() * width, Math.random() * height, 'ambient'));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Filter out dead particles
            particles = particles.filter(p => p.life > 0 && p.size > 0.1);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Create trail particles on move
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(mouse.x, mouse.y, 'trail'));
            }
        };

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    );
}
