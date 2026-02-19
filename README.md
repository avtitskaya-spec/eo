 ## Структура проекта
<pre>
├── src/                            
│   ├── builders/                   
│   │   ├── index.js
│   │   └── product.builder.js
│   │
│   ├── helpers/                    
│   │   └── fixtures/               
│   │       ├── api.fixture.js
│   │       └── fixture.js
│   │
│   ├── pages/                     
│   │   ├── app.page.js
│   │   ├── checkout.page.js
│   │   ├── index.js
│   │   ├── main.page.js
│   │   ├── mini-cart.page.js
│   │   └── product.page.js
│   │
│   ├── routes/                   
│   │   └── page.routes.js
│   │
│   └── services/                  
│       ├── index.js
│       └── page.service.js
│
├── tests/                     
│   ├── api/
│   │   └── catalog-health.spec.js
│   │
│   └── ui/
│       ├── checkout.spec.js
│       └── mainPage.spec.js
</pre>

 ## Установка и запуск
 ```bash
npm install
```
```bash
npx playwright install --with-deps
```

### Запуск всех тестов
 ```bash
npm test
```

 ## Allure отчёт
```bash
allure generate allure-results
```
```bash
allure open allure-report

```
<img width="1907" height="929" alt="image" src="https://github.com/user-attachments/assets/2db22c78-f6eb-468e-bfb3-2eebd2286e99" />


 ## Telegram отчёт
 <img width="564" height="547" alt="image" src="https://github.com/user-attachments/assets/8ceeac56-07de-4dd2-a9c0-7f7b737d78be" />

 ##  TestOps
<img width="1912" height="941" alt="image" src="https://github.com/user-attachments/assets/e7beb283-6751-442f-8a77-bdd08e2cd550" />

## ⚠️ Важное 

Все тесты в текущем проекте **не проходят** при запуске через GitHub,  
так как на сайте включена **капча**, которая блокирует автоматические запросы.  
