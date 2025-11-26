# Pet Project: API Testing with Jest and Allure

Это пет-проект для демонстрации автоматизированного тестирования API [JSONPlaceholder](https://jsonplaceholder.typicode.com/) с использованием фреймворка [Jest](https://jestjs.io/) и системы отчетности [Allure](https://docs.qameta.io/allure/).

## Стек технологий

*   **JavaScript**
*   **Jest** (фреймворк для тестирования)
*   **Axios** (для HTTP-запросов)
*   **Allure** (генерация отчетов)
*   **allure-jest** (интеграция Allure и Jest)

## Функциональность

*   Тестирование CRUD-операций (GET, POST) для ресурсов `/posts` и `/users`.
*   Тестирование получения данных с валидными и невалидными ID.
*   Базовое тестирование производительности (проверка времени отклика, устойчивость к последовательным запросам).
*   Использование Allure-меток: `epic`, `feature`, `story`, `severity`, `description`.
*   Прикрепление данных (attachments) к отчетам Allure (тело запроса, тело ответа).
