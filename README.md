# Doctor-Appointment-Service
Test exercise with express.js and MongoDB+mongoose

## Для запуска проекта:
```
  - переименовать .env.example на .env
  - npm install
  - запустить docker-compose
  - npm run prefill (миграция для заполнения БД)
  - npm run dev 
```

## Описание API

# APPOINTMENTS

POST /appointment  - маршрут для записи пользователя к доктору на прием.

```
  Body {
    "user_id": string,
    "doctor_id": string,
    "slot": Date (string)
  }
```

Формат даты "1/1/2022 1:00:00 PM UTC+3" или "2022-01-01T13:00:00.000Z" (учитывая часовой пояс).
При успешном оформлении приема в логах появятся уведомления: тестовые сообщения с проверкой текста и даты, и уведомления за день и за два часа до приема. 

# USERS

GET /users  - маршрут для получения списка всех существующих пользователей.

POST /user  - маршрут для создания нового пользователя
```
  body {
    "name": string,
    "phone": string
  }
```

DELETE /user  - маршрут для удаления пользователя
```
  body {
    "id": string
  }
```

# DOCTORS

GET /doctors  - маршрут для получения списка всех существующих докторов.

POST /doctor  - маршрут для создания нового доктора
```
  body {
    "name": string,
    "spec": string,
    "slots: [Date (string)]
  }
```
Формат даты "1/1/2022 1:00:00 PM UTC+3" или "2022-01-01T13:00:00.000Z". 
  
PUT /doctor  - маршрут для добавления к существующему доктору времени приема.
```
  body {
    "id": string,
    "slot": Date
  }
```

DELETE /doctor  - маршрут для удаления доктора.
  body {
    "id": string
  }

