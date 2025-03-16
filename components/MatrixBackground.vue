<script setup>
const characters = ref([])
const containerRef = ref(null)

// Configure the matrix animation
const config = {
  charCount: 50,            // Number of characters to show
  baseSpeed: 2,             // Base falling speed
  speedVariation: 3,        // Random variation in speed
  baseSize: 16,             // Base character size
  sizeVariation: 8,         // Random variation in size
  refreshRate: 50,          // Time in ms between generating new characters
  fadeInTime: 200,          // Time in ms for a character to fade in
  fadeOutTime: 200,         // Time in ms for a character to fade out
  matrixChars: '01001010110110001001010110001101001011011'.split('') // Character set
}

// Generate a random matrix character
const getRandomMatrixChar = () => {
  const randomIndex = Math.floor(Math.random() * config.matrixChars.length)
  return config.matrixChars[randomIndex]
}

// Generate a random position within the container
const getRandomPosition = () => {
  if (!containerRef.value) return { x: 0, y: 0 }
  
  const width = containerRef.value.clientWidth
  const x = Math.random() * width
  return { x, y: -20 } // Start slightly above the viewport
}

// Generate a unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Create a new falling character
const createChar = () => {
  const position = getRandomPosition()
  const speed = config.baseSpeed + Math.random() * config.speedVariation
  const size = config.baseSize + Math.random() * config.sizeVariation
  const brightness = 0.7 + Math.random() * 0.3 // Varying brightness
  
  return {
    id: generateId(),
    char: getRandomMatrixChar(),
    x: position.x,
    y: position.y,
    speed,
    size,
    brightness,
    opacity: 0, // Start transparent
    visible: true
  }
}

// Animation loop to move characters
let animationId = null
const animate = () => {
  if (!containerRef.value) return
  
  const containerHeight = containerRef.value.clientHeight
  
  // Update existing characters
  characters.value = characters.value.map(char => {
    // Move the character down
    const newY = char.y + char.speed
    
    // Calculate opacity based on position (fade in at top, fade out at bottom)
    let opacity = char.opacity
    
    if (newY < 50) {
      // Fading in at the top
      opacity = Math.min(1, opacity + 0.03)
    } else if (newY > containerHeight - 100) {
      // Fading out at the bottom
      opacity = Math.max(0, opacity - 0.03)
    }
    
    // If it's no longer visible or off-screen, mark for removal
    if (opacity <= 0 || newY > containerHeight) {
      return { ...char, visible: false }
    }
    
    // Otherwise update the position and opacity
    return { ...char, y: newY, opacity }
  }).filter(char => char.visible) // Remove invisible characters
  
  animationId = requestAnimationFrame(animate)
}

// Start the animation on mount
onMounted(() => {
  // Add initial characters
  for (let i = 0; i < 20; i++) {
    const char = createChar()
    
    // Distribute initial characters throughout the container
    if (containerRef.value) {
      char.y = Math.random() * containerRef.value.clientHeight
    }
    
    characters.value.push(char)
  }
  
  // Start animation loop
  animate()
  
  // Set up interval to add new characters
  const interval = setInterval(() => {
    if (characters.value.length < config.charCount) {
      characters.value.push(createChar())
    }
  }, config.refreshRate)
  
  // Clean up on unmount
  onUnmounted(() => {
    clearInterval(interval)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  })
})
</script>

<template>
  <div 
    ref="containerRef"
    class="matrix-container absolute inset-0 overflow-hidden z-1 pointer-events-none"
  >
    <!-- The main matrix background effect -->
    <div class="matrix-background"></div>
    
    <!-- Floating characters -->
    <div
      v-for="char in characters"
      :key="char.id"
      class="matrix-char absolute"
      :style="{
        left: `${char.x}px`,
        top: `${char.y}px`,
        fontSize: `${char.size}px`,
        opacity: char.opacity,
        filter: `brightness(${char.brightness})`,
        textShadow: `0 0 5px rgba(0, 255, 0, ${char.brightness})`
      }"
    >
      {{ char.char }}
    </div>
  </div>
</template>

<style scoped>
.matrix-container {
  background-color: black;
}

.matrix-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 20, 0, 0.8),
    rgba(0, 10, 0, 0.9)
  );
  box-shadow: inset 0 0 150px rgba(0, 50, 0, 0.3);
}

.matrix-char {
  font-family: monospace;
  color: #00ff00;
  transform-origin: center;
  transition: opacity 100ms linear;
  will-change: transform, opacity;
}

/* Column effect on top */
.matrix-container::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    rgba(0, 10, 0, 0.03) 1px,
    rgba(0, 10, 0, 0.03) 2px,
    transparent 3px
  );
  pointer-events: none;
}

/* CRT scan effect */
.matrix-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    transparent 0%, 
    rgba(32, 128, 32, 0.2) 50%, 
    transparent 51%, 
    rgba(32, 128, 32, 0.2) 100%
  );
  background-size: 100% 4px;
  animation: scan 10s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes scan {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
}
</style> 