<script setup>
import BackgroundAnimation from '~/components/BackgroundAnimation.vue'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({
  layout: 'empty'
})

// Register GSAP plugins
if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// SEO
useHead({
  title: 'Empower Studio | Персонализиран софтуер по ваше задание',
  meta: [
    { 
      name: 'description', 
      content: 'Създаваме вашият софтуер за дни, не месеци. Персонализиран софтуер по ваше задание с помощта на най-съвременните инструменти.' 
    }
  ]
})


// Hero section animation
const heroText = ref('Защо да чакате месеци? Създаваме за дни! ⚡')
const heroSubtext = ref('Персонализиран софтуер по ваше задание с помощта на най-съвременните AI инструменти')
const isVisible = ref(false)

// Section refs for scrolling
const featuresRef = ref(null)
const processRef = ref(null)

// Initialize animations
const initAnimations = () => {
  if (!process.client) return

  // Hero section animations
  const tl = gsap.timeline()
  tl.from('.hero-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
  .from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .from('.hero-buttons', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.4')
  .from('.hero-stats', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.2')

  // Floating animations for background elements
  gsap.to('.floating-blur', {
    y: -30,
    duration: 2.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  })

  gsap.to('.floating-blur-delayed', {
    y: 30,
    duration: 3,
    delay: 0.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  })

  // Scroll animations
  const sections = document.querySelectorAll('.animate-on-scroll')
  sections.forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
  })

  // Card stagger animations
  const cards = document.querySelectorAll('.animate-fade-in')
  gsap.from(cards, {
    scrollTrigger: {
      trigger: cards,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  })
}

onMounted(() => {
  isVisible.value = true
  initAnimations()
  
  // Load Calendly widget script
  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  document.body.appendChild(script)
})

// Testimonials
const testimonials = [
  {
    name: "Мартин Петров",
    role: "CEO на TechFlow",
    content: "Empower Studio трансформира нашите бизнес процеси с иновативни AI решения. Впечатляващо внимание към детайла и перфектна оптимизация."
  },
  {
    name: "Виктория Иванова",
    role: "Основател на ScaleUp",
    content: "Екипът достави невероятни резултати в изключително кратки срокове. Перфектно разбиране на модерната софтуерна разработка."
  },
  {
    name: "Александър Димитров",
    role: "CTO на InnovateCo",
    content: "Техническата експертиза и професионалното управление на проекта направиха сложна имплементация лека и безпроблемна."
  },
  {
    name: "Елена Тодорова",
    role: "Product Manager в FinTech+",
    content: "Изключително впечатлена от бързината и качеството на работа. AI интеграцията, която разработиха, спести часове ръчна работа на екипа ни."
  },
  {
    name: "Георги Николов",
    role: "Директор в DataSmart",
    content: "Намериха перфектния баланс между иновация и стабилност. Системата работи безупречно вече 6 месеца, точно както обещаха."
  },
  {
    name: "Мария Стоянова",
    role: "CEO на EduTech",
    content: "Платформата за онлайн обучение, която разработиха, надмина очакванията ни. Перфектна UX и впечатляващи AI функционалности."
  },
  {
    name: "Николай Иванов",
    role: "Founder на AI Labs",
    content: "Рядко срещам екип с толкова задълбочено разбиране на AI технологиите и тяхното практическо приложение в бизнеса."
  },
  {
    name: "София Димитрова",
    role: "COO на RetailTech",
    content: "Автоматизацията, която внедриха в нашите процеси, доведе до 40% увеличение на ефективността. Отлична инвестиция!"
  },
  {
    name: "Калоян Петров",
    role: "Tech Lead в CloudSys",
    content: "Впечатляващо внимание към детайлите в архитектурата и кода. Получихме не просто продукт, а решение с мисъл за бъдещето."
  }
]

// Stats data
const statsData = {
  projects: '250+',
  rating: '8.7',
  experience: '12+'
}

// Features
const features = [
  {
    title: 'Персонализиран софтуер',
    description: 'Разработен изцяло по ваше задание с най-новите технологии',
    icon: 'heroicons:code-bracket'
  },
  {
    title: 'AI Интеграция',
    description: 'Използваме AI за оптимизация и автоматизация на процесите',
    icon: 'heroicons:cpu-chip'
  },
  {
    title: 'Бърза разработка',
    description: 'От идея до работещ продукт само за дни',
    icon: 'heroicons:rocket-launch'
  },
  {
    title: 'Пълни права',
    description: 'Получавате всички авторски права върху кода и документацията',
    icon: 'heroicons:document-check'
  },
  {
    title: 'Пълна собственост',
    description: 'Контрол върху сървъри, домейни и хостинг решения',
    icon: 'heroicons:server'
  },
  {
    title: 'Дългосрочна визия',
    description: 'Поддръжка и развитие на проекта във времето',
    icon: 'heroicons:chart-bar'
  }
]

// Process steps
const processSteps = [
  {
    title: 'Безплатна консултация',
    description: 'Обсъждаме вашата идея и как можем да я превърнем в реалност. Даваме конкретни предложения и времева рамка.',
    duration: '30 мин',
    icon: 'i-heroicons-light-bulb'
  },
  {
    title: 'Техническо задание',
    description: 'Създаваме детайлен план за разработка, използвани технологии и очаквани резултати.',
    duration: '2-3 дни',
    icon: 'i-heroicons-document-text'
  },
  {
    title: 'Бърза разработка',
    description: 'Работим агилно с регулярни ъпдейти и демота на прогреса.',
    duration: '5-7 дни',
    icon: 'i-heroicons-code-bracket-square'
  },
  {
    title: 'Готов продукт',
    description: 'Получавате работещ софтуер, пълна документация и обучение за работа със системата.',
    duration: '1-2 дни',
    icon: 'i-heroicons-check-badge'
  }
]

// Scroll based animations
const targetSections = ref([])
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px'
}

onMounted(() => {
  isVisible.value = true
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)

  targetSections.value = document.querySelectorAll('.animate-on-scroll')
  targetSections.value.forEach(section => observer.observe(section))
})

const { scrollTo } = useScrollTo()

const handleClick = (e, hash) => {
  e.preventDefault()
  scrollTo(hash)
}
</script>

<template>
      <Header></Header>
  <main class="relative min-h-screen bg-transparent text-white overflow-hidden">
    <BackgroundAnimation />
    
    <!-- Hero Section -->
    <section class="relative min-h-screen flex flex-col items-center justify-center z-10">
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"/>
      
      <div class="container relative mx-auto px-4">
        <div class="max-w-[85rem] mx-auto text-center">
          <h1 
            class="hero-title text-4xl sm:text-6xl lg:text-[5.5rem] font-medium tracking-tight mb-8 bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-transparent pb-2"
            :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-10': !isVisible }"
          >
            {{ heroText }}
          </h1>
          <p class="hero-subtitle text-lg sm:text-xl text-gray-400/90 max-w-2xl mx-auto mb-12 animate-fade-in">
            {{ heroSubtext }}
          </p>
          <div 
            class="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center"
            :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-10': !isVisible }"
          >
            <a 
              href="#services"
              class="min-w-[200px] h-14 bg-white hover:bg-white/90 text-black text-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center rounded-md"
              @click="(e) => handleClick(e, '#services')"
            >
              Как?
            </a>
            <a 
              href="#projects"
              class="min-w-[200px] h-14 border border-white/20 hover:border-white/40 hover:bg-gray-800 hover:text-white bg-black text-lg font-medium transition-all duration-300 backdrop-blur-sm hover:scale-105 text-gray-300 flex items-center justify-center rounded-md"
              @click="(e) => handleClick(e, '#projects')"
            >
              Вижте проектите
            </a>
          </div>
        </div>
      </div>
      
      <!-- Stats Section -->
      <div class="hero-stats absolute bottom-0 left-0 right-0 border-t border-white/10 backdrop-blur-lg">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-3 divide-x divide-white/10">
            <div class="py-8 text-center group">
              <p class="text-4xl font-medium mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {{ statsData.projects }}
              </p>
              <p class="text-sm text-gray-400">Успешни проекта</p>
            </div>
            <div class="py-8 text-center group">
              <p class="text-4xl font-medium mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {{ statsData.rating }}
              </p>
              <p class="text-sm text-gray-400">Клиентска оценка</p>
            </div>
            <div class="py-8 text-center group">
              <p class="text-4xl font-medium mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {{ statsData.experience }}
              </p>
              <p class="text-sm text-gray-400">Години опит</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section 
      id="services"
      ref="featuresRef"
      class="relative z-10 py-32 bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-lg animate-on-scroll overflow-hidden"
    >
      <!-- Simple, elegant background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)]"/>
      </div>

      <div class="container relative mx-auto px-4">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent mb-6">
            Какво получавате?
          </h2>
          <p class="text-xl text-gray-400/90 max-w-2xl mx-auto">
            Създаваме софтуер, който не само работи, но и 
            <span class="text-blue-400">впечатлява</span>
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="feature.title" 
            class="group relative rounded-xl bg-[#0a0c0e] p-6 border-0 shadow-none
            animate-fade-in hover:bg-[#0d0f11]"
            :style="{ animationDelay: `${(index + 1) * 200}ms` }"
          >
            <div class="flex flex-col space-y-4">
              <!-- Icon with proper Icon component -->
              <div class="mb-2">
                <Icon 
                  :name="feature.icon"
                  class="text-2xl text-white" 
                />
              </div>

              <!-- Clean title with proper spacing -->
              <CardTitle class="text-xl font-medium text-white mb-1">
                {{ feature.title }}
              </CardTitle>

              <!-- Description with correct color -->
              <CardDescription class="text-[#9CA3AF] text-base leading-relaxed">
                {{ feature.description }}
              </CardDescription>
            </div>
          </div> 
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section 
      id="how"
      ref="processRef"
      class="relative z-10 py-24 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-lg animate-on-scroll"
    >
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
          От Идея до Реалност
        </h2>
        <p class="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Бърз и ефективен процес, фокусиран върху вашия успех
        </p>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(step, index) in processSteps" 
            :key="index"
            :style="{ animationDelay: `${(index + 1) * 200}ms` }"
            class="animate-fade-in"
          >
            <div class=" border-white/10 backdrop-blur-sm p-6 transition-all duration-500 hover:shadow-2xl group h-full">
              <CardHeader>
                <div class="flex items-center justify-between mb-4">
                  <div :class="[step.icon, 'text-4xl text-blue-400 group-hover:scale-110 transition-transform duration-500']" />
                  <Badge variant="outline" class=" text-white border-white/10">
                    {{ step.duration }}
                  </Badge>
                </div>
                <CardTitle class="text-xl text-white">{{ step.title }}</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-gray-400">{{ step.description }}</p>
              </CardContent>
            </div> 
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="relative z-10 py-32 bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-lg animate-on-scroll overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/2 -right-1/4 w-full h-full bg-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-1000"/>
        <div class="absolute -bottom-1/2 left-1/4 w-full h-full bg-blue-400/5 rounded-full blur-3xl animate-blob animation-delay-3000"/>
      </div>

      <div class="container relative mx-auto px-4">
        <div class="text-center space-y-4 mb-20">
          <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Нашите Услуги
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Цялостни технологични решения, съобразени с вашите бизнес нужди
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-10">
          <!-- Software Development -->
          <div class="animate-fade-in" style="animation-delay: 200ms">
            <div class="group h-full border-white/10 backdrop-blur-sm p-10 transition-all duration-500 hover:shadow-2xl rounded-xlhover:-translate-y-2">
              <CardHeader>
                <div class="flex items-center mb-8">
                  <div class="relative">
                    <div class="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"/>
                    <div class="i-heroicons-code-bracket text-6xl text-blue-400 relative z-10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                  </div>
                  <div class="ml-8">
                    <CardTitle class="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      Разработка на Софтуер
                    </CardTitle>
                    <p class="text-gray-400 mt-2">Създаваме модерни и мащабируеми решения</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul class="space-y-6 ml-10">
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">Уеб Приложения</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Модерни технологии и отзивчив дизайн</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">Мобилна Разработка</span>
                      <span class="text-gray-400 text-sm leading-relaxed">iOS и Android приложения с нативно изживяване</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">SaaS Платформи</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Скалируеми решения за вашия бизнес</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">Системна Интеграция</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Свързване и оптимизация на съществуващи системи</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </div> 
          </div>

          <!-- AI Solutions -->
          <div class="animate-fade-in" style="animation-delay: 400ms">
            <div class="group h-full border-white/10 backdrop-blur-sm p-10 transition-all duration-500 hover:shadow-2xl rounded-xlhover:-translate-y-2">
              <CardHeader>
                <div class="flex items-center mb-8">
                  <div class="relative">
                    <div class="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"/>
                    <div class="i-heroicons-cpu-chip text-6xl text-blue-400 relative z-10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                  </div>
                  <div class="ml-8">
                    <CardTitle class="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      AI Решения
                    </CardTitle>
                    <p class="text-gray-400 mt-2">Интелигентна автоматизация на процеси</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul class="space-y-6 ml-10">
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">LLM Интеграция</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Внедряване на езикови модели в работния процес</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">AI Автоматизация</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Оптимизация на рутинни задачи и процеси</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">Умни Асистенти</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Персонализирани AI решения за вашия екип</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">Предиктивна Аналитика</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Анализ на данни и прогнозни модели</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </div> 
          </div>

          <!-- UX/UI Design -->
          <div class="animate-fade-in" style="animation-delay: 600ms">
            <div class="group h-full border-white/10 backdrop-blur-sm p-10 transition-all duration-500 hover:shadow-2xl rounded-xlhover:-translate-y-2">
              <CardHeader>
                <div class="flex items-center mb-8">
                  <div class="relative">
                    <div class="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"/>
                    <div class="i-heroicons-paint-brush text-6xl text-blue-400 relative z-10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                  </div>
                  <div class="ml-8">
                    <CardTitle class="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      UX/UI Дизайн
                    </CardTitle>
                    <p class="text-gray-400 mt-2">Създаваме изключително потребителско изживяване</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul class="space-y-6 ml-10">
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">Интерфейс Дизайн</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Модерни и интуитивни потребителски интерфейси</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">UX Изследване</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Задълбочен анализ на потребителското поведение</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">Редизайн</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Обновяване и оптимизация на съществуващи приложения</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">Брандинг</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Цялостна визуална идентичност и дизайн система</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </div> 
          </div>

          <!-- DevOps & Support -->
          <div class="animate-fade-in" style="animation-delay: 800ms">
            <div class="group h-full border-white/10 backdrop-blur-sm p-10 transition-all duration-500 hover:shadow-2xl rounded-xl">
              <CardHeader>
                <div class="flex items-center mb-8">
                  <div class="relative">
                    <div class="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"/>
                    <div class="i-heroicons-server text-6xl text-blue-400 relative z-10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                  </div>
                  <div class="ml-8">
                    <CardTitle class="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      DevOps & Поддръжка
                    </CardTitle>
                    <p class="text-gray-400 mt-2">Надеждна инфраструктура и техническа поддръжка</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul class="space-y-6 ml-10">
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">CI/CD Процеси</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Автоматизирано тестване и внедряване</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">Cloud Оптимизация</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Ефективно управление на облачни ресурси</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">24/7 Мониторинг</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Проактивно наблюдение и поддръжка</span>
                    </div>
                  </li>
                  <li class="flex items-start space-x-4 group/item">
                    <div class="i-heroicons-check-circle text-blue-400 mt-1.5 text-xl flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <span class="text-white font-medium block mb-1.5">Сигурност</span>
                      <span class="text-gray-400 text-sm leading-relaxed">Защита на данни и регулярни одити</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </div> 
          </div>
        </div>
      </div>
    </section>

    <!-- How Section -->
    <section class="relative z-10 py-24 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-lg animate-on-scroll overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 -left-1/4 w-full h-full bg-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-3000"/>
        <div class="absolute -bottom-1/4 right-1/4 w-full h-full bg-blue-400/5 rounded-full blur-3xl animate-blob animation-delay-1000"/>
      </div>

      <div class="container relative mx-auto px-4">
        <div class="text-center space-y-4 mb-16 relative">
          <h2 class="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Как работим?
          </h2>
          <p class="text-xl text-gray-400 text-center max-w-3xl mx-auto">
            Нашият подход съчетава бързина, качество и ориентация към резултати
          </p>
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left side: Description -->
          <div class="space-y-8 animate-fade-in" style="animation-delay: 200ms">
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                  <Icon name="heroicons:light-bulb" class="text-3xl text-blue-400"/>
                </div>
                <h3 class="text-2xl font-semibold text-white">Разбиране на бизнес нуждите</h3>
              </div>
              <p class="text-gray-300 ml-16">
                Започваме с дълбоко разбиране на вашия бизнес, целите ви и предизвикателствата, пред които сте изправени. Това ни позволява да предложим решения, които наистина отговарят на вашите нужди.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                  <Icon name="heroicons:document-check" class="text-3xl text-blue-400"/>
                </div>
                <h3 class="text-2xl font-semibold text-white">Прецизно планиране</h3>
              </div>
              <p class="text-gray-300 ml-16">
                Създаваме детайлен план с ясни цели, срокове и етапи. Използваме гъвкави методологии, което ни позволява бързо адаптиране към промени и нови изисквания.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                  <Icon name="heroicons:cpu-chip" class="text-3xl text-blue-400"/>
                </div>
                <h3 class="text-2xl font-semibold text-white">AI-усилена разработка</h3>
              </div>
              <p class="text-gray-300 ml-16">
                Използваме съвременни AI инструменти за автоматизация на рутинни задачи, анализ на код и тестване, което значително ускорява процеса без компромис с качеството.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                  <Icon name="heroicons:arrow-path" class="text-3xl text-blue-400"/>
                </div>
                <h3 class="text-2xl font-semibold text-white">Постоянна комуникация</h3>
              </div>
              <p class="text-gray-300 ml-16">
                Поддържаме открита комуникация през целия процес на разработка. Получавате редовни ъпдейти и имате възможност да споделяте обратна връзка на всеки етап.
              </p>
            </div>
          </div>

          <!-- Right side: Visual Representation -->
          <div class="relative animate-fade-in" style="animation-delay: 600ms">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent blur-2xl rounded-full opacity-30"/>
            <div class="relative  border border-white/10 rounded-2xl p-8 backdrop-blur-sm overflow-hidden group hover:bg-white/10 transition-all duration-500">
              <div class="absolute top-0 right-0 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-500"/>
              
              <!-- Workflow Diagram -->
              <div class="relative z-10 flex flex-col items-center">
                <div class="space-y-8 w-full max-w-md mx-auto">
                  <!-- Step 1 -->
                  <div class="relative flex items-center">
                    <div class="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110">
                      <div class="text-2xl font-bold text-blue-400">1</div>
                    </div>
                    <div class="ml-6  rounded-lg p-4 border border-white/10 flex-1 transform transition-all duration-500 group-hover:-translate-y-1">
                      <h4 class="text-white font-semibold">Първоначална консултация</h4>
                      <p class="text-sm text-gray-400 mt-1">Безплатна дискусия за вашите нужди и цели</p>
                    </div>
                  </div>
                  
                  <!-- Connector -->
                  <div class="w-0.5 h-8 bg-gradient-to-b from-blue-400/50 to-white/10 ml-7"/>
                  
                  <!-- Step 2 -->
                  <div class="relative flex items-center">
                    <div class="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110">
                      <div class="text-2xl font-bold text-blue-400">2</div>
                    </div>
                    <div class="ml-6  rounded-lg p-4 border border-white/10 flex-1 transform transition-all duration-500 group-hover:-translate-y-1">
                      <h4 class="text-white font-semibold">Технически анализ</h4>
                      <p class="text-sm text-gray-400 mt-1">Избор на оптимални технологии и архитектура</p>
                    </div>
                  </div>
                  
                  <!-- Connector -->
                  <div class="w-0.5 h-8 bg-gradient-to-b from-blue-400/50 to-white/10 ml-7"/>
                  
                  <!-- Step 3 -->
                  <div class="relative flex items-center">
                    <div class="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110">
                      <div class="text-2xl font-bold text-blue-400">3</div>
                    </div>
                    <div class="ml-6  rounded-lg p-4 border border-white/10 flex-1 transform transition-all duration-500 group-hover:-translate-y-1">
                      <h4 class="text-white font-semibold">Разработка и тестване</h4>
                      <p class="text-sm text-gray-400 mt-1">Бърза итеративна разработка с фокус върху качеството</p>
                    </div>
                  </div>
                  
                  <!-- Connector -->
                  <div class="w-0.5 h-8 bg-gradient-to-b from-blue-400/50 to-white/10 ml-7"/>
                  
                  <!-- Step 4 -->
                  <div class="relative flex items-center">
                    <div class="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110">
                      <div class="text-2xl font-bold text-blue-400">4</div>
                    </div>
                    <div class="ml-6  rounded-lg p-4 border border-white/10 flex-1 transform transition-all duration-500 group-hover:-translate-y-1">
                      <h4 class="text-white font-semibold">Внедряване и поддръжка</h4>
                      <p class="text-sm text-gray-400 mt-1">Пускане в експлоатация и постоянна техническа подкрепа</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section 
      id="projects"
      class="relative z-10 py-24 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-lg animate-on-scroll overflow-hidden"
    >
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-1/4 right-1/4 w-full h-full bg-blue-500/5 rounded-full blur-3xl animate-blob"/>
        <div class="absolute bottom-1/4 -left-1/4 w-full h-full bg-blue-400/5 rounded-full blur-3xl animate-blob animation-delay-4000"/>
      </div>

      <div class="container relative mx-auto px-4">
        <div class="text-center space-y-4 mb-16 relative">
          <h2 class="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Нашите Проекти
          </h2>
          <p class="text-xl text-gray-400 text-center max-w-3xl mx-auto">
            Вижте как помагаме на бизнеси да постигнат своите цели
          </p>
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Project 1 -->
          <div class="animate-fade-in" style="animation-delay: 200ms">
            <div class="group/card h-full">
              <div class="relative from-white/[0.075] to-white/[0.025] border-0 shadow-lg shadow-black/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:shadow-blue-900/20  h-full w-full">
                <div class="rounded-t-lg rounded-b-sm relative h-56 overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 opacity-60 group-hover/card:opacity-40 transition-opacity duration-500 z-10"/>
                  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80')] bg-cover bg-center transform transition-transform duration-700 group-hover/card:scale-110"/>
                  <div class="absolute top-4 left-4 z-20">
                    <Badge class="bg-blue-500/90 hover:bg-blue-500/100 text-white border-0 shadow-lg shadow-blue-950/20 transition-all duration-300">AI Решение</Badge>
                  </div>
                </div>
                <CardContent class="relative p-8">
                  <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"/>
                  <div class="relative z-10">
                    <h3 class="text-2xl font-bold text-white mb-3 group-hover/card:text-blue-400 transition-colors duration-300">AI Асистент за Финансови Анализи</h3>
                    <p class="text-gray-300/90 mb-6 line-clamp-3">Разработихме персонализиран AI асистент, който автоматизира финансови анализи и прогнози за голяма счетоводна фирма. Системата обработва данни в реално време и предоставя точни прогнози.</p>
                    <div class="flex flex-wrap gap-2">
                      <Badge variant="outline" class=" text-white border-white/10 px-3 py-1 hover:bg-white/10 transition-colors duration-300">React</Badge>
                      <Badge variant="outline" class=" text-white border-white/10 px-3 py-1 hover:bg-white/10 transition-colors duration-300">Python</Badge>
                      <Badge variant="outline" class=" text-white border-white/10 px-3 py-1 hover:bg-white/10 transition-colors duration-300">OpenAI</Badge>
                    </div>
                  </div>
                </CardContent>
              </div> 
            </div>
          </div>

          <!-- Project 2 -->
          <div class="animate-fade-in" style="animation-delay: 400ms">
            <div class="group/card h-full">
              <div class="relative from-white/[0.075] to-white/[0.025] border-0 shadow-lg shadow-black/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:shadow-blue-900/20  h-full w-full">
                <div class="rounded-t-lg rounded-b-sm relative h-56 overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 opacity-60 group-hover/card:opacity-40 transition-opacity duration-500 z-10"/>
                  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80')] bg-cover bg-center transform transition-transform duration-700 group-hover/card:scale-110"/>
                  <div class="absolute top-4 left-4 z-20">
                    <Badge class="bg-blue-500/90 hover:bg-blue-500/100 text-white border-0 shadow-lg shadow-blue-950/20 transition-all duration-300">SaaS</Badge>
                  </div>
                </div>
                <CardContent class="relative p-8">
                  <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"/>
                  <div class="relative z-10">
                    <h3 class="text-2xl font-bold text-white mb-3 group-hover/card:text-blue-400 transition-colors duration-300">Платформа за Управление на Проекти</h3>
                    <p class="text-gray-300/90 mb-6 line-clamp-3">Създадохме цялостна SaaS платформа за управление на проекти с интегрирани AI функции за оптимизация на работни процеси и автоматично разпределение на задачи.</p>
                    <div class="flex flex-wrap gap-2">
                      <Badge variant="outline" class=" text-white border-white/10 px-3 py-1 hover:bg-white/10 transition-colors duration-300">Vue.js</Badge>
                      <Badge variant="outline" class=" text-white border-white/10 px-3 py-1 hover:bg-white/10 transition-colors duration-300">Node.js</Badge>
                      <Badge variant="outline" class=" text-white border-white/10 px-3 py-1 hover:bg-white/10 transition-colors duration-300">MongoDB</Badge>
                    </div>
                  </div>
                </CardContent>
              </div> 
            </div>
          </div>

          <!-- Project 3 -->
          <div class="animate-fade-in" style="animation-delay: 600ms">
            <div class="group/card h-full">
              <div class="relative from-white/[0.075] to-white/[0.025] border-0 shadow-lg shadow-black/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:shadow-blue-900/20  h-full w-full">
                <div class="rounded-t-lg rounded-b-sm relative h-56 overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 opacity-60 group-hover/card:opacity-40 transition-opacity duration-500 z-10"/>
                  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80')] bg-cover bg-center transform transition-transform duration-700 group-hover/card:scale-110"/>
                  <div class="absolute top-4 left-4 z-20">
                    <Badge class="bg-blue-500/90 hover:bg-blue-500/100 text-white border-0 shadow-lg shadow-blue-950/20 transition-all duration-300">Mobile</Badge>
                  </div>
                </div>
                <CardContent class="relative p-8">
                  <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"/>
                  <div class="relative z-10">
                    <h3 class="text-2xl font-bold text-white mb-3 group-hover/card:text-blue-400 transition-colors duration-300">Мобилно Приложение за Здравословен Начин на Живот</h3>
                    <p class="text-gray-300/90 mb-6 line-clamp-3">Разработихме мобилно приложение, което помага на потребителите да следят своите здравословни навици и получават персонализирани съвети базирани на AI анализ.</p>
                    <div class="flex flex-wrap gap-2">
                      <Badge variant="outline" class=" text-white border-white/10 px-3 py-1 hover:bg-white/10 transition-colors duration-300">React Native</Badge>
                      <Badge variant="outline" class=" text-white border-white/10 px-3 py-1 hover:bg-white/10 transition-colors duration-300">Firebase</Badge>
                      <Badge variant="outline" class=" text-white border-white/10 px-3 py-1 hover:bg-white/10 transition-colors duration-300">TensorFlow</Badge>
                    </div>
                  </div>
                </CardContent>
              </div> 
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <Button 
            variant="outline" 
            class="min-w-[200px] h-12 border-white/20 hover:border-white/40 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 group"
          >
            <span class="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent text-lg font-medium group-hover:from-blue-700 group-hover:to-blue-900">
              Вижте всички проекти
            </span>
          </Button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="relative z-10 py-24 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-lg animate-on-scroll overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/5 rounded-full blur-3xl animate-blob"/>
        <div class="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-400/5 rounded-full blur-3xl animate-blob animation-delay-2000"/>
      </div>

      <div class="container relative mx-auto px-4">
        <div class="text-center space-y-4 mb-16 relative">
          <h2 class="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Какво казват нашите клиенти
          </h2>
          <p class="text-xl text-gray-400 text-center max-w-3xl mx-auto">
            Успехът на нашите клиенти е нашата най-добра препоръка
          </p>
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
        </div>

        <div class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg py-20">
          <Marquee pauseOnHover class="[--duration:30s]">
            <template v-for="testimonial in testimonials.slice(0, testimonials.length / 2)" :key="testimonial.name">
              <figure class="relative w-[500px] cursor-pointer overflow-hidden rounded-xl mx-1
             from-white/[0.08] to-white/[0.03] shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm p-6
                transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:-translate-y-1 group">
                <figcaption class="flex flex-row items-center gap-4">
                  <div class="relative w-12 h-12 rounded-full overflow-hidden from-blue-500/20 to-blue-400/20">
                    <div class="absolute inset-[1px] rounded-full from-white/[0.08] to-white/[0.03]"/>
                    <div class="absolute inset-0 flex items-center justify-center text-xl font-semibold text-blue-400">
                      {{ testimonial.name[0] }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-lg font-medium bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                      {{ testimonial.name }}
                    </span>
                    <span class="text-sm font-medium text-blue-400/80">
                      {{ testimonial.role }}
                    </span>
                  </div>
                </figcaption>
                <blockquote class="mt-4 text-gray-400/90 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {{ testimonial.content }}
                </blockquote>
              </figure>
            </template>
          </Marquee>

          <Marquee reverse pauseOnHover class="[--duration:30s]">
            <template v-for="testimonial in testimonials.slice(testimonials.length / 2)" :key="testimonial.name">
              <figure class="relative w-[500px] cursor-pointer overflow-hidden rounded-xl mx-1
             from-white/[0.08] to-white/[0.03] shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm p-6
                transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:-translate-y-1 group">
                <figcaption class="flex flex-row items-center gap-4">
                  <div class="relative w-12 h-12 rounded-full overflow-hidden from-blue-500/20 to-blue-400/20">
                    <div class="absolute inset-[1px] rounded-full from-white/[0.08] to-white/[0.03]"/>
                    <div class="absolute inset-0 flex items-center justify-center text-xl font-semibold text-blue-400">
                      {{ testimonial.name[0] }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-lg font-medium bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                      {{ testimonial.name }}
                    </span>
                    <span class="text-sm font-medium text-blue-400/80">
                      {{ testimonial.role }}
                    </span>
                  </div>
                </figcaption>
                <blockquote class="mt-4 text-gray-400/90 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {{ testimonial.content }}
                </blockquote>
              </figure>
            </template>
          </Marquee>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section 
      id="contact"
      class="relative z-10 py-32 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-lg animate-on-scroll overflow-hidden"
    >
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-1/2 right-1/4 w-full h-full bg-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-3000"/>
        <div class="absolute -bottom-1/2 -left-1/4 w-full h-full bg-blue-400/5 rounded-full blur-3xl animate-blob animation-delay-2000"/>
      </div>

      <div class="container relative mx-auto px-4">
        <div class="mx-auto">
          <div class="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent animate-fade-in" style="animation-delay: 200ms">
              Започнете Безплатна Консултация
            </h2>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in" style="animation-delay: 400ms">
              Изберете удобно време за 30-минутна консултация, в която ще обсъдим вашия проект
            </p>
          </div>

          <div class="max-w-5xl relative border-white/10 from-white/[0.08] to-white/[0.02] shadow-lg shadow-black/20 backdrop-blur-sm animate-fade-in overflow-hidden mx-auto" style="animation-delay: 600ms">
            <CardContent>
              <div 
                class="calendly-inline-widget" 
                data-url="https://calendly.com/gkkirilov/30"
                style="height:830px; margin: 0 auto; width: 100%;"
              ></div>
            </CardContent>
          </div> 
        </div>
      </div>
    </section>
  </main>
</template>