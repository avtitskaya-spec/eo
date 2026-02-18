 ## Структура проекта
src/
 ├── helpers/
 │    └── builders/
 ├── fixtures/
 │    └── fixture.js
 ├── pages/
 │    ├── app.page.js
 │    ├── checkout.page.js
 │    ├── main.page.js
 │    ├── mini-cart.page.js
 │    └── product.page.js
 ├── routes/
 │    └── page.routes.js
 └── services/
      ├── index.js
      └── page.service.js

tests/
 ├── api/
 │    └── check-pages.spec.js
 ├── checkout.spec.js
 └── mainPage.spec.js

 ## Установка и запуск
npm install
npx playwright install --with-deps
### Запуск всех тестов
npm test

 ## Allure отчёт
allure generate allure-results
allure open allure-report

