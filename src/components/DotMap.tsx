import React, { useEffect, useState, useMemo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withRepeat, 
  withTiming, 
  Easing,
  withDelay,
  withSequence
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type RoutePoint = { x: number; y: number; delay: number };

const routes: { start: RoutePoint; end: RoutePoint; color: string; duration: number }[] = [
  { start: { x: SCREEN_WIDTH * 0.2, y: SCREEN_HEIGHT * 0.3, delay: 0 }, end: { x: SCREEN_WIDTH * 0.4, y: SCREEN_HEIGHT * 0.2, delay: 2000 }, color: "#2563eb", duration: 3000 },
  { start: { x: SCREEN_WIDTH * 0.4, y: SCREEN_HEIGHT * 0.2, delay: 2000 }, end: { x: SCREEN_WIDTH * 0.6, y: SCREEN_HEIGHT * 0.25, delay: 4000 }, color: "#2563eb", duration: 3000 },
  { start: { x: SCREEN_WIDTH * 0.15, y: SCREEN_HEIGHT * 0.15, delay: 1000 }, end: { x: SCREEN_WIDTH * 0.35, y: SCREEN_HEIGHT * 0.35, delay: 3000 }, color: "#2563eb", duration: 3000 },
  { start: { x: SCREEN_WIDTH * 0.7, y: SCREEN_HEIGHT * 0.15, delay: 500 }, end: { x: SCREEN_WIDTH * 0.45, y: SCREEN_HEIGHT * 0.35, delay: 2500 }, color: "#2563eb", duration: 3000 },
];

const generateDots = (width: number, height: number) => {
  const dots = [];
  const gap = clamp(width * 0.03, 10, 20); // Scale gap based on screen size
  const dotRadius = 1.5;

  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {
      const isInMapShape =
        ((x < width * 0.25 && x > width * 0.05) && (y < height * 0.4 && y > height * 0.1)) ||
        ((x < width * 0.25 && x > width * 0.15) && (y < height * 0.8 && y > height * 0.4)) ||
        ((x < width * 0.45 && x > width * 0.3) && (y < height * 0.35 && y > height * 0.15)) ||
        ((x < width * 0.5 && x > width * 0.35) && (y < height * 0.65 && y > height * 0.35)) ||
        ((x < width * 0.7 && x > width * 0.45) && (y < height * 0.5 && y > height * 0.1)) ||
        ((x < width * 0.8 && x > width * 0.65) && (y < height * 0.8 && y > height * 0.6));

      if (isInMapShape && Math.random() > 0.3) {
        dots.push({ x, y, radius: dotRadius, opacity: Math.random() * 0.4 + 0.1 });
      }
    }
  }
  return dots;
};

// Helper for responsiveness
function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const RouteAnimation = ({ route }: { route: any }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime - route.start.delay;
      
      if (elapsed > 0) {
        // Total cycle = duration + 2000ms pause
        const cycleTime = route.duration + 2000;
        const cycleElapsed = elapsed % cycleTime;
        
        let currentProgress = cycleElapsed / route.duration;
        if (currentProgress > 1) {
          currentProgress = 1; // Hold at the end for the pause duration
        }
        
        setProgress(currentProgress);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [route.start.delay, route.duration]);

  const currentX = route.start.x + (route.end.x - route.start.x) * progress;
  const currentY = route.start.y + (route.end.y - route.start.y) * progress;

  return (
    <>
      {/* Base static faint line */}
      <Line x1={route.start.x} y1={route.start.y} x2={route.end.x} y2={route.end.y} stroke={route.color} strokeWidth={0.5} opacity={0.3} />
      
      {/* Growing animated line */}
      <Line x1={route.start.x} y1={route.start.y} x2={currentX} y2={currentY} stroke={route.color} strokeWidth={1.5} />
      
      {/* Start dot */}
      <Circle cx={route.start.x} cy={route.start.y} r={3} fill={route.color} />
      
      {/* Moving dots (head, glow) */}
      {(progress > 0 && progress < 1) && (
        <>
          <Circle cx={currentX} cy={currentY} r={8} fill="rgba(59, 130, 246, 0.4)" />
          <Circle cx={currentX} cy={currentY} r={4} fill="#3b82f6" />
        </>
      )}

      {/* End dot (appears when progress == 1) */}
      {progress === 1 && (
        <Circle cx={route.end.x} cy={route.end.y} r={3} fill={route.color} />
      )}
    </>
  );
};

export default function DotMap() {
  const dots = useMemo(() => generateDots(SCREEN_WIDTH, SCREEN_HEIGHT), []);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
        {dots.map((dot, index) => (
          <Circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r={dot.radius}
            fill={`rgba(37, 99, 235, ${dot.opacity})`}
          />
        ))}
        {routes.map((route, i) => (
          <RouteAnimation key={`route-${i}`} route={route} />
        ))}
      </Svg>
    </View>
  );
}
