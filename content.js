/* Все тексты, ссылки и порядок блоков сайта №06.
   **жирный** = выделение. Блок можно убрать, повторить или переставить в массиве blocks.
   only: "full"  — блок только на главной (с рекламой),
   only: "lesson" — блок только на /lesson/ (без рекламы). */
window.SITE = {
  lang: "ru",
  title: "Гайд Alterna: тема в одном месте",
  description: "Короткий гайд по теме: правило, примеры, проверка.",
  brand: { name: "Alterna", badge: "гайд" },

  links: {
    dias: "https://app.lava.top/products/2c950aa0-d8be-4317-8f39-0f9b4016f5da",
    timur: "https://app.lava.top/products/2cdbb9f8-e65b-443e-8d2c-4fea4c121e41",
    timurWhatsapp: "https://wa.me/message/RCHLEOGGLZ5OC1"
  },

  nav: [
    { label: "Главное", href: "#bento" },
    { label: "Проверь себя", href: "#check" },
    { label: "Шесть правил", href: "#rules" },
    { label: "Вопросы", href: "#faq" },
    { label: "Платформы", href: "#platforms", only: "full" }
  ],
  social: [
    { icon: "telegram", href: "", label: "Telegram" },  /* пустая ссылка = иконка скрыта */
    { icon: "whatsapp", href: "https://wa.me/message/RCHLEOGGLZ5OC1", label: "WhatsApp Тимура" }
  ],

  /* Ленты со словами (в образце ленты с логотипами сервисов). style: pill | script | cond | bold | outline */
  marquee: {
    rowA: [
      { t: "Merhaba", s: "pill" }, { t: "Hello", s: "script" }, { t: "GÜNAYDIN", s: "cond" },
      { t: "Thank you", s: "bold" }, { t: "Nasılsın?", s: "outline" }, { t: "See you", s: "script" },
      { t: "TEŞEKKÜRLER", s: "cond" }, { t: "How are you?", s: "pill" }
    ],
    rowB: [
      { t: "Good morning", s: "bold" }, { t: "Hoş geldin", s: "script" }, { t: "PLEASE", s: "cond" },
      { t: "Afiyet olsun", s: "pill" }, { t: "Cheers", s: "outline" }, { t: "Kolay gelsin", s: "bold" },
      { t: "NICE TO MEET YOU", s: "cond" }, { t: "Görüşürüz", s: "script" }
    ]
  },

  blocks: [
    {
      type: "hero", id: "top",
      bg: "media/hero-bg.webp",
      person: { src: "media/hero-person.webp", w: 557, h: 826, alt: "Диас в тёмной куртке и солнечных очках" },
      left: { script: "тема гайда", title: ["Главное", "по теме"] },
      right: { script: "без воды", title: ["за один", "вечер"] },
      text: "**Короткий гайд**: правило, примеры, проверка. Читаешь **за один вечер** и сразу пробуешь сам.",
      cta: { label: "Открыть гайд", href: "#bento" }
    },
    { type: "marquee" },
    {
      type: "bento", id: "bento",
      script: "Что внутри?", title: "Главное по теме",
      columns: [
        [
          { kind: "accent", big: "Правило", text: "**Одна мысль**", small: "простыми словами" },
          { kind: "image", img: "media/adv-book.webp", icon: "headphones", text: "**Объяснение** и озвучка каждого примера" },
          { kind: "image", img: "media/adv-phone.webp", icon: "cards", text: "**Карточки** со словами темы" }
        ],
        [
          { kind: "image", img: "media/adv-globe.webp", icon: "plane", text: "**Фразы** для поездки и жизни в стране" },
          { kind: "accent", big: "Примеры", text: "**Из живой речи**", small: "без учебникового языка" },
          { kind: "image", img: "media/adv-mic.webp", icon: "mic", text: "**Произношение**: слушай и повторяй вслух" }
        ],
        [
          { kind: "image", tall: true, img: "media/adv-cap.webp", icon: "cap", text: "**Для экзамена.** Здесь короткий разбор: в какой части теста встречается тема и как её проверяют. Текст меняется под каждый гайд." },
          { kind: "accent", big: "Проверка", text: "**Сразу в гайде**", small: "блок ниже" }
        ]
      ]
    },
    {
      type: "check", id: "check",
      bg: "media/cinema.webp",
      person: { src: "media/form-person.webp", w: 640, h: 908, alt: "Тимур в тёмной рубашке поло, чёрно-белое фото" },
      phones: [
        { src: "media/timur-m-route.webp", alt: "Маршрут от нуля до C1 на телефоне" },
        { src: "media/dias-m-roadmap.webp", alt: "Дорожная карта A0–A1 на телефоне" }
      ],
      title: ["Проверь себя", "прямо сейчас"],
      script: "и закрепи тему",
      text: "Впиши ответ и нажми кнопку. **Ошибиться здесь можно**, для этого блок и нужен.",
      fields: [
        { icon: "pen", label: "Переведи: привет", answers: ["hello", "hi", "merhaba", "selam"] },
        { icon: "chat", label: "Переведи: спасибо", answers: ["thank you", "thanks", "teşekkürler", "teşekkür ederim", "sağ ol"] }
      ],
      button: "Проверить",
      note: "**Подсказка** появится после проверки",
      results: {
        all: "**Всё верно.** Тема держится.",
        some: "**Почти.** Верные варианты: ",
        none: "**Пока мимо.** Верные варианты: "
      }
    },
    {
      type: "rules", id: "rules",
      script: "Запомни главное", title: "Шесть правил",
      text: "Шесть коротких правил по теме гайда. **Каждое помещается в одну строку.**",
      img: { src: "media/guarantee-objects.webp", alt: "Чёрные 3D-предметы: книга, наушники, будильник, карандаш" },
      left: [
        "**Начни с примера**, правило потом",
        "**Говори вслух** каждую новую фразу",
        "**Одна тема за раз**, без прыжков"
      ],
      right: [
        "**Повтори через день**, потом через неделю",
        "Пиши **свои примеры** про свою жизнь",
        "**Проверяй себя** в конце каждого блока"
      ],
      cta: { label: "Проверить себя", href: "#check" }
    },
    {
      type: "faq", id: "faq",
      script: "Отвечаем на самые", title: "Частые вопросы",
      person: { src: "media/faq-person.webp", w: 700, h: 975, alt: "Тимур в тёмно-зелёной рубашке" },
      items: [
        { q: "С какого уровня подойдёт гайд?", a: "Гайд написан так, чтобы его понял человек без опыта в теме. Если тема уже знакома, листай сразу к блоку «Проверь себя»." },
        { q: "Сколько времени нужно на гайд?", a: "Один спокойный вечер. Читаешь, повторяешь примеры вслух и проходишь проверку." },
        { q: "Нужно ли учить правило наизусть?", a: "Нет. Запоминаются примеры. Правило помогает понять, почему пример устроен именно так." },
        { q: "Что делать, если не получается?", a: "Вернись к примерам и прочитай их вслух ещё раз. Потом снова пройди проверку." },
        { q: "Где взять больше практики?", a: "Придумай пять своих примеров про свою жизнь и проговори их. Это самая полезная практика после гайда." },
        { q: "Можно сохранить гайд?", a: "Да. Добавь страницу в закладки или сделай скриншот блока «Шесть правил»." }
      ]
    },

    /* ===== РЕКЛАМА (только на главной) ===== */
    {
      type: "band", id: "platforms", only: "full",
      script: "английский и турецкий", title: "Две платформы",
      text: "Этот гайд одна тема. **На платформах Dias English и Alterna Timur** так разобраны сотни тем, от A0 до C1."
    },
    {
      type: "author", only: "full",
      photo: { src: "media/author-dias.webp", w: 760, h: 706, alt: "Диас в кепке, чёрно-белый портрет" },
      title: ["Dias", "English"],
      paras: [
        "Курс английского в Notion. **Уровни от A0 до C1**, у каждого своя **дорожная карта по неделям**: что учить, в каком порядке и когда проверить себя.",
        "Собрал Диас. Вырос в ауле Казыгурт, учился в НИШ, сейчас учится в **Sapienza в Риме**. Курс устроен как карта, которой ему самому не хватало."
      ],
      button: { label: "Купить · 30 €", link: "dias", icons: ["book", "headphones", "chat"] },
      side: "Один платёж, доступ навсегда"
    },
    {
      type: "task", only: "full",
      label: "Знакомо",
      text: "Английский был в школе и на курсах. Слова знаешь, правила слышал. **А что учить сегодня вечером, непонятно**, и вечер уходит на выбор видео.",
      shot: { src: "media/dias-m-roadmap.webp", w: 600, h: 1200, alt: "Дорожная карта A0–A1 на телефоне" },
      after: "В Dias English следующий шаг **видно на карте**. Отмечаешь галочками."
    },
    {
      type: "shots", only: "full",
      script: "Настоящие скриншоты", title: "Dias English внутри",
      items: [
        { src: "media/dias-n-b2-hub-desktop-hero.webp", w: 1100, h: 688, cap: "**Главная уровня.** Навигация по разделам, подборка ресурсов и таймер.", big: true },
        { src: "media/dias-m-gemini.webp", w: 600, h: 1200, cap: "**Gemini.** Ситуации для разговора с ИИ: магазин, касса, аптека, врач.", phone: true },
        { src: "media/dias-n-a0-roadmap-desktop-01.webp", w: 1100, h: 688, cap: "**Этапы по неделям.** Чек-лист на каждый этап, в конце тест." },
        { src: "media/dias-n-b2-grammar-desktop-01.webp", w: 1100, h: 688, cap: "**Грамматика B2.** Passive voice, Conditionals и другие темы." },
        { src: "media/dias-n-a0-lexika-desktop-01.webp", w: 1100, h: 688, cap: "**Lexika.** Слова по темам с картинками: работа, еда, погода, покупки." },
        { src: "media/dias-n-a2-hub-desktop-01.webp", w: 1100, h: 688, cap: "**Трекер и привычки.** Минуты на грамматику, лексику и чтение." }
      ],
      stats: [
        { big: "210+", text: "**гайдов**", small: "по грамматике" },
        { big: "170+", text: "**гайдов по лексике**", small: "с озвучкой и проверкой от ИИ" },
        { big: "700+", text: "**материалов в архиве**", small: "книги, фильмы, аудио, экзамены" }
      ],
      cta: { label: "Купить Dias English", link: "dias" }
    },
    {
      type: "levels", only: "full",
      script: "Все уровни за 30 €", title: "Для кого",
      items: [
        { tag: "A0–A1", title: "С нуля", text: "До первых диалогов в магазине, кафе и аэропорту. **Дорожная карта на 16 недель.**" },
        { tag: "A2–B1", title: "Говоришь просто", text: "И хочешь говорить свободно, не подбирая слова. **Подойдёт перед поступлением и переездом.**" },
        { tag: "B2–C1", title: "Учёба и работа", text: "Споры на английском, лексика продвинутого уровня, **четыре навыка отдельными страницами.**" }
      ]
    },
    {
      type: "author", only: "full", flip: true,
      photo: { src: "media/author-timur.webp", w: 760, h: 733, alt: "Тимур, чёрно-белый портрет" },
      title: ["Alterna", "Timur"],
      paras: [
        "Турецкий **от A0 до C1** в Notion. Каждая тема разобрана как на канале: сначала понятно, потом руками.",
        "Лексика по темам, **то, что реально говорят**. Экзамены отдельным блоком на каждый уровень, гайды для тех, кто ищет работу в Турции."
      ],
      button: { label: "Купить · 30 €", link: "timur", icons: ["plane", "book", "chat"] },
      side: "Один раз, без подписки"
    },
    {
      type: "solution", only: "full",
      label: "Решение",
      pain: "Отпуск в Турции через месяц. В приложении учишь «elma» и «kedi». **В кафе всё равно показываешь пальцем в меню.**",
      text: "В Alterna Timur **лексика разложена по ситуациям**: кафе, отель, врач, такси. Плюс грамматика, чтобы собирать **свои фразы**, а не заучивать чужие.",
      shots: [
        { src: "media/timur-n-produkty.webp", alt: "Таблица слов с транскрипцией" },
        { src: "media/timur-n4-dialog.webp", alt: "Диалог с озвучкой каждой реплики" },
        { src: "media/timur-n7-sinema.webp", alt: "Кинокаталог по уровням" }
      ]
    },
    {
      type: "shots", only: "full",
      script: "Настоящие скриншоты", title: "Alterna Timur внутри",
      items: [
        { src: "media/timur-n-leksika.webp", w: 1100, h: 644, cap: "**Лексика по темам.** Блоки с фото: университет, внешность, деньги, профессия.", big: true },
        { src: "media/timur-m-route.webp", w: 540, h: 1169, cap: "**Маршрут от нуля до C1.** Видно, что учить дальше.", phone: true },
        { src: "media/timur-n-b1c1.webp", w: 1100, h: 560, cap: "**Раздел B1–B2–C1.** Навигация и подборка ресурсов." },
        { src: "media/timur-n-a0a2.webp", w: 1100, h: 522, cap: "**Раздел A0–A1–A2.** Открываешь и идёшь по порядку." },
        { src: "media/timur-n-produkty.webp", w: 1100, h: 563, cap: "**Таблица слов** с транскрипцией кириллицей." },
        { src: "media/timur-n-progress.webp", w: 1100, h: 622, cap: "**Словообразование.** Суффиксы и сложные слова." }
      ],
      stats: [
        { big: "128", text: "**гайдов по грамматике**", small: "58 для A1–A2 и 70 для B1–C1" },
        { big: "131", text: "**блок лексики**", small: "по темам" },
        { big: "109", text: "**интерактивных ресурсов**", small: "слова, тексты, диалоги, игры" },
        { big: "32", text: "**блока по экзаменам**", small: "A1, A2, B1, B2, C1" },
        { big: "36", text: "**гайдов по работе**", small: "ищешь работу или уже работаешь" },
        { big: "1716", text: "**материалов по уровням**", small: "фильмы, книги, подкасты" }
      ],
      cta: { label: "Купить Alterna Timur", link: "timur" }
    },
    {
      type: "levels", only: "full",
      script: "Кому подойдёт", title: "Alterna Timur",
      items: [
        { tag: "tatil", title: "Едешь в Турцию", text: "Заказать кофе, прочитать вывеску и **понять ответ**, а не кивать." },
        { tag: "dizi", title: "Любишь сериалы", text: "Фильмы и подкасты **разложены по уровням**. Берёшь свой." },
        { tag: "sınav", title: "Нужен экзамен", text: "A1, A2, B1, B2, C1. **По каждому уровню отдельный блок.**" },
        { tag: "iş", title: "Живёшь в Турции", text: "**Гайды по работе** для тех, кто ищет работу или уже работает." }
      ]
    },
    {
      type: "price", only: "full",
      script: "Один платёж", title: "Выбери язык",
      cards: [
        {
          name: "Dias English", price: "30 €", sub: "один раз, доступ навсегда",
          list: ["Дорожные карты A0–A1, A2–B1, B2–C1", "210+ гайдов по грамматике", "Lexika: 170+ гайдов с озвучкой", "Практика с ИИ в Gemini", "Трекер привычек, календарь, таймер", "Архив: 700+ книг, фильмов, аудио и экзаменов"],
          button: { label: "Купить Dias English", link: "dias" },
          note: "Хватает **бесплатного Notion**"
        },
        {
          name: "Alterna Timur", price: "30 €", sub: "один раз, доступ навсегда",
          list: ["Уровни от A0 до C1", "128 гайдов по грамматике", "131 блок лексики по темам", "109 интерактивных ресурсов", "32 блока по экзаменам и 36 гайдов по работе", "1716 материалов по уровням"],
          button: { label: "Купить Alterna Timur", link: "timur" },
          extra: { label: "Спросить в WhatsApp", link: "timurWhatsapp" },
          note: "**Подписки нет**"
        }
      ]
    },

    /* ===== КОНЦОВКА БЕЗ РЕКЛАМЫ (только /lesson/) ===== */
    {
      type: "end", only: "lesson",
      title: ["Гайд", "пройден"],
      text: "Вернись к блоку **«Шесть правил»** через день и проверь, что осталось в голове.",
      button: { label: "Наверх", href: "#top" }
    },

    { type: "marquee", footer: true }
  ],

  footer: "Alterna · гайд · 2026"
};
