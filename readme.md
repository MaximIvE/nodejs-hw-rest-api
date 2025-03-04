## GoIT Node.js Course Template Homework

Проект - невеликий веб-сервер на базі Express. Під час розробки проект було підключено до MongoDB. Там була створена база даних contact_book.
В проекті є файл .env.example з прикладами глобальних змінних.

Contact-book містить два об'єкта:

- contacts для розміщення контактних даних різних осіб,
- users для розміщення даних зареєстрованих користувачів, власників контактів поля contact.

### Доступні запити для contacts.

Наступні запити дозволяють керувати контактними записами користувачів.

Запити повернуть позитивний результат тільки при діючому токені зареєстрованого користувача. З урахуванням токена дані запити відображають/змінюють дані поточного користувача і не мають доступу до даних інших користувачів.

- GET /api/contacts - отримання всіх контактів даного користувача;
- GET /api/contacts/:id - отримання контакта по його Id даного користувача;
- POST /api/contacts - створення нового контактного запису користувача в базі даних;
- DELETE /api/contacts/:id - видалення контактного запису користувача в базі даних по його Id;
- PUT /api/contacts/:id - зміна даних окремого поля ( полів) контактного запису користувача в базі даних по його Id;
- PATCH /api/contacts/:contactId/favorite - зміна даних поля favorite контактного запису користувача в базі даних по його Id.

### Доступні запити для users.

Наступні запити дозволяють керувати користувачами.

- POST /api/users/register - реєстрація нового користувача;
- GET /api/users/login - авторизація зареєстрованого користувача;
- GET /api/users/current - повторна авторизація зареєстрованого користувача при активному токені ( під час перезавантаження сторінки, наприклад ), допоміжний запит;
- GET /api/users/logout - завершення активного сеанса користувача;
- PATCH /api/users/users - оновлення підписки (subscription) користувача;
- PATCH /api/users/avatars - оновлення аватара користувача;
- GET /api/users/verify/:verificationToken - зміна верифікації електронної пошти користувача по verificationToken, допоміжний запит;
- POST /api/users/verify - повторна верифікація електронної пошти користувача, допоміжний запит.

###

Виконання даного проекта стало можливим при технічній та інформаційній підтримці, натхненню команди викладачів та менторів GO-IT.
А також моральній підтримці команди S.W.A.T. 2.0.
Ви самі кращі!
