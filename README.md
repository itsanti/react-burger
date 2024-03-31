
# Stellar Burger
Учебный проект на курсе [**React-разработчик**](https://practicum.yandex.ru/react/) от Я Практикум. [**Программа**](https://code.s3.yandex.net/react/syllabys_React.pdf) курса.
## Стек
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React DND](https://img.shields.io/badge/React_DnD-CA4245?style=for-the-badge&logo=react&logoColor=white) ![CSS Modules](https://img.shields.io/badge/CSS_Modules-48B0F1.svg?style=for-the-badge&logoColor=white) ![WebSocket](https://img.shields.io/badge/WebSocket-FDEE21?style=for-the-badge&logoColor=black) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
- **React**
- **TypeScript**
- **React Router V6** -- маршрутизация в приложении
- **React DND** -- перетаскивание элементов в конструктор заказа и сортировка
- **Redux/Toolkit** 
- **CSS Modules**
- **Rest api**
- **WebSocket** -- лента заказов
- **JWT** -- регистрация и авторизация
- [React Developer Burger UI Components](https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/)
## Описание
Интерактивный конструктор бургеров, с возможностью перетаскивать ингредиенты и создавать свой собственный бургер в конструкторе.
## Функциональность
- Авторизация и регистрация пользователей.
- Сброс и восстановление забытого пароля.
- Drag'n'drop интерфейс конструктора бургеров.
- Расчет суммы заказа в реальном времени  и счетчики для каждого ингредиента.
- Динамическая лента заказов всех пользователей `/feed` и ваших заказов `/profile/order
- Отображение данных о заказе и об ингредиентах в модальных окнах.
- Вложенные и динамические маршруты в приложении.
	- Маршрут `/profile` защищен от не авторизованных пользователей.
	- Маршруты `/login`, `/register`, `/forgot-password`, `/reset-password` защищены от авторизованных пользователей.
- Возможность редактирования информации о пользователе в профиле.
- Использование `access` и `refresh` токенов для безопасности приложения.
- Для большинства данных реализовано хранилище Redux.
- Все элементы приложения типизированы.
## Установка и запуск проекта
1. Клонируйте репозитарий
```bash
git clone https://github.com/itsanti/react-burger.git
```
2. Перейдите в каталог проекта
```bash
cd react-burger
```
3. Установите зависимости
```bash
npm install
```
4. Запустите проект
```bash
npm start
```