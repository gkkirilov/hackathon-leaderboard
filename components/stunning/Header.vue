<template>
  <header class="relative w-full border-b border-white/10 bg-black/20 backdrop-blur-xl z-50">
    <div class="container mx-auto flex h-20 items-center justify-between px-4">
      <!-- Logo -->
      <NuxtLink to="/" class="relative flex items-center space-x-2">
        <img src="/logo.png" alt="znAI Logo" class="h-12 w-auto" />
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav class="hidden items-center space-x-8 md:flex">
        <a 
          v-for="item in navigationItems" 
          :key="item.name" 
          :href="item.href"
          class="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          @click="(e) => handleClick(e, item.href)"
        >
          {{ item.name }}
        </a>
      </nav>

      <!-- Action Buttons -->
      <div class="flex items-center gap-4">
        <!-- Desktop buttons -->
        <div class="hidden md:flex md:items-center md:gap-3">
          <Button 
            variant="ghost" 
            class="text-gray-300 hover:text-white hover:bg-white/10"
            as="a"
            href="#contact"
            @click="(e) => handleClick(e, '#contact')"
          >
            Вход
          </Button>
          <Button 
            class="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            as="a"
            href="#contact"
            @click="(e) => handleClick(e, '#contact')"
          >
            Безплатна Консултация
          </Button>
        </div>

        <!-- Mobile menu button -->
        <Button 
          ref="menuButtonRef"
          variant="ghost" 
          size="icon"
          class="md:hidden text-gray-300 hover:text-white"
          @click="toggleMenu"
        >
          <Icon 
            :name="isOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" 
            class="h-6 w-6"
          />
        </Button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="md:hidden absolute top-full left-0 right-0"
        v-click-outside="closeMenu"
      >
        <div class="space-y-1 px-4 pb-3 pt-2 bg-black/90 backdrop-blur-xl border-t border-white/10">
          <a
            v-for="item in navigationItems"
            :key="item.name"
            :href="item.href"
            class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
            @click="(e) => handleClick(e, item.href)"
          >
            {{ item.name }}
          </a>
          <div class="mt-4 space-y-2">
            <a 
              href="#contact"
              class="w-full justify-center text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-2 text-base font-medium rounded-lg"
              @click="(e) => handleClick(e, '#contact')"
            >
              Вход
            </a>
            <a 
              href="#contact"
              class="w-full justify-center bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 text-base font-medium rounded-lg text-center"
              @click="(e) => handleClick(e, '#contact')"
            >
              Безплатна Консултация
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const isOpen = ref(false)
const menuButtonRef = ref(null)
const { scrollTo } = useScrollTo()

const toggleMenu = (e) => {
  e.stopPropagation()
  isOpen.value = !isOpen.value
}

const handleClick = (e, hash) => {
  e.preventDefault()
  scrollTo(hash)
  isOpen.value = false
}

const navigationItems = [
  { name: 'Услуги', href: '#services' },
  { name: 'Как работим', href: '#how' },
  { name: 'Проекти', href: '#projects' },
  { name: 'Контакти', href: '#contact' },
]

// Mobile menu
const closeMenu = () => {
  isOpen.value = false
}

// Click outside directive
const clickOutside = {
  beforeMount: (el, binding) => {
    el._clickOutside = (event) => {
      // Ignore clicks on the menu button
      const menuButton = document.querySelector('[data-menu-button]')
      if (menuButton && (menuButton === event.target || menuButton.contains(event.target))) {
        return
      }
      
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted: (el) => {
    document.removeEventListener('click', el._clickOutside)
  }
}

// Register directive
const vClickOutside = clickOutside
</script>