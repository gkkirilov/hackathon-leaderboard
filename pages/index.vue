<template>
  <!-- Scroll Indicator -->
  <div class="scroll-indicator"></div>

  <!-- Combined Header and Hero Background -->
  <div class="bg-gradient-to-b from-blue-50 to-white relative">
    <!-- Dot pattern background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0" style="background-image: radial-gradient(#e5e7eb 1px, transparent 1px); background-size: 16px 16px;"></div>
    </div>

    <!-- Navigation -->
    <header class="bg-transparent py-6 relative z-10">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-center">
          <img src="/logo2.png" alt="Empower Studio" class="h-10 w-auto rounded-xl" />
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div class="container mx-auto px-4 py-20">
        <div class="relative z-10 text-center max-w-4xl mx-auto">
          <Badge variant="secondary" class="mb-6 animate-float bg-blue-100/50 text-blue-700 border-blue-200">
            <Icon name="lucide:zap" class="w-4 h-4 mr-1" /> Оптимизация на Продажби с AI
          </Badge>
          
          <h1 class="text-5xl md:text-6xl font-bold mb-6 text-navy-900">
            Автоматизирайте<br />
            Вашите Продажби и<br />
            Маркетинг с AI
          </h1>
          
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Оптимизираме целия процес по продажби, маркетинг и обслужване на клиенти.
            От първия контакт до успешно затваряне на сделката и последваща грижа.
          </p>

          <div class="mb-20">
            <Button size="lg" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full" @click="scrollToSection('book-consultation')">
              Оптимизирайте Вашите Продажби
            </Button>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-500 uppercase tracking-wider mb-8">Част от нашите клиенти</p>
            <Marquee class="marquee-logo-container" pauseOnHover>
              <img src="/images/logos/bezbroker.svg" alt="Bezbroker" class="h-8 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/diana.png" alt="Diana" class="h-8 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/flataway.svg" alt="FlatAway" class="h-8 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/intercars.svg" alt="InterCars" class="h-8 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/mck.png" alt="MCK" class="h-8 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/midland.png" alt="Midland" class="h-9 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/nauchi.png" alt="Nauchi" class="h-8 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/nibnab.svg" alt="NibNab" class="h-8 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/srv.svg" alt="SRV" class="h-8 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              <img src="/images/logos/zazemiata.png" alt="Za Zemiata" class="h-8 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Why Empower Studio Section -->
  <section class="py-24 bg-gradient-to-b from-white to-blue-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <Badge variant="secondary" class="mb-6 animate-float bg-blue-100/50 text-blue-700 border-blue-200">
            <Icon name="lucide:rocket" class="w-4 h-4 mr-1" /> УВЕЛИЧЕТЕ ПРОДАЖБИТЕ
          </Badge>
          <h2 class="text-4xl font-bold text-navy-900">
            Защо Empower Studio?<br/>
            <span class="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">Оптимизация на Всяка Стъпка</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div class="glass-card p-8 flex flex-col">
            <div class="mb-6">
              <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center">
                <Icon name="lucide:timer" class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-xl font-bold text-navy-900 mb-3">Автоматизация на Продажбите</h3>
              <p class="text-gray-600">
                Автоматизираме рутинните задачи в продажбения процес, позволявайки на вашия екип да се фокусира върху затваряне на сделки.
              </p>
            </div>
            <div class="mt-auto">
              <div class="flex items-center text-sm text-blue-600">
                <Icon name="lucide:trending-up" class="w-4 h-4 mr-2" />
                <span>До 70% по-ефективен процес</span>
              </div>
            </div>
          </div>

          <div class="glass-card p-8 flex flex-col">
            <div class="mb-6">
              <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center">
                <Icon name="lucide:target" class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-xl font-bold text-navy-900 mb-3">Персонализиран Подход</h3>
              <p class="text-gray-600">
                Анализираме вашата търговска фуния и създаваме персонализирани решения за всеки етап от процеса на продажби.
              </p>
            </div>
            <div class="mt-auto">
              <div class="flex items-center text-sm text-blue-600">
                <Icon name="lucide:shield-check" class="w-4 h-4 mr-2" />
                <span>Оптимизация на всяка стъпка</span>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-card p-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl">
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center">
              <h4 class="text-3xl font-bold mb-2">3x</h4>
              <p class="text-sm opacity-90">Повече Затворени Сделки</p>
            </div>
            <div class="text-center">
              <h4 class="text-3xl font-bold mb-2">50%</h4>
              <p class="text-sm opacity-90">По-кратък Цикъл на Продажби</p>
            </div>
            <div class="text-center">
              <h4 class="text-3xl font-bold mb-2">24/7</h4>
              <p class="text-sm opacity-90">Автоматизирана Комуникация</p>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <p class="text-lg font-medium text-gray-600 mb-6">
            Готови ли сте да ускорите вашата дигитална трансформация?
          </p>
          <Button size="lg" class="bg-black text-white hover:bg-gray-900" @click="scrollToSection('book-consultation')">
            Заявете Безплатна Консултация
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- What We Do Section -->
  <section class="py-24 bg-white" id="services">
    <div class="container mx-auto px-4">
      <div class="relative z-10 text-center max-w-4xl mx-auto">
        <Badge variant="secondary" class="mb-6 animate-float bg-blue-100/50 text-blue-700 border-blue-200">
          <Icon name="lucide:boxes" class="w-4 h-4 mr-1" /> НАШИТЕ УСЛУГИ
        </Badge>
        <h2 class="text-4xl md:text-5xl font-bold mb-6 text-navy-900">
          Оптимизация на Продажби<br/>
          <span class="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">от Начало до Край</span>
        </h2>
        
        <p class="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Анализираме и оптимизираме всяка стъпка от вашата търговска фуния,
          от първия контакт до успешно затваряне на сделката
        </p>

        <div class="grid gap-8">
          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center">
                  <Icon name="lucide:users" class="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div class="ml-6 text-left">
                <h3 class="text-2xl font-bold text-navy-900 mb-2">Привличане на потенциални клиенти</h3>
                <p class="text-gray-600">Автоматизирано привличане и оценка на потенциални клиенти с AI.</p>
              </div>
            </div>
          </div>

          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center">
                  <Icon name="lucide:trending-up" class="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div class="ml-6 text-left">
                <h3 class="text-2xl font-bold text-navy-900 mb-2">Подобряване на Продажбения Процес</h3>
                <p class="text-gray-600">Оптимизация на всички етапи от продажбената фуния и увеличаване на конверсиите.</p>
              </div>
            </div>
          </div>

          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center">
                  <Icon name="lucide:star" class="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div class="ml-6 text-left">
                <h3 class="text-2xl font-bold text-navy-900 mb-2">5 Звездно Клиентско Обслужване</h3>
                <p class="text-gray-600">Изключително внимание към детайлите и персонализиран подход към всеки клиент.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-20">
          <div class="glass-card p-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <div class="flex items-center justify-center mb-8">
              <Icon name="lucide:clock" class="w-8 h-8 mr-3" />
              <h3 class="text-2xl font-bold">Бързо Внедряване за Бизнеси</h3>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
              <div class="text-center flex flex-col items-center">
                <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-4">
                  <Icon name="lucide:clipboard-check" class="w-8 h-8" />
                </div>
                <h4 class="font-bold mb-2">Фаза на Проучване</h4>
                <p class="text-sm opacity-90">Стратегически Анализ</p>
              </div>
              
              <div class="text-center flex flex-col items-center">
                <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-4">
                  <Icon name="lucide:code-2" class="w-8 h-8" />
                </div>
                <h4 class="font-bold mb-2">Разработка</h4>
                <p class="text-sm opacity-90">Гъвкаво Внедряване</p>
              </div>
              
              <div class="text-center flex flex-col items-center">
                <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-4">
                  <Icon name="lucide:check-circle" class="w-8 h-8" />
                </div>
                <h4 class="font-bold mb-2">Внедряване</h4>
                <p class="text-sm opacity-90">Бизнес Интеграция</p>
              </div>
            </div>
          </div>

          <div class="mt-12">
            <Button size="lg" class="bg-black text-white hover:bg-gray-900 px-8 py-4 text-lg rounded-full" @click="scrollToSection('book-consultation')">
              <Icon name="lucide:calendar" class="w-6 h-6 mr-2" />
              Заявете Бизнес Консултация
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- The Problem We Solve Section -->
  <section class="py-24 bg-gradient-to-b from-blue-50 to-white">
    <div class="container mx-auto px-4">
      <div class="relative z-10 text-center max-w-4xl mx-auto">
        <Badge variant="secondary" class="mb-6 animate-float bg-blue-100/50 text-blue-700 border-blue-200">
          <Icon name="lucide:lightbulb" class="w-4 h-4 mr-1" /> ВЪЗМОЖНОСТИ ЗА ОПТИМИЗАЦИЯ
        </Badge>
        <h2 class="text-4xl md:text-5xl font-bold mb-6 text-navy-900">
          Трансформирайте Своя Бизнес<br/>
          <span class="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">Максимизирайте ROI с AI</span>
        </h2>
        
        <p class="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Остарелите системи и ръчните процеси забавят вашия бизнес.<br/>
          Време е да прегърнете бъдещето на бизнес автоматизацията.
        </p>

        <div class="glass-card p-8 mb-12 hover:scale-[1.02] transition-transform duration-300">
          <div class="grid md:grid-cols-2 gap-12">
            <div class="text-left">
              <div class="w-16 h-16 bg-blue-100/50 rounded-2xl mb-6 flex items-center justify-center">
                <Icon name="lucide:alert-circle" class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-2xl font-bold text-navy-900 mb-6">Текущи Предизвикателства</h3>
              <ul class="space-y-4">
                <li class="flex items-center text-gray-700">
                  <Icon name="lucide:x-circle" class="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  <span>Ресурсоемки ръчни процеси, намаляващи продуктивността</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <Icon name="lucide:x-circle" class="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  <span>Неефективни системи за управление и обработка на данни</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <Icon name="lucide:x-circle" class="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  <span>Ограничена мащабируемост със сегашната инфраструктура</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <Icon name="lucide:x-circle" class="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  <span>Оперативни затруднения, влияещи на растежа на бизнеса</span>
                </li>
              </ul>
            </div>

            <div class="text-left">
              <div class="w-16 h-16 bg-blue-100/50 rounded-2xl mb-6 flex items-center justify-center">
                <Icon name="lucide:sparkles" class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-2xl font-bold text-navy-900 mb-6">Нашето Решение</h3>
              <ul class="space-y-4">
                <li class="flex items-center text-gray-700">
                  <Icon name="lucide:check-circle" class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  <span>AI автоматизация на повтарящи се задачи</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <Icon name="lucide:check-circle" class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  <span>Интелигентна обработка на данни и анализи</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <Icon name="lucide:check-circle" class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  <span>Мащабируема архитектура базирана в облака</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <Icon name="lucide:check-circle" class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  <span>Оптимизирани работни процеси</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="glass-card p-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center flex flex-col items-center">
              <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Icon name="lucide:alert-circle" class="w-8 h-8 text-blue-600" />
              </div>
              <h4 class="text-3xl font-bold mb-2">50%</h4>
              <p class="text-sm opacity-90">Намаляване на Разходите</p>
            </div>
            <div class="text-center flex flex-col items-center">
              <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Icon name="lucide:zap" class="w-8 h-8 text-blue-600" />
              </div>
              <h4 class="text-3xl font-bold mb-2">10x</h4>
              <p class="text-sm opacity-90">По-Бърза Обработка</p>
            </div>
            <div class="text-center flex flex-col items-center">
              <div class="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Icon name="lucide:clock" class="w-8 h-8 text-blue-600" />
              </div>
              <h4 class="text-3xl font-bold mb-2">24/7</h4>
              <p class="text-sm opacity-90">AI Поддръжка</p>
            </div>
          </div>
        </div>

        <div class="mt-12">
          <Button size="lg" class="bg-black text-white hover:bg-gray-900 px-8 py-4 text-lg rounded-full" @click="scrollToSection('book-consultation')">
            <Icon name="lucide:calendar" class="w-6 h-6 mr-2" />
            Трансформирайте Своя Бизнес Днес
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section class="py-24 bg-white" id="how-it-works">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <Badge variant="secondary" class="mb-6 animate-float bg-blue-100/50 text-blue-700 border-blue-200">
            <Icon name="lucide:git-branch" class="w-4 h-4 mr-1" /> ПРОЦЕС НА ОПТИМИЗАЦИЯ
          </Badge>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-navy-900">
            Как Работим<br/>
            <span class="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">Методология за Успех</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Нашият процес е създаден да идентифицира и оптимизира всички възможности за подобрение във вашата продажбена фуния
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100/50 rounded-2xl flex items-center justify-center">
                  <Icon name="lucide:search" class="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div class="ml-6">
                <h3 class="text-xl font-bold text-navy-900 mb-3">Анализ на Фунията</h3>
                <p class="text-gray-600">Задълбочен анализ на вашия текущ процес по продажби и идентифициране на възможности за оптимизация.</p>
                <div class="mt-4 flex items-center text-sm text-blue-600">
                  <Icon name="lucide:clock" class="w-4 h-4 mr-2" />
                  <span>Продължителност: 3-5 Дни</span>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100/50 rounded-2xl flex items-center justify-center">
                  <Icon name="lucide:clipboard-list" class="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div class="ml-6">
                <h3 class="text-xl font-bold text-navy-900 mb-3">Стратегия за Оптимизация</h3>
                <p class="text-gray-600">Разработване на персонализирана стратегия за автоматизация на всеки етап от продажбения процес.</p>
                <div class="mt-4 flex items-center text-sm text-blue-600">
                  <Icon name="lucide:clock" class="w-4 h-4 mr-2" />
                  <span>Продължителност: 3-5 Дни</span>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center">
                  <Icon name="lucide:settings" class="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div class="ml-6">
                <h3 class="text-xl font-bold text-navy-900 mb-3">Внедряване на Автоматизации</h3>
                <p class="text-gray-600">Поетапно внедряване на автоматизации и AI решения във вашия продажбен процес.</p>
                <div class="mt-4 flex items-center text-sm text-blue-600">
                  <Icon name="lucide:clock" class="w-4 h-4 mr-2" />
                  <span>Продължителност: 5-10 Дни</span>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center">
                  <Icon name="lucide:trending-up" class="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div class="ml-6">
                <h3 class="text-xl font-bold text-navy-900 mb-3">Оптимизация и Мониторинг</h3>
                <p class="text-gray-600">Постоянно наблюдение и подобрение на резултатите от автоматизацията.</p>
                <div class="mt-4 flex items-center text-sm text-blue-600">
                  <Icon name="lucide:clock" class="w-4 h-4 mr-2" />
                  <span>Продължителност: Текущо</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-card p-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center">
          <div class="flex items-center justify-center mb-6">
            <Icon name="lucide:clock-3" class="w-8 h-8 mr-3" />
            <h3 class="text-2xl font-bold">Внедряване на софтуер по-бързо от всякога</h3>
          </div>
          <p class="text-lg mb-8 opacity-90">От първоначалната оценка до пълното внедряване само за няколко седмици</p>
          <Button size="lg" class="bg-white text-blue-600 hover:bg-blue-50" @click="scrollToSection('book-consultation')">
            <Icon name="lucide:calendar" class="w-5 h-5 mr-2" />
            Заявете Консултация за Внедряване
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- Who Can Benefit Section -->
  <section class="py-24 bg-gradient-to-b from-white to-blue-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <Badge variant="secondary" class="mb-6 animate-float bg-blue-100/50 text-blue-700 border-blue-200">
            <Icon name="lucide:users" class="w-4 h-4 mr-1" /> ИНДУСТРИИ
          </Badge>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-navy-900">
            Оптимизация на Продажби<br/>
            <span class="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">За Всеки Бизнес</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Персонализирани решения за оптимизация на продажби, адаптирани към спецификите на вашата индустрия
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="inline-block p-3 bg-blue-100/50 rounded-xl mb-6">
              <Icon name="lucide:shopping-cart" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-navy-900 mb-4">E-commerce & Търговия</h3>
            <ul class="space-y-3">
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Автоматизация на последващи продажби
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Персонализирани предложения към клиенти
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Оптимизация на кошницата за пазаруване
              </li>
            </ul>
          </div>

          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="inline-block p-3 bg-blue-100/50 rounded-xl mb-6">
              <Icon name="lucide:briefcase" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-navy-900 mb-4">B2B Продажби</h3>
            <ul class="space-y-3">
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Автоматизирана лийд квалификация
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Проследяване на сделки
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Интелигентно насрочване на срещи
              </li>
            </ul>
          </div>

          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="inline-block p-3 bg-blue-100/50 rounded-xl mb-6">
              <Icon name="lucide:building" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-navy-900 mb-4">Недвижими Имоти</h3>
            <ul class="space-y-3">
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Автоматизирано проследяване на клиенти
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Персонализирани имейл кампании
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Управление на оферти
              </li>
            </ul>
          </div>

          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <div class="inline-block p-3 bg-blue-100/50 rounded-xl mb-6">
              <Icon name="lucide:graduation-cap" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-navy-900 mb-4">Образование</h3>
            <ul class="space-y-3">
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Автоматизиран процес на записване
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Проследяване на кандидати
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-3" />
                Комуникация с родители
              </li>
            </ul>
          </div>
        </div>

        <div class="glass-card p-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <div class="text-center mb-8">
            <Icon name="lucide:zap" class="w-12 h-12 mx-auto mb-4" />
            <h3 class="text-2xl font-bold mb-4">Готови ли сте да Трансформирате Своя Бизнес?</h3>
            <p class="text-lg opacity-90 mb-8">Започнете с AI решения от най-високо ниво, създадени за вашия сектор</p>
            <Button size="lg" class="bg-white text-blue-600 hover:bg-blue-50" @click="scrollToSection('book-consultation')">
              <Icon name="lucide:calendar" class="w-5 h-5 mr-2" />
              Заявете Безплатна Консултация
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-24 bg-white" id="faq">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <Badge variant="secondary" class="mb-6 animate-float bg-blue-100/50 text-blue-700 border-blue-200">
            <Icon name="lucide:help-circle" class="w-4 h-4 mr-1" /> ЧЕСТО ЗАДАВАНИ ВЪПРОСИ
          </Badge>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-navy-900">
            Въпроси за<br/>
            <span class="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">Оптимизация на Продажби</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Отговори на често задавани въпроси за нашите решения за оптимизация на продажби
          </p>
        </div>

        <div class="space-y-6 mb-16">
          <div class="glass-card">
            <Accordion type="single" collapsible class="divide-y divide-gray-100">
              <AccordionItem value="item-1" class="px-8 py-6">
                <AccordionTrigger class="hover:no-underline">
                  <div class="flex items-center text-left">
                    <div class="w-10 h-10 bg-blue-100/50 rounded-xl flex items-center justify-center mr-4">
                      <Icon name="lucide:git-merge" class="w-5 h-5 text-blue-600" />
                    </div>
                    <span class="text-lg font-semibold text-navy-900">Как работи процесът на оптимизация?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pt-4 pl-14">
                  <p class="text-gray-600">Започваме с анализ на вашата текуща продажбена фуния, идентифицираме възможности за подобрение и внедряваме автоматизации на всеки етап. Процесът включва оптимизация на лийд генерацията, автоматизация на комуникацията и подобряване на процеса по затваряне на сделки.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" class="px-8 py-6">
                <AccordionTrigger class="hover:no-underline">
                  <div class="flex items-center text-left">
                    <div class="w-10 h-10 bg-blue-100/50 rounded-xl flex items-center justify-center mr-4">
                      <Icon name="lucide:clock" class="w-5 h-5 text-blue-600" />
                    </div>
                    <span class="text-lg font-semibold text-navy-900">Колко време отнема да видим резултати?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pt-4 pl-14">
                  <p class="text-gray-600">Първите резултати се виждат още през първия месец след внедряване. Пълният ефект от оптимизацията става видим след 2-3 месеца, когато всички автоматизации са напълно интегрирани и оптимизирани за вашия бизнес.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" class="px-8 py-6">
                <AccordionTrigger class="hover:no-underline">
                  <div class="flex items-center text-left">
                    <div class="w-10 h-10 bg-blue-100/50 rounded-xl flex items-center justify-center mr-4">
                      <Icon name="lucide:trending-up" class="w-5 h-5 text-blue-600" />
                    </div>
                    <span class="text-lg font-semibold text-navy-900">Какви резултати можем да очакваме?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pt-4 pl-14">
                  <p class="text-gray-600">Нашите клиенти обикновено виждат 2-3 пъти повече затворени сделки, 50% съкращаване на времето за затваряне на сделка и значително подобрение в ефективността на продажбения екип. Предоставяме детайлни отчети за всички подобрения и ROI.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" class="px-8 py-6">
                <AccordionTrigger class="hover:no-underline">
                  <div class="flex items-center text-left">
                    <div class="w-10 h-10 bg-blue-100/50 rounded-xl flex items-center justify-center mr-4">
                      <Icon name="lucide:shield" class="w-5 h-5 text-blue-600" />
                    </div>
                    <span class="text-lg font-semibold text-navy-900">Сигурност & Съответствие</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pt-4 pl-14">
                  <p class="text-gray-600">Ние поддържаме най-високите стандарти за сигурност с мерки за защита от бизнес клас. Нашите решения са напълно съвместими с индустриалните разпоредби, включително GDPR, гарантирайки, че вашите данни остават сигурни и защитени.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div class="glass-card p-8 text-center">
          <div class="flex items-center justify-center mb-6">
            <Icon name="lucide:message-circle" class="w-8 h-8 text-blue-600 mr-3" />
            <h3 class="text-2xl font-bold text-navy-900">Имате още въпроси?</h3>
          </div>
          <p class="text-lg text-gray-600 mb-8">Нашият екип за бизнес решения е тук, за да помогне</p>
          <Button size="lg" class="bg-gradient-to-r from-blue-600 to-blue-400 text-white" @click="scrollToSection('book-consultation')">
            <Icon name="lucide:calendar" class="w-5 h-5 mr-2" />
            Заявете Консултация
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="py-24 bg-gradient-to-b from-white to-blue-50" id="contacts">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <Badge variant="secondary" class="mb-6 animate-float bg-blue-100/50 text-blue-700 border-blue-200">
            <Icon name="lucide:mail" class="w-4 h-4 mr-1" /> КОНТАКТИ
          </Badge>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-navy-900">
            Свържете се с нас<br/>
            <span class="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">За Вашето AI Решение</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Имате въпроси или сте готови да започнете? Нашият екип е тук, за да ви помогне с вашите бизнес нужди.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <h3 class="text-xl font-bold text-navy-900 mb-6">Контакти</h3>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Icon name="lucide:mail" class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 class="font-medium text-navy-900 mb-1">Имейл</h4>
                  <a href="mailto:contact@empowerstudio.com" class="text-blue-600 hover:underline">info@empowerstudio.eu</a>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Icon name="lucide:phone" class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 class="font-medium text-navy-900 mb-1">Телефон</h4>
                  <a href="tel:+359888123456" class="text-blue-600 hover:underline">+359 879 493 909</a>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Icon name="lucide:map-pin" class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 class="font-medium text-navy-900 mb-1">Адрес</h4>
                  <p class="text-gray-600">WorkBetter, бул. Черни Връх 51,  <br/>София, България</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="glass-card p-8 hover:scale-[1.02] transition-transform duration-300">
            <h3 class="text-xl font-bold text-navy-900 mb-6">Изпратете съобщение</h3>
            
            <form class="space-y-4" @submit.prevent="handleSubmit">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Име</label>
                <input 
                  id="name" 
                  type="text" 
                  v-model="formData.name"
                  :disabled="isSubmitting"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Вашето име"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Имейл</label>
                <input 
                  id="email" 
                  type="email" 
                  v-model="formData.email"
                  :disabled="isSubmitting"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="вашият@имейл.com"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Съобщение</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  v-model="formData.message"
                  :disabled="isSubmitting"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Вашето съобщение"
                ></textarea>
              </div>
              
              <div>
                <Button 
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:opacity-90 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <template v-if="!isSubmitting">
                    <Icon name="lucide:send" class="w-4 h-4 mr-2" />
                    Изпратете Съобщение
                  </template>
                  <template v-else>
                    <Icon name="lucide:loader-2" class="w-4 h-4 mr-2 animate-spin" />
                    Изпращане...
                  </template>
                </Button>
              </div>
              
              <div v-if="submitStatus" :class="[
                'mt-4 p-4 rounded-xl text-sm',
                submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              ]">
                {{ submitStatus.message }}
              </div>
            </form>
          </div>
        </div>

        <div class="glass-card p-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="mb-6 md:mb-0">
              <h3 class="text-2xl font-bold mb-2">Бизнес Часове</h3>
              <p class="opacity-90">Понеделник - Петък: 9:00 - 18:00</p>
              
            </div>
            <div>
              <Button size="lg" class="bg-white text-blue-600 hover:bg-blue-50" @click="scrollToSection('book-consultation')">
                <Icon name="lucide:calendar" class="w-5 h-5 mr-2" />
                Заявете Консултация
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA Section -->
  <section class="py-24 bg-gradient-to-b from-blue-50 to-white" id="book-consultation">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto text-center">
        <div class="mb-12">
          <Badge variant="secondary" class="mb-6 animate-float bg-blue-100/50 text-blue-700 border-blue-200">
            <Icon name="lucide:rocket" class="w-4 h-4 mr-1" /> ЗАПОЧНЕТЕ СЕГА
          </Badge>
          <h2 class="text-4xl font-bold text-navy-900">
            Оптимизирайте Вашите Продажби<br/>
            <span class="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">С Интелигентна Автоматизация</span>
          </h2>
        </div>
        
        <p class="text-xl mb-12 flex items-center justify-center">
          <Icon name="lucide:trending-up" class="w-6 h-6 text-blue-600 mr-2" />
          Увеличете продажбите и ефективността на вашия екип
        </p>

        <div>
          <iframe
            src="https://calendly.com/gkkirilov/30?embed_domain=microsass&embed_type=Inline&hide_gdpr_banner=1&background_color=ffffff&text_color=000000&primary_color=2563eb"
            width="100%"
            class="md:h-[700px] h-[1100px]"
            frameborder="0"
            title="Планирайте Консултация за Оптимизация на Продажби - Empower Studio"
            data-ready="true"
          ></iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- Team Section -->
  <section class="py-24 bg-white" id="team">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <Badge variant="secondary" class="mb-6 animate-float bg-blue-100/50 text-blue-700 border-blue-200">
            <Icon name="lucide:users" class="w-4 h-4 mr-1" /> УПРАВЛЯВАЩ ЕКИП
          </Badge>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-navy-900">
            Запознайте се с<br/>
            <span class="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">Нашия Екип</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Екип от професионалисти, посветени на създаването на иновативни AI решения за вашия бизнес
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <!-- Team Member 1 -->
          <div class="glass-card overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <div class="relative h-64 overflow-hidden">
              <img src="/images/georgi.png" 
                alt="Георги Кирилов" 
                class="object-cover w-full h-full transition-transform duration-500 hover:scale-110" />
            </div>
            <div class="p-6 flex flex-col h-[calc(100%-16rem)]">
              <div class="flex-grow">
                <h3 class="text-xl font-bold text-navy-900 mb-1">Георги Кирилов</h3>
                <p class="text-blue-600 font-medium mb-3">Съосновател & CTO</p>
                <p class="text-gray-600">Технологичен предприемач с над 10 години опит в разработката на софтуер и AI решения.</p>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-100">
                <button @click="scrollToSection('consultation')" 
                  class="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Icon name="lucide:message-circle" class="w-4 h-4" />
                  <span>Свържете се с мен</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Team Member 2 -->
          <div class="glass-card overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <div class="relative h-64 overflow-hidden">
              <img src="/images/verginia.jpg" 
                alt="Вергиния Накова" 
                class="object-cover w-full h-full transition-transform duration-500 hover:scale-110" />
            </div>
            <div class="p-6 flex flex-col h-[calc(100%-16rem)]">
              <div class="flex-grow">
                <h3 class="text-xl font-bold text-navy-900 mb-1">Вергиния Накова</h3>
                <p class="text-blue-600 font-medium mb-3">Съосновател & CЕO</p>
                <p class="text-gray-600">Експерт по бизнес операции и развитие с фокус върху оптимизация на процеси и растеж.</p>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-100">
                <button @click="scrollToSection('consultation')" 
                  class="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Icon name="lucide:message-circle" class="w-4 h-4" />
                  <span>Свържете се с мен</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Team Member 3 -->
          <div class="glass-card overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <div class="relative h-64 overflow-hidden">
              <img src="/images/nakov.jpg" 
                alt="Светлин Наков" 
                class="object-cover w-full h-full transition-transform duration-500 hover:scale-110" />
            </div>
            <div class="p-6 flex flex-col h-[calc(100%-16rem)]">
              <div class="flex-grow">
                <h3 class="text-xl font-bold text-navy-900 mb-1">Светлин Наков</h3>
                <p class="text-blue-600 font-medium mb-3">Стратегическо развитие</p>
                <p class="text-gray-600">Технологичен визионер и предприемач с над 20 години опит в образованието и софтуерната индустрия.</p>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-100">
                <button @click="scrollToSection('consultation')" 
                  class="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Icon name="lucide:message-circle" class="w-4 h-4" />
                  <span>Свържете се с мен</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Join Our Team Card -->
        <div class="glass-card p-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center">
          <div class="flex flex-col items-center justify-center">
            <Icon name="lucide:users" class="w-12 h-12 mb-4" />
            <h3 class="text-2xl font-bold mb-4">Присъединете се към нашия екип</h3>
            <p class="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Търсим талантливи професионалисти, които споделят нашата визия за иновации, базирани на AI
            </p>
            <Button size="lg" class="bg-white text-blue-600 hover:bg-blue-50 px-8" @click="scrollToSection('contacts')">
              <Icon name="lucide:briefcase" class="w-5 h-5 mr-2" />
              Напишете ни съобщение
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Floating Bottom Navigation -->
  <div class="hidden md:fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 hover:-translate-y-1">
    <div class="bg-white/80 backdrop-blur-lg shadow-lg rounded-full py-3 px-4 flex items-center space-x-2">
      <div class="flex items-center">
        <NuxtLink to="#" class="hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Empower Studio" class="h-6 w-auto mr-2" />
        </NuxtLink>
      </div>

      <div class="h-4 w-px bg-gray-300 mx-2"></div>

      <nav class="flex items-center space-x-6">
        <button @click="scrollToSection('services')" class="text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors">УСЛУГИ</button>
        <button @click="scrollToSection('how-it-works')" class="text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors">КАК РАБОТИМ</button>
        <button @click="scrollToSection('faq')" class="text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors">ЧЗВ</button>
        <button @click="scrollToSection('contacts')" class="text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors">КОНТАКТИ</button>
        <button @click="scrollToSection('team')" class="text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors">ЕКИП</button>
      </nav>

      <div class="h-4 w-px bg-gray-300 mx-2"></div>

      <Button variant="default" class="bg-black text-white hover:bg-gray-900 text-xs px-4 py-2 transition-all duration-300 hover:scale-105" @click="scrollToSection('book-consultation')">
        <Icon name="lucide:calendar" class="w-4 h-4 mr-1" />
        Да поговорим
      </Button>
    </div>
  </div>
</template>

<script setup>
// Initialize smooth scroll functionality
import { onMounted, ref } from 'vue';

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    // Add offset to account for any fixed headers
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Add IDs to sections that don't have them yet
onMounted(() => {
  // Ensure all sections referenced in the buttons have corresponding IDs
  const sections = {
    'services': 'services',
    'how-it-works': 'how-it-works',
    'faq': 'faq',
    'contacts': 'contacts',
    'team': 'team',
    'book-consultation': 'book-consultation'
  };
  
  // Check for any missing IDs and add them
  Object.entries(sections).forEach(([id, selector]) => {
    const element = document.getElementById(id);
    if (!element) {
      // If the section doesn't have an ID, find it by another means (like a class or position)
      // and add the ID
      const sectionElement = document.querySelector(`section[id="${selector}"]`);
      if (sectionElement && !sectionElement.id) {
        sectionElement.id = id;
      }
    }
  });

  // Implement scroll indicator
  const updateScrollIndicator = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.style.setProperty('--scroll-width', `${scrollPercent}%`);
    }
  };

  // Add scroll event listener for scroll indicator
  window.addEventListener('scroll', updateScrollIndicator);
  
  // Initialize scroll indicator
  updateScrollIndicator();
});

const formData = ref({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const submitStatus = ref(null);

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        from: formData.value.email,
        to: 'gkkirilov@gmail.com',
        subject: `Ново съобщение от ${formData.value.name} - Empower Studio EU`,
        text: `Ново съобщение от формата за контакт на Empower Studio EU\n\n` +
              `Име: ${formData.value.name}\n` +
              `Имейл: ${formData.value.email}\n\n` +
              `Съобщение:\n${formData.value.message}\n\n` +
              `--\nEmpower Studio EU\n` +
              `WorkBetter, бул. Черни Връх 51, София\n` +
              `info@empowerstudio.eu\n` +
              `+359 879 493 909`
      }
    });

    if (response.success) {
      submitStatus.value = {
        type: 'success',
        message: 'Съобщението е изпратено успешно!'
      };

      // Reset form
      formData.value = {
        name: '',
        email: '',
        message: ''
      };
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    submitStatus.value = {
      type: 'error',
      message: 'Възникна грешка при изпращането на съобщението. Моля, опитайте отново.'
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style>
/* Move scroll-behavior from html to body for better compatibility */
body {
  scroll-behavior: smooth;
  overflow-y: scroll; /* Ensure scrollbar is always present to prevent layout shifts */
}

.text-navy-900 {
  color: #0A2540;
}

.glass-card {
  @apply bg-white/50 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-3xl;
}

Badge {
  @apply rounded-full;
}

Button {
  @apply rounded-full;
}

.bg-blue-100\/50 {
  @apply rounded-2xl;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 3s infinite ease-in-out;
}

/* Add responsive styles */
@screen sm {
  .container {
    @apply px-6;
  }
}

@screen md {
  .container {
    @apply px-8;
  }
}

@screen lg {
  .container {
    @apply px-0;
  }
}

/* Hide floating navigation when footer is in view */
@media (max-height: 800px) {
  .floating-nav {
    display: none;
  }
}

/* Floating navbar animations */
.floating-nav {
  transition: all 0.3s ease-in-out;
}

.floating-nav:hover {
  transform: translateY(-4px);
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fixed.bottom-8 {
  animation: slideIn 0.5s ease-out;
}

/* Button interactions */
button, a {
  transition: all 0.2s ease;
}

button:focus, a:focus {
  outline: 2px solid rgba(37, 99, 235, 0.5);
  outline-offset: 2px;
}

button:active, a:active {
  transform: scale(0.98);
}

/* Scroll indicator for long pages */
.scroll-indicator {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(to right, #2563eb, #38bdf8);
  z-index: 100;
  width: var(--scroll-width, 0%);
}

/* Marquee logo styles */
.marquee-logo-container {
  --duration: 40s;
  padding: 1.5rem 0;
}

.marquee-logo-container img {
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
  margin: 0 2rem;
}

.marquee-logo-container img:hover {
  transform: scale(1.2);
}
</style>