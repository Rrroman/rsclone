## Description

[RSSchool task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md)

This project is a clone of [Trello](https://trello.com/)

The root project is just a wrapper around two completely independent apps (client and server). You can do your work form the root or jump straight to the project you are interested in

## Installation

```bash
npm install
```

Will install dependencies for all projects including nested ones

## Running the app

```bash
# watch mode
npm run start:dev
```

Run watch scripts for client and server

---

## Description

[RSSchool task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md)

This project is a clone of [Trello](https://trello.com/)

The root project is just a wrapper around two completely independent apps (client and server). You can do your work form the root or jump straight to the project you are interested in

## Installation

```bash
npm install
```

Will install dependencies for all projects including nested ones

## Running the app

```bash
# watch mode
npm run start:dev
```

Run watch scripts for client and server

---

## Front End:

 - Приложение в стиле **SPA** (Single Page Application): архитектура создания “пустой” страницы HTML, в которой генерируется вся структура сайта с помощью JS, а благодаря динамическому обновлению во время использования приложения не нужно перезагружать страницу или подгружать новые страницы. 
*Проблемы*: затраты времени при написании каждого тега и присвоении ему классов и атрибутов через JS. 
*Решения*: благодаря livecoding virtual keyboard мы узнали про функцию create(), которую переделали для использования с typescript упростила создание HTML разметки и помогла придерживаться принципа DRY (Do not Repeat Yourself) меньше повторений в коде.

- **Typescript** - использован для предотвращение ошибок в коде, на раннем этапе, а также для более понятного кода (подсказывает какой тип данных и какое количество параметров ожидает функция или класс, что ускоряет процесс разработки). 
*Проблемы*: сложность при написании кода (в том числе из-за того, что нужно было привыкнуть к новому стилю написания кода и, следовательно, потратить больше времени на старте). 
*Решение*: опыт.

- **MVC** (Model View Controller) паттерн проектирования - для структуры проекта. Также каждый компонент имеет структуру MVC. 
*Проблемы*: в ходе разработки мы столкнулись с тем, что компоненты должны использовать данные других компонентов, поэтому в итоге пришлось “объединять” разные модели компонентов, но всё же плюс от разделения кода остался.
*Решение*: объединить нужные модели.

- **EventEmitter** - для облегчения работы с событиями. 
  
- **Webpack** - для сборки модулей.	

- **HTML5 Drag&Drop** - для реализации перемещения карточек. - Проблемы: так как нужно было перемещать как столбцы так и сами карточки между столбцами возникали проблемы с вставкой, события drop и  over срабатывали на все элементы, 
*Решение*: сделать переменные определяющие тип перемещаемого элемента - карточки или колонки.
	 

## Back End:

- Сервер **NodeJS**, используется **Express** фреймворк. Достоинство - простота применения. Была попытка внедрения NestJS фреймворка при помощи ментора, но так как был небольшой опыт внедрения express выбрали его.

- База данных **MongoDB** - как гибкая модель данных позволяющая расширяться.
  
- **Bycrypt** библиотека - для безопасности. Пароли пользователя передаются в зашифрованном виде. 
  
- **JWT** (JSON Web Token) - для авторизации. 
  
- **Validator** библиотека - для валидации пароля и логина пользователя. 
