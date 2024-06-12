# ПОСИЛАННЯ НА МАКЕТ

FIGMA LAYOUT 🔗 https://www.figma.com/file/.....

# ⚡ VITE Starter kit

## 1) Запуск збірки

Встановити залежності проєкту:

```
pnpm install / yarn / npm i
```

Запустити проєкт в режимі розробки:

```
pnpm dev / yarn dev / npm dev
```

Створити локальний білд:

```
pnpm preview / yarn preview / npm run preview
```

Створити білд для продакшену:

```
pnpm build / yarn build / npm run build
```

## 2) Інформація про збірку

- В збірці використовується шаблонизатор
  [Nunjucks](https://mozilla.github.io/nunjucks/templating.html)

  > Сторінки проекту зберігаються у папці **«src/assets/html/pages»**.
  >
  > Секційні фрагменти зберігаються у папці **«src/assets/html/sections**.

- В збірці використовується CSS framework [Tailwind](https://tailwindcss.com/docs/installation) та
  CSS з nesting.

- В збірці є автоматична оптимізація усіх зображень.

- В збірці є автоматичне створення WEBP зображень. Покладіть jpg або png зображення і збірка
  автоматично створить webp.
