<template>
  <main class="min-h-screen bg-white relative">
    <!-- Light Bar -->
    <div class="absolute inset-0 w-full overflow-hidden pointer-events-none -translate-y-5">
      <!-- <LightBar /> -->
    </div>

    <!-- Navigation -->
    <div class="fixed top-3 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock
        :items="[
          { title: 'Статистика', icon: 'lucide:chart-bar', href: '#stats' },
          { title: 'Проблеми', icon: 'lucide:alert-circle', href: '#problems' },
          { title: 'Решения', icon: 'lucide:lightbulb', href: '#solutions' },
          { title: 'Примери', icon: 'lucide:folder', href: '#case-studies' },
          { title: 'Процес', icon: 'lucide:git-branch', href: '#process' },
          { title: 'Запазете консултация', icon: 'lucide:calendar', href: '#consultation' }
        ]"
        desktop-class-name="w-full"
        mobile-class-name="fixed bottom-4 right-4"
      />
    </div>

    <!-- Hero and Video Combined Section -->
    <section class="relative z-10 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 w-full h-full">
        <DotPattern :width="18" :height="18" :cy="1.5" :cr="1.5" class="opacity-[0.2] fill-zinc-400" />
        <div class="absolute inset-0 h-[100%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(255,255,255,0.95)_40%,rgba(255,255,255,0)_80%)]"></div>
        <div class="absolute top-0 left-0 right-0 h-[250px] bg-gradient-to-b from-zinc-100/80 to-transparent"></div>
      </div>

      <!-- Hero Content -->
      <div class="pt-44 pb-20">
        <div class="container mx-auto px-4 relative">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-400 bg-clip-text text-center text-4xl md:text-7xl font-medium mb-6 leading-tight tracking-tight text-transparent">
              Автоматизирайте бизнес процесите си с изкуствен интелект
            </h1>
            <p class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              Помагаме на бизнесите да спестят време и да намалят разходите чрез автоматизиране на рутинни задачи с персонализирани решения, базирани на изкуствен интелект.
            </p>
            <GlowButton 
              color="#silver" 
              class="hover:scale-105 transition-transform duration-300"
              @click.prevent="scrollToSection('consultation')"
            >
              <a href="#consultation" class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="lucide:calendar" class="h-3 w-3" />
                </div>
                <span class="text-sm font-medium">Заявете безплатна консултация</span>
              </a>
            </GlowButton>
          </div>
        </div>
      </div>

      <ParticlesEffectSlim id="particles" />
      <!-- Trusted By Section -->
      <div class="py-12">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <Marquee :pause-on-hover="true" class="py-4">
              <a href="https://www.suera.com" target="_blank">
                <img src="/images/logos/logo-stroke.svg" alt="suera" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>
              <a href="https://www.bezbroker.com" target="_blank">
                <img src="/images/logos/bezbroker.svg" alt="bezbroker" class="h-6 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>

              <a href="https://www.srv.bg" target="_blank">
                <img src="/images/logos/srv.svg" alt="srv" class="h-6 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>
              <a href="https://www.midland.bg" target="_blank">
                <img src="/images/logos/midland.png" alt="midland" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>
              <a href="https://www.mck.bg" target="_blank">
                <img src="/images/logos/mck.png" alt="mck" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>
              <a href="https://www.diana-ltd.com" target="_blank">
                <img src="/images/logos/diana.png" alt="diana" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>
              <a href="https://www.flataway.com" target="_blank">
                <img src="/images/logos/flataway.svg" alt="flataway" class="h-6 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>
              <a href="https://www.nibnab.ai" target="_blank">
                <img src="/images/logos/nibnab.svg" alt="nibnab" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>
              <a href="https://www.intercars.eu" target="_blank">
                <img src="/images/logos/intercars.svg" alt="intercars" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>
              <a href="https://www.garantburgas.com" target="_blank">
                <span class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" >Garant Burgas </span>
              </a>
              <a href="https://www.zazemiata.org" target="_blank">
                <img src="/images/logos/zazemiata.png" alt="zazemiata" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>
              <!-- 
              <img src="/images/logos/apple-black-logo-svgrepo-com.svg" alt="Apple" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/linkedin-icon-logo-svgrepo-com.svg" alt="LinkedIn" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/youtube-icon-logo-svgrepo-com.svg" alt="YouTube" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/gmail-icon-logo-svgrepo-com.svg" alt="Gmail" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/tiktok-icon-white-1-logo-svgrepo-com.svg" alt="TikTok" class="h-10 mx-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" /> -->
            </Marquee>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section id="stats" ref="statsRef" class="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-8 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-black dark:via-neutral-900/50 dark:to-neutral-900 rounded-xl shadow-lg card-hover" @mousemove="cardHover">
              <div class="flex items-start justify-between mb-4">
                <Icon name="lucide:clock" class="size-10 text-neutral-600 my-auto" />
                <div class="flex items-center gap-2 items-center">
                  <h3 class="text-5xl font-bold">38%</h3>
                  <Icon name="solar:arrow-right-up-bold" class="size-7 mt-1" />
                </div>
              </div>
              <h4 class="font-medium mb-2 text-lg">Спестено време от рутинни задачи</h4>
              <p class="text-neutral-600 dark:text-neutral-400 text-sm">Автоматизирайте повтарящите се процеси и освободете екипа си за дейности с висока добавена стойност</p>
            </div>
            <div class="p-8 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-black dark:via-neutral-900/50 dark:to-neutral-900 rounded-xl shadow-lg card-hover" @mousemove="cardHover">
              <div class="flex items-start justify-between mb-4">
                <Icon name="lucide:trending-up" class="size-10 text-neutral-600 my-auto" />
                <div class="flex items-center gap-2 items-center">
                  <h3 class="text-5xl font-bold">23%</h3>
                  <Icon name="solar:arrow-right-up-bold" class="size-7 mt-1" />
                </div>
              </div>
              <h4 class="font-medium mb-2 text-lg">Повишен капацитет на екипа</h4>
              <p class="text-neutral-600 dark:text-neutral-400 text-sm">Генерирайте повече приходи със същия екип чрез интелигентна автоматизация</p>
            </div>
            <div class="p-8 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-black dark:via-neutral-900/50 dark:to-neutral-900 rounded-xl shadow-lg card-hover" @mousemove="cardHover">
              <div class="flex items-start justify-between mb-4">
                <Icon name="lucide:piggy-bank" class="size-10 text-neutral-600 my-auto" />
                <div class="flex items-center gap-2 items-center">
                  <h3 class="text-5xl font-bold">19%</h3>
                  <Icon name="solar:arrow-right-up-bold" class="size-7 mt-1" />
                </div>
              </div>
              <h4 class="font-medium mb-2 text-lg">Намалени разходи</h4>
              <p class="text-neutral-600 dark:text-neutral-400 text-sm">Редуцирайте оперативните разходи чрез повишена ефективност и оптимизиране на софтуерните решения</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem Section -->
    <section id="problems" ref="problemRef">
      <BusinessProblemsCarousel />
    </section>

    <!-- Solution Section -->
    <section id="solutions">
      <ServicesSection />
    </section>

    <!-- Case Studies Section -->
    <section id="case-studies" ref="caseStudiesRef" class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-4xl font-bold mb-12 text-center">Резултати на нашите клиенти</h2>
          
          <!-- Bento Grid Layout -->
          <div class="grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
            
            <!-- MealMaster - Spans 2 columns -->
            <div class="row-span-1 md:col-span-2 rounded-xl group group/bento hover:shadow-xl transition duration-200 shadow-lg dark:shadow-none p-5 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-hidden card-hover" @mousemove="cardHover">
              <div class="relative w-full h-40 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden">
                <img src="https://costeffective.software/wp-content/uploads/2024/10/Screenshot-2024-10-17-at-19-15-22-MealMaster-Home.png" alt="AI Персонализирани хранителни планове" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=MealMaster'; this.parentElement.classList.add('flex', 'items-center', 'justify-center');" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div class="p-4 text-white">
                    <div class="inline-flex items-center gap-1.5 bg-primary-500 rounded-full px-3 py-1 text-xs font-medium text-white">
                      <Icon name="lucide:arrow-up-right" class="h-3 w-3" />
                      <span>45%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="group-hover/bento:translate-x-2 transition duration-200 flex-1 flex flex-col justify-between">
                <div>
                  <div class="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-2 mt-2">
                    AI Персонализирани хранителни планове
                  </div>
                  <div class="font-normal text-neutral-600 dark:text-neutral-300">
                    Персонализирана диета според вашите нужди и предпочитания с акцент върху по-бързо създаване на хранителни планове
                  </div>
                </div>
                
                <a href="https://www.mealmasterbot.com/" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                  <span>Посетете сайта</span>
                  <Icon name="lucide:arrow-right" class="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <!-- Икономически секторен анализ -->
            <div class="row-span-1 rounded-xl group group/bento hover:shadow-xl transition duration-200 shadow-lg dark:shadow-none p-5 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-hidden card-hover" @mousemove="cardHover">
              <div class="relative w-full h-40 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden">
                <img src="https://costeffective.software/wp-content/uploads/2024/10/Screenshot-2024-10-17-at-19-20-24-Garant-Burgas-Анализи-Оценки-Контрол.png" alt="Икономически секторен анализ" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=Economic+Analysis'; this.parentElement.classList.add('flex', 'items-center', 'justify-center');" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div class="p-4 text-white">
                    <div class="inline-flex items-center gap-1.5 bg-primary-500 rounded-full px-3 py-1 text-xs font-medium text-white">
                      <Icon name="lucide:arrow-up-right" class="h-3 w-3" />
                      <span>85%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="group-hover/bento:translate-x-2 transition duration-200 flex-1 flex flex-col justify-between">
                <div>
                  <div class="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-2 mt-2">
                    Икономически секторен анализ
                  </div>
                  <div class="font-normal text-neutral-600 dark:text-neutral-300">
                    По-бързо извличане на данни и инсайти за икономически сектори и компании
                  </div>
                </div>
                
                <a href="https://borsa.garantburgas.com/sectorRanking?origin_code=bg" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                  <span>Посетете сайта</span>
                  <Icon name="lucide:arrow-right" class="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <!-- Социална мрежа за пенсионери -->
            <div class="row-span-1 rounded-xl group group/bento hover:shadow-xl transition duration-200 shadow-lg dark:shadow-none p-5 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-hidden card-hover" @mousemove="cardHover">
              <div class="relative w-full h-40 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden">
                <img src="https://costeffective.software/wp-content/uploads/2024/09/pensa.png" alt="Социална мрежа за пенсионери" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=Pensa+Club'; this.parentElement.classList.add('flex', 'items-center', 'justify-center');" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div class="p-4 text-white">
                    <div class="inline-flex items-center gap-1.5 bg-primary-500 rounded-full px-3 py-1 text-xs font-medium text-white">
                      <Icon name="lucide:arrow-up-right" class="h-3 w-3" />
                      <span>78%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="group-hover/bento:translate-x-2 transition duration-200 flex-1 flex flex-col justify-between">
                <div>
                  <div class="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-2 mt-2">
                    Социална мрежа за пенсионери
                  </div>
                  <div class="font-normal text-neutral-600 dark:text-neutral-300">
                    Увеличение на социалните взаимодействия между възрастни хора
                  </div>
                </div>
                
                <a href="https://www.pensa.club/" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                  <span>Посетете сайта</span>
                  <Icon name="lucide:arrow-right" class="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <!-- Рецептурник - Spans 2 columns -->
            <div class="row-span-1 md:col-span-2 rounded-xl group group/bento hover:shadow-xl transition duration-200 shadow-lg dark:shadow-none p-5 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-hidden card-hover" @mousemove="cardHover">
              <div class="relative w-full h-40 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden">
                <img src="https://costeffective.software/wp-content/uploads/2024/10/Screenshot-2024-10-17-at-19-22-29-Kitchen-Helper.png" alt="Рецептурник с ястия" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=Kitchen+Helper'; this.parentElement.classList.add('flex', 'items-center', 'justify-center');" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div class="p-4 text-white">
                    <div class="inline-flex items-center gap-1.5 bg-primary-500 rounded-full px-3 py-1 text-xs font-medium text-white">
                      <Icon name="lucide:arrow-up-right" class="h-3 w-3" />
                      <span>42%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="group-hover/bento:translate-x-2 transition duration-200 flex-1 flex flex-col justify-between">
                <div>
                  <div class="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-2 mt-2">
                    Рецептурник с ястия за всеки ден
                  </div>
                  <div class="font-normal text-neutral-600 dark:text-neutral-300">
                    Колекция от рецепти с автоматизирано планиране на храненията, спестяващо време на потребителите
                  </div>
                </div>
                
                <a href="https://kitchenhelper.eognyanov.com/" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                  <span>Посетете сайта</span>
                  <Icon name="lucide:arrow-right" class="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <!-- Календар за моторни спортове - Spans 2 columns -->
            <div class="row-span-1 md:col-span-2 rounded-xl group group/bento hover:shadow-xl transition duration-200 shadow-lg dark:shadow-none p-5 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-hidden card-hover" @mousemove="cardHover">
              <div class="relative w-full h-40 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden">
                <img src="https://costeffective.software/wp-content/uploads/2024/03/cars.png" alt="Календар за моторни спортове" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=RaceFanatic'; this.parentElement.classList.add('flex', 'items-center', 'justify-center');" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div class="p-4 text-white">
                    <div class="inline-flex items-center gap-1.5 bg-primary-500 rounded-full px-3 py-1 text-xs font-medium text-white">
                      <Icon name="lucide:arrow-up-right" class="h-3 w-3" />
                      <span>68%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="group-hover/bento:translate-x-2 transition duration-200 flex-1 flex flex-col justify-between">
                <div>
                  <div class="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-2 mt-2">
                    Календар за моторни спортове
                  </div>
                  <div class="font-normal text-neutral-600 dark:text-neutral-300">
                    Агрегатор на състезания и събития от света на моторния спорт, подобряващ информираността на феновете
                  </div>
                </div>
                
                <a href="https://racefanatic.app/" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                  <span>Посетете сайта</span>
                  <Icon name="lucide:arrow-right" class="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <!-- Маркетплейс за настолни игри -->
            <div class="row-span-1 rounded-xl group group/bento hover:shadow-xl transition duration-200 shadow-lg dark:shadow-none p-5 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-hidden card-hover" @mousemove="cardHover">
              <div class="relative w-full h-40 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden">
                <img src="https://costeffective.software/wp-content/uploads/2024/03/cardflow.png" alt="Маркетплейс за настолни игри" class="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=CardFlow'; this.parentElement.classList.add('flex', 'items-center', 'justify-center');" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div class="p-4 text-white">
                    <div class="inline-flex items-center gap-1.5 bg-primary-500 rounded-full px-3 py-1 text-xs font-medium text-white">
                      <Icon name="lucide:arrow-up-right" class="h-3 w-3" />
                      <span>93%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="group-hover/bento:translate-x-2 transition duration-200 flex-1 flex flex-col justify-between">
                <div>
                  <div class="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-2 mt-2">
                    Маркетплейс за настолни игри
                  </div>
                  <div class="font-normal text-neutral-600 dark:text-neutral-300">
                    По-ефективна размяна на карти и компоненти от настолни игри
                  </div>
                </div>
                
                <a href="https://cardflow.market/" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                  <span>Посетете сайта</span>
                  <Icon name="lucide:arrow-right" class="h-4 w-4" />
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section id="process" ref="processRef" class="py-20 bg-neutral-50 dark:bg-neutral-900 relative overflow-hidden">
      <!-- Sophisticated spotlight effects in grayscale -->
      <div class="absolute inset-0 w-full h-full pointer-events-none">
        <!-- Main spotlight gradient in grayscale -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] rounded-full bg-gradient-to-br from-zinc-200/40 via-zinc-300/30 to-zinc-100/20 dark:from-zinc-800/30 dark:via-zinc-700/20 dark:to-zinc-900/10 blur-[120px] opacity-70"></div>
        <!-- Secondary diagonal spotlight for added depth -->
        <div class="absolute top-[30%] right-[20%] w-[40%] h-[30%] rounded-full bg-zinc-200/30 dark:bg-zinc-700/20 blur-[80px] opacity-50"></div>
        <!-- Subtle noise texture overlay -->
        <div class="absolute inset-0 backdrop-filter backdrop-contrast-[1.01] mix-blend-overlay opacity-[0.03]" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=');"></div>
      </div>
        
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-6xl mx-auto">
          <!-- Sophisticated gradient text with subtle shimmer effect -->
          <h2 class="text-4xl font-bold mb-16 text-center relative">
            <span class="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-800 dark:from-white dark:via-zinc-300 dark:to-zinc-200 inline-block text-transparent bg-clip-text relative z-10">Как работим с вас</span>
            <!-- Subtle shimmer effect overlay -->
            <span class="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-transparent via-zinc-300/10 to-transparent dark:from-transparent dark:via-zinc-600/10 dark:to-transparent bg-[length:200%_100%] animate-shimmer-slow z-20"></span>
          </h2>
          
            <div class="relative">
            <!-- Timeline Line with Sophisticated Effects - Modified to start at first dot and end at last dot -->
            <div class="absolute left-1/2 -translate-x-1/2 hidden md:block" style="top: 90px; bottom: 90px;">
              <!-- Primary line with gradient -->
              <div class="absolute inset-0 bg-gradient-to-b from-zinc-400/70 via-zinc-500/60 to-zinc-600/50 dark:from-zinc-500/50 dark:via-zinc-400/40 dark:to-zinc-300/30" style="width: 1px; left: 50%; transform: translateX(-50%);"></div>
              
              <!-- Glass effect layer -->
              <div class="absolute inset-0 w-[2px] -left-[0.5px] backdrop-blur-[1px]"></div>
              
              <!-- Single, refined animated particle -->
              <div class="absolute w-[8px] h-[8px] left-1/2 -translate-x-1/2 rounded-full bg-white dark:bg-zinc-100 
                shadow-[0_0_15px_5px_rgba(255,255,255,0.8),0_0_20px_8px_rgba(125,125,128,0.3)] 
                dark:shadow-[0_0_15px_5px_rgba(255,255,255,0.7),0_0_20px_8px_rgba(200,200,220,0.3)] 
                animate-timelineFlow z-10"></div>
            </div>
            
            <!-- Timeline Steps -->
            <div class="space-y-12 md:space-y-32">
              <!-- Step 1 -->
              <div class="relative group">
                <div class="flex flex-col md:flex-row items-center">
                  <!-- Timeline Dot with sophisticated effects -->
                  <div class="absolute left-1/2 w-12 h-12 bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-900 dark:to-black rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center -translate-x-1/2 z-10 hidden md:flex shadow-[0_0_15px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,0.25)] dark:group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)]">
                    <!-- Glass effect rim -->
                    <div class="absolute inset-0 rounded-full backdrop-blur-[0.5px] opacity-30"></div>
                    
                    <!-- Pulse animation with more realistic physics -->
                    <div class="absolute inset-[2px] rounded-full border border-zinc-200/30 dark:border-zinc-700/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-outward"></div>
                    
                    <!-- Number with subtle gradient and shadow -->
                    <span class="text-xl font-bold relative bg-gradient-to-br from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 text-transparent bg-clip-text drop-shadow-sm">01</span>
                    
                    <!-- Inner subtle glow -->
                    <div class="absolute inset-[4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent dark:from-white/10 dark:to-transparent"></div>
                  </div>
                  
                  <!-- Left Content (for desktop) with slide-in animation and enhanced shadow -->
                  <div class="hidden md:block md:w-1/2 pr-16 text-right transition-all duration-700 opacity-0 translate-x-[-20px] timeline-reveal">
                    <h3 class="text-2xl font-bold mb-3 relative">
                      <span class="bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 inline-block text-transparent bg-clip-text">Анализ</span>
                      <!-- Subtle underline with animation -->
                      <span class="absolute bottom-0 right-0 w-0 h-[1px] bg-zinc-400 dark:bg-zinc-500 origin-left transition-all duration-500 ease-out"></span>
                    </h3>
                    <p class="text-zinc-600 dark:text-zinc-400">Задълбочен анализ на ключовите области за подобрение</p>
                  </div>
                  
                  <!-- Mobile Content -->
                  <div class="md:hidden w-full p-6 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-black rounded-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] card-hover transition-all duration-300 hover:shadow-[0_15px_35px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_15px_35px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]" @mousemove="cardHover">
                    <div class="flex items-center gap-4 mb-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        <span class="text-lg font-bold text-zinc-800 dark:text-zinc-200">01</span>
                      </div>
                      <h3 class="text-xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 inline-block text-transparent bg-clip-text">Анализ</h3>
                    </div>
                    <p class="text-zinc-600 dark:text-zinc-400">Задълбочен анализ на ключовите области за подобрение</p>
                  </div>
                  
                  <!-- Right Content with enhanced design -->
                  <div class="hidden md:block md:w-1/2 pl-16 transition-all duration-700 opacity-0 translate-x-[20px] timeline-reveal">
                    <div class="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-black p-6 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] card-hover group/card transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]" @mousemove="cardHover">
                      <div class="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.2)] group-hover/card:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.1)] dark:group-hover/card:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.3)]">
                        <Icon name="lucide:search" class="h-10 w-10 text-zinc-600 dark:text-zinc-300 group-hover/card:text-zinc-800 dark:group-hover/card:text-zinc-100 transition-colors duration-300" />
                      </div>
                      <p class="text-zinc-600 dark:text-zinc-400 group-hover/card:text-zinc-700 dark:group-hover/card:text-zinc-300 transition-colors duration-300">Изследваме вашите работни процеси, идентифицираме проблемните звена и оценяваме възможностите за оптимизация</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Step 2 -->
              <div class="relative group">
                <div class="flex flex-col md:flex-row items-center">
                  <!-- Timeline Dot with sophisticated effects -->
                  <div class="absolute left-1/2 w-12 h-12 bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-900 dark:to-black rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center -translate-x-1/2 z-10 hidden md:flex shadow-[0_0_15px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,0.25)] dark:group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)]">
                    <!-- Glass effect rim -->
                    <div class="absolute inset-0 rounded-full backdrop-blur-[0.5px] opacity-30"></div>
                    
                    <!-- Pulse animation with more realistic physics -->
                    <div class="absolute inset-[2px] rounded-full border border-zinc-200/30 dark:border-zinc-700/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-outward"></div>
                    
                    <!-- Number with subtle gradient and shadow -->
                    <span class="text-xl font-bold relative bg-gradient-to-br from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 text-transparent bg-clip-text drop-shadow-sm">02</span>
                    
                    <!-- Inner subtle glow -->
                    <div class="absolute inset-[4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent dark:from-white/10 dark:to-transparent"></div>
                  </div>
                  
                  <!-- Left Content with enhanced design -->
                  <div class="hidden md:block md:w-1/2 pr-16 text-right transition-all duration-700 opacity-0 translate-x-[-20px] timeline-reveal">
                    <div class="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-black p-6 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] card-hover group/card transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]" @mousemove="cardHover">
                      <div class="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.2)] group-hover/card:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.1)] dark:group-hover/card:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.3)]">
                        <Icon name="lucide:code" class="h-10 w-10 text-zinc-600 dark:text-zinc-300 group-hover/card:text-zinc-800 dark:group-hover/card:text-zinc-100 transition-colors duration-300" />
                      </div>
                      <p class="text-zinc-600 dark:text-zinc-400 group-hover/card:text-zinc-700 dark:group-hover/card:text-zinc-300 transition-colors duration-300">Разработваме персонализирано решение, което отговаря на конкретните нужди на вашия бизнес и измерваме първоначалните резултати</p>
                    </div>
                  </div>
                  
                  <!-- Mobile Content -->
                  <div class="md:hidden w-full p-6 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-black rounded-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] card-hover transition-all duration-300 hover:shadow-[0_15px_35px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_15px_35px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]" @mousemove="cardHover">
                    <div class="flex items-center gap-4 mb-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        <span class="text-lg font-bold text-zinc-800 dark:text-zinc-200">02</span>
                      </div>
                      <h3 class="text-xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 inline-block text-transparent bg-clip-text">Разработка</h3>
                    </div>
                    <p class="text-zinc-600 dark:text-zinc-400">Създаване на първоначално решение и измерване на резултатите</p>
                  </div>
                  
                  <!-- Right Content (for desktop) with slide-in animation and enhanced shadow -->
                  <div class="hidden md:block md:w-1/2 pl-16 transition-all duration-700 opacity-0 translate-x-[20px] timeline-reveal">
                    <h3 class="text-2xl font-bold mb-3 relative">
                      <span class="bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 inline-block text-transparent bg-clip-text">Разработка</span>
                      <!-- Subtle underline with animation -->
                      <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-zinc-400 dark:bg-zinc-500 origin-left transition-all duration-500 ease-out"></span>
                    </h3>
                    <p class="text-zinc-600 dark:text-zinc-400">Създаване на първоначално решение и измерване на резултатите</p>
                  </div>
                </div>
              </div>
              
              <!-- Step 3 -->
              <div class="relative group">
                <div class="flex flex-col md:flex-row items-center">
                  <!-- Timeline Dot with sophisticated effects -->
                  <div class="absolute left-1/2 w-12 h-12 bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-900 dark:to-black rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center -translate-x-1/2 z-10 hidden md:flex shadow-[0_0_15px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,0.25)] dark:group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)]">
                    <!-- Glass effect rim -->
                    <div class="absolute inset-0 rounded-full backdrop-blur-[0.5px] opacity-30"></div>
                    
                    <!-- Pulse animation with more realistic physics -->
                    <div class="absolute inset-[2px] rounded-full border border-zinc-200/30 dark:border-zinc-700/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-outward"></div>
                    
                    <!-- Number with subtle gradient and shadow -->
                    <span class="text-xl font-bold relative bg-gradient-to-br from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 text-transparent bg-clip-text drop-shadow-sm">03</span>
                    
                    <!-- Inner subtle glow -->
                    <div class="absolute inset-[4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent dark:from-white/10 dark:to-transparent"></div>
                  </div>
                  
                  <!-- Left Content (for desktop) with slide-in animation and enhanced shadow -->
                  <div class="hidden md:block md:w-1/2 pr-16 text-right transition-all duration-700 opacity-0 translate-x-[-20px] timeline-reveal">
                    <h3 class="text-2xl font-bold mb-3 relative">
                      <span class="bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 inline-block text-transparent bg-clip-text">Внедряване</span>
                      <!-- Subtle underline with animation -->
                      <span class="absolute bottom-0 right-0 w-0 h-[1px] bg-zinc-400 dark:bg-zinc-500 origin-left transition-all duration-500 ease-out"></span>
                    </h3>
                    <p class="text-zinc-600 dark:text-zinc-400">Интегриране на решението в работата на вашия екип и проследяване на ефективността</p>
                  </div>
                  
                  <!-- Mobile Content -->
                  <div class="md:hidden w-full p-6 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-black rounded-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] card-hover transition-all duration-300 hover:shadow-[0_15px_35px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_15px_35px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]" @mousemove="cardHover">
                    <div class="flex items-center gap-4 mb-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        <span class="text-lg font-bold text-zinc-800 dark:text-zinc-200">03</span>
                      </div>
                      <h3 class="text-xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 inline-block text-transparent bg-clip-text">Внедряване</h3>
                    </div>
                    <p class="text-zinc-600 dark:text-zinc-400">Интегриране на решението в работния процес на вашия екип, обучаваме служителите и осигуряваме постоянно наблюдение и подобрения</p>
                  </div>
                  
                  <!-- Right Content with enhanced design -->
                  <div class="hidden md:block md:w-1/2 pl-16 transition-all duration-700 opacity-0 translate-x-[20px] timeline-reveal">
                    <div class="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-black p-6 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] card-hover group/card transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]" @mousemove="cardHover">
                      <div class="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.2)] group-hover/card:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.1)] dark:group-hover/card:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.3)]">
                        <Icon name="lucide:upload" class="h-10 w-10 text-zinc-600 dark:text-zinc-300 group-hover/card:text-zinc-800 dark:group-hover/card:text-zinc-100 transition-colors duration-300" />
                      </div>
                      <p class="text-zinc-600 dark:text-zinc-400 group-hover/card:text-zinc-700 dark:group-hover/card:text-zinc-300 transition-colors duration-300">Внедряваме решението в работния процес на вашия екип, обучаваме служителите и осигуряваме постоянно наблюдение и подобрения</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section id="consultation" class="py-24">
      <div class="container mx-auto px-5 md:px-10">
        <div class="max-w-4xl mx-auto mb-16">
          <Badge variant="secondary" class="mb-4 mx-auto flex justify-center rounded-full w-24">ЗАПОЧНЕТЕ</Badge>
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 text-center">
            Трансформирайте бизнеса си с интелигентна автоматизация
          </h2>
          <p class="text-xl text-center text-neutral-700">
            Развивайте бизнеса си по-бързо с решения на базата на изкуствен интелект от корпоративен клас, които ви спестяват време и средства.
          </p>
        </div>
        
        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-3xl overflow-hidden">
            <ClientOnly>
              <iframe
                src="https://calendly.com/gkkirilov/30?embed_domain=microsass&embed_type=Inline&hide_gdpr_banner=1&background_color=ffffff&text_color=000000&primary_color=2563eb"
                width="100%"
                height="700"
                frameborder="0"
                title="Изберете дата и час - Empower Studio"
                data-ready="true"
              ></iframe>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// Navigation menu state
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Mobile menu items with animation
const menuItems = [
  { label: 'Нашата работа', href: '/work' },
  { label: 'Цени', href: '/pricing' },
  { label: 'За нас', href: '/about' },
  { label: 'Блог', href: '/blog' },
  { label: 'Свържете се с нас', href: '/contact' },
]

// Intersection observer for animations
const targetRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(targetRef, ([{ isIntersecting }]) => {
  isVisible.value = isIntersecting
  if (isIntersecting) {
    targetRef.value?.classList.add('animate-in')
  }
})

// Hover effects for cards
const cardHover = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  card.style.setProperty('--mouse-x', `${x}px`)
  card.style.setProperty('--mouse-y', `${y}px`)
}

// Scroll to section smoothly
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }
}

// Add intersection observer to elements
onMounted(() => {
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    useIntersectionObserver(el as HTMLElement, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        (el as HTMLElement).classList.add('animate-in')
      }
    })
  })
  
  // Initialize timeline reveal animations
  document.querySelectorAll('.timeline-reveal').forEach((el) => {
    useIntersectionObserver(el as HTMLElement, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        (el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'translateX(0)'
      }
    }, { threshold: 0.2 })
  })
})
</script>

<style>
/* Base styles */
:root {
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-sans);
  letter-spacing: -0.02em;
}

/* Animations */
.animate-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Timeline animations */
@keyframes timelineFlow {
  0% {
    top: 0;
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.animate-timelineFlow {
  animation: timelineFlow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Animation delays for smooth particle flow */
.animation-delay-100 {
  animation-delay: 100ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}

.animation-delay-1000 {
  animation-delay: 1000ms;
}

.animation-delay-2000 {
  animation-delay: 2000ms;
}

/* Button hover effects */
.button-hover {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.button-hover:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

/* Card hover effects */
.card-hover {
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
}

.card-hover::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.card-hover:hover::before {
  opacity: 1;
  left: var(--mouse-x);
  top: var(--mouse-y);
}

/* Link hover effects */
.link-hover {
  position: relative;
  transition: color 0.2s ease;
}

.link-hover::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.link-hover:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

/* Selection */
::selection {
  background: rgba(0, 0, 0, 0.1);
  color: inherit;
}

.dark ::selection {
  background: rgba(255, 255, 255, 0.1);
}
</style>