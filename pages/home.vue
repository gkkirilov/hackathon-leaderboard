<template>
  <main class="bg-white">

    <!-- Hero Section -->
    <section class="pt-32 pb-20 md:pt-40 md:pb-32">
      <div class="container mx-auto px-5 md:px-10">
        <div class="max-w-[900px] mx-auto text-center">
          <img src="/logo.png" alt="Empower Studio" class="h-12 md:h-16 mx-auto mb-8" 
               v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" />
          
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-4"
              v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
            <span class="text-black">AI & Автоматизация</span> <span class="text-blue-600">Която Ви Спестява Пари.</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed mb-10"
             v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }">
            Ние създаваме персонализиран AI софтуер и решения за автоматизация, които елиминират неефективността, намаляват разходите и помагат на бизнесите да се разрастват по-бързо.
          </p>
          
          <div class="bg-neutral-50 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto mb-10"
               v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }">
            <p class="font-medium text-lg md:text-xl text-neutral-800 mb-2">✅ Намалете Разходите. Автоматизирайте Работния Процес. Увеличете Печалбите.</p>
            <p class="text-neutral-600">📌 Вземете БЕЗПЛАТНА Консултация Днес – Нека открием къде губите пари и как автоматизацията може да помогне.</p>
          </div>
          
          <a href="#consultation" 
             class="inline-block py-4 px-10 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
             v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }">
            🔹 Вземи Безплатна Консултация 🔹
          </a>
        </div>
      </div>
    </section>

    <!-- Why Work With Us Section -->
    <section class="py-20 md:py-32 bg-neutral-50">
      <div class="container mx-auto px-5 md:px-10">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 text-center"
              v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }">
            Защо Да Работите С Empower Studio?
          </h2>
          <div class="w-20 h-1 bg-black mx-auto mb-6"></div>
          
          <p class="text-xl text-neutral-700 text-center mb-16 max-w-3xl mx-auto"
             v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
            Вашият бизнес губи пари чрез неефективни процеси, загубено време и остарели системи. Ние решаваме това.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8"
               v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }">
            <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div class="text-4xl font-medium text-blue-600 mb-4">🚀</div>
              <h3 class="text-2xl font-bold mb-4 text-black">AI & Автоматизация</h3>
              <p class="text-neutral-600">Работете по-умно, не по-усилено.</p>
            </div>
            
            <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div class="text-4xl font-medium text-blue-600 mb-4">💰</div>
              <h3 class="text-2xl font-bold mb-4 text-black">Спестете Пари</h3>
              <p class="text-neutral-600">Намалете оперативните разходи и увеличете печалбите.</p>
            </div>
            
            <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div class="text-4xl font-medium text-blue-600 mb-4">⏳</div>
              <h3 class="text-2xl font-bold mb-4 text-black">Спестете Време</h3>
              <p class="text-neutral-600">Автоматизирайте повтарящите се задачи, за да може екипът ви да се фокусира върху важното.</p>
            </div>
            
            <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div class="text-4xl font-medium text-blue-600 mb-4">📈</div>
              <h3 class="text-2xl font-bold mb-4 text-black">Растете По-Бързо</h3>
              <p class="text-neutral-600">AI-базираната ефективност отключва бърз растеж.</p>
            </div>
          </div>
          
          <div class="text-center mt-16">
            <a href="#consultation" class="inline-block py-4 px-10 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              🔹 Вземи Безплатна Консултация 🔹
            </a>
            <p class="text-neutral-600 mt-3">Нека Идентифицираме Вашата Най-Голяма Възможност за Спестяване</p>
          </div>
        </div>
      </div>
    </section>

    <!-- The Problem Section -->
    <section class="py-24">
      <div class="container mx-auto px-5 md:px-10">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 text-center"
              v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }">
            Проблемът, Който Решаваме
          </h2>
          <div class="w-20 h-1 bg-black mx-auto mb-16"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div v-motion :initial="{ opacity: 0, x: -50 }" :enter="{ opacity: 1, x: 0 }">
            <div class="bg-red-50 rounded-3xl p-8 border border-red-100 mb-8">
              <h3 class="text-2xl font-bold mb-6 text-red-600">🔴 Вашият Бизнес Губи Време и Пари.</h3>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  <span class="text-neutral-700">Повтарящите се задачи отнемат часове всяка седмица.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  <span class="text-neutral-700">Ръчните процеси забавят операциите.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  <span class="text-neutral-700">Човешките грешки водят до скъпи грешки.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  <span class="text-neutral-700">Плащате твърде много за неща, които AI може да прави автоматично.</span>
                </li>
              </ul>
            </div>
            
            <div class="bg-blue-50 rounded-3xl p-8 border border-blue-100">
              <h3 class="text-2xl font-bold mb-6 text-blue-600">💡 Решението? AI & Автоматизация на Процесите.</h3>
              <p class="text-neutral-700 mb-4">
                Empower Studio създава AI-базирани решения, които вършат работата вместо вас, за да можете да се фокусирате върху растежа и иновациите.
              </p>
              <p class="text-neutral-700 font-medium">
                📌 Започнете с БЕЗПЛАТНА Консултация – Нека разберем колко пари може да ви спести автоматизацията.
              </p>
            </div>
          </div>
          
          <div class="relative h-[500px] md:h-[600px]" v-motion :initial="{ opacity: 0, x: 50 }" :enter="{ opacity: 1, x: 0 }">
            <div class="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-3/4 h-3/4 rounded-3xl bg-white/80 backdrop-blur-md shadow-lg p-8 flex flex-col items-center justify-center">
                  <div class="text-8xl mb-8">💸</div>
                  <div class="text-center">
                    <div class="text-4xl font-bold text-red-500 line-through">$$$</div>
                    <div class="text-5xl font-bold text-green-500 mt-2">$</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-16">
          <a href="#consultation" class="inline-block py-4 px-10 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
            🔹 Вземи Безплатна Консултация 🔹
          </a>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-24 bg-neutral-50">
      <div class="container mx-auto px-5 md:px-10">
        <div class="max-w-4xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 text-center"
              v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }">
            Как Работи – Просто, Бързо, Ефективно
          </h2>
          <div class="w-20 h-1 bg-black mx-auto mb-10"></div>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }">
              <div class="font-bold text-xl text-blue-600 mb-4">Стъпка 1</div>
              <h3 class="text-xl font-bold mb-4 text-black">Безплатен AI & Автоматизационен Одит</h3>
              <p class="text-neutral-600">Идентифицираме неефективностите, които ви струват пари.</p>
            </div>
            
            <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
              <div class="font-bold text-xl text-blue-600 mb-4">Стъпка 2</div>
              <h3 class="text-xl font-bold mb-4 text-black">Персонализирана Стратегия</h3>
              <p class="text-neutral-600">Проектираме персонализирано решение за автоматизация и AI софтуер.</p>
            </div>
            
            <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }">
              <div class="font-bold text-xl text-blue-600 mb-4">Стъпка 3</div>
              <h3 class="text-xl font-bold mb-4 text-black">Внедряване и Обучение</h3>
              <p class="text-neutral-600">Изграждаме, интегрираме и обучаваме вашия екип.</p>
            </div>
            
            <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }">
              <div class="font-bold text-xl text-blue-600 mb-4">Стъпка 4</div>
              <h3 class="text-xl font-bold mb-4 text-black">Постоянна Оптимизация</h3>
              <p class="text-neutral-600">Гарантираме, че вашата система продължава да дава резултати.</p>
            </div>
          </div>
          
          <div class="bg-blue-50 rounded-3xl p-8 border border-blue-100 mt-12 text-center"
               v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }">
            <p class="text-xl font-medium text-neutral-800">📌 100% Готово-за-Вас AI & Автоматизация. Не са Необходими Технически Умения.</p>
          </div>
          
          <div class="text-center mt-12">
            <a href="#consultation" class="inline-block py-4 px-10 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              🔹 Вземи Безплатна Консултация 🔹
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Who Can Benefit Section -->
    <section class="py-24">
      <div class="container mx-auto px-5 md:px-10">
        <div class="max-w-4xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 text-center"
              v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }">
            Кой Може Да Използва?
          </h2>
          <div class="w-20 h-1 bg-black mx-auto mb-10"></div>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex items-start p-6 bg-neutral-50 rounded-2xl"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }">
              <div class="text-green-500 text-2xl mr-4">✔</div>
              <p class="text-neutral-700">Бизнес собственици, които се затоптват в ръчни работи.</p>
            </div>
            
            <div class="flex items-start p-6 bg-neutral-50 rounded-2xl"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
              <div class="text-green-500 text-2xl mr-4">✔</div>
              <p class="text-neutral-700">Компании, които търсят да намалят разходите и да мащабират ефективно.</p>
            </div>
            
            <div class="flex items-start p-6 bg-neutral-50 rounded-2xl"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }">
              <div class="text-green-500 text-2xl mr-4">✔</div>
              <p class="text-neutral-700">Лидери, които искат AI-базирана автоматизация, за да максимизират печалбите.</p>
            </div>
            
            <div class="flex items-start p-6 bg-neutral-50 rounded-2xl"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }">
              <div class="text-green-500 text-2xl mr-4">✔</div>
              <p class="text-neutral-700">Предприемачи, които търсят конкурентно предимство в своята индустрия.</p>
            </div>
          </div>
          
          <div class="mt-12 text-center">
            <p class="text-lg text-neutral-700 mb-8">Не позволявайте неефективностите да изтощават вашите печалби. Нека ги поправим безплатно в вашата консултация.</p>
            <a href="#consultation" class="inline-block py-4 px-10 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              🔹 Вземи Безплатна Консултация 🔹
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 bg-black text-white">
      <div class="container mx-auto px-5 md:px-10">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-center"
            v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }">
          Реални Бизнеси, Реални Резултати
        </h2>
        <div class="w-20 h-1 bg-white mx-auto mb-16"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div class="bg-neutral-900 p-8 rounded-3xl"
               v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }">
            <p class="text-xl mb-6 text-neutral-200">💬 "Empower Studio ни спести над 50 000 лева годишно чрез автоматизация на операциите ни. Най-добрата инвестиция, която някога сме правили!"</p>
            <p class="text-blue-400 font-medium">– [Име на Клиент]</p>
          </div>
          
          <div class="bg-neutral-900 p-8 rounded-3xl"
               v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
            <p class="text-xl mb-6 text-neutral-200">💬 "Увеличихме мащаба си 3 пъти за една година—всичко благодарение на AI автоматизацията от Empower Studio."</p>
            <p class="text-blue-400 font-medium">– [Име на Клиент]</p>
          </div>
          
          <div class="bg-neutral-900 p-8 rounded-3xl"
               v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }">
            <p class="text-xl mb-6 text-neutral-200">💬 "Намалихме 80% от ръчната работа, позволявайки на екипа ни да се фокусира върху това, което наистина има значение."</p>
            <p class="text-blue-400 font-medium">– [Име на Клиент]</p>
          </div>
        </div>
        
        <div class="text-center mt-16">
          <p class="text-xl text-neutral-300 mb-8">📌 Искате подобни резултати? Нека започнем с безплатна консултация.</p>
          <a href="#consultation" class="inline-block py-4 px-10 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
            🔹 Вземи Безплатна Консултация 🔹
          </a>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-24">
      <div class="container mx-auto px-5 md:px-10">
        <div class="max-w-4xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 text-center"
              v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }">
            Защо Да Изберете Empower Studio?
          </h2>
          <div class="w-20 h-1 bg-black mx-auto mb-10"></div>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white shadow-sm rounded-3xl p-8 border border-neutral-100"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }">
              <div class="flex items-start mb-4">
                <div class="text-red-500 text-2xl mr-4">❌</div>
                <h3 class="text-xl font-bold text-black">Няма Generic Software</h3>
              </div>
              <p class="text-neutral-600 ml-10">Ние създаваме решения, които са персонализирани за вашия бизнес.</p>
            </div>
            
            <div class="bg-white shadow-sm rounded-3xl p-8 border border-neutral-100"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
              <div class="flex items-start mb-4">
                <div class="text-green-500 text-2xl mr-4">💰</div>
                <h3 class="text-xl font-bold text-black">ROI-Driven Approach</h3>
              </div>
              <p class="text-neutral-600 ml-10">Нашите решения се изплащат от себе си в икономии.</p>
            </div>
            
            <div class="bg-white shadow-sm rounded-3xl p-8 border border-neutral-100"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }">
              <div class="flex items-start mb-4">
                <div class="text-blue-500 text-2xl mr-4">🔄</div>
                <h3 class="text-xl font-bold text-black">Готово-за-Вас Изпълнение</h3>
              </div>
              <p class="text-neutral-600 ml-10">Ние обработваме всичко, от стратегия до стартиране.</p>
            </div>
            
            <div class="bg-white shadow-sm rounded-3xl p-8 border border-neutral-100"
                 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }">
              <div class="flex items-start mb-4">
                <div class="text-yellow-500 text-2xl mr-4">📈</div>
                <h3 class="text-xl font-bold text-black">Гарантирано Резултати</h3>
              </div>
              <p class="text-neutral-600 ml-10">Ако не ни помогнем да намалим разходите, вие получавате безплатен план за оптимизация.</p>
            </div>
          </div>
          
          <div class="bg-blue-50 rounded-3xl p-8 border border-blue-100 mt-12 text-center"
               v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }">
            <p class="text-xl font-medium text-neutral-800">📌 AI & Автоматизация са бъдещето – Не се оставяйте зад.</p>
          </div>
          
          <div class="text-center mt-12">
            <a href="#consultation" class="inline-block py-4 px-10 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              🔹 Вземи Безплатна Консултация 🔹
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ Section -->
    <section class="py-24 bg-neutral-50">
      <div class="container mx-auto px-5 md:px-10">
        <div class="max-w-4xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 text-center"
              v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }">
            ЧЗВ – Всички Важни Въпроси
          </h2>
          <div class="w-20 h-1 bg-black mx-auto mb-10"></div>
        </div>
        
        <div class="max-w-3xl mx-auto space-y-6">
          <div class="bg-white rounded-2xl shadow-sm p-8"
               v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }">
            <h3 class="text-xl font-bold mb-4 text-neutral-800">❓ Е AI & автоматизация скъпа?</h3>
            <p class="text-neutral-600">✅ Нашите решения спестяват повече, отколкото струват, и осигуряват положителен ROI.</p>
          </div>
          
          <div class="bg-white rounded-2xl shadow-sm p-8"
               v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
            <h3 class="text-xl font-bold mb-4 text-neutral-800">❓ Колко време отнема да се видят резултати?</h3>
            <p class="text-neutral-600">✅ Най-често клиентите виждатmeasurable икономии в седмици.</p>
          </div>
          
          <div class="bg-white rounded-2xl shadow-sm p-8"
               v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }">
            <h3 class="text-xl font-bold mb-4 text-neutral-800">❓ Какво, ако вече използвам софтуер?</h3>
            <p class="text-neutral-600">✅ Ние оптимизираме вашите съществуващи инструменти или изграждаме нещо по-добро.</p>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <p class="text-lg text-neutral-700 mb-8">📌 Все още имате въпроси? Нека ги обсъдим в вашата безплатна консултация.</p>
          <a href="#consultation" class="inline-block py-4 px-10 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
            🔹 Вземи Безплатна Консултация 🔹
          </a>
        </div>
      </div>
    </section>

    <!-- Consultation Section -->
    <section id="consultation" class="py-24">
      <div class="container mx-auto px-5 md:px-10">
        <div class="max-w-4xl mx-auto mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 text-center"
              v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }">
            🚀 Нека изградим Плана за AI & Автоматизация – За Безплатно!
          </h2>
          <div class="w-20 h-1 bg-black mx-auto mb-6"></div>
          <p class="text-xl text-center text-neutral-700"
             v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
            📌 Ограничени Безплатни Консултационни Слотове Достъпни – Запишете Сега.
          </p>
        </div>
        
        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-3xl overflow-hidden shadow-md">
            <div class="p-6 bg-blue-50 border-b border-blue-100">
              <h3 class="text-2xl font-bold text-black">Запишете Безплатна Консултация</h3>
              <p class="text-neutral-600 mt-2">Нека открием къде вашият бизнес губи пари и как автоматизацията може да помогне</p>
            </div>
            <ClientOnly>
              <iframe
                src="https://calendly.com/gkkirilov/30?embed_domain=microsass&embed_type=Inline&hide_gdpr_banner=1&background_color=ffffff&text_color=000000&primary_color=2563eb"
                width="100%"
                height="700"
                frameborder="0"
                title="Select a Date & Time - Empower Studio"
                data-ready="true"
              ></iframe>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
// No features or projects needed for this design

// Add Calendly script to head
useHead({
  script: [
    {
      src: 'https://assets.calendly.com/assets/external/widget.js',
      async: true,
    },
  ],
})
</script>

<style>
/* Apple-inspired smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Enhance focus styles for accessibility while keeping Apple-like aesthetics */
*:focus-visible {
  outline: 2px solid rgba(0, 125, 250, 0.6);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>

