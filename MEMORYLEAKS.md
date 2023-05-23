## Испытание приложения на утечки памяти

Приложение было открыто в браузере Google Chrome. Начиная с главной и на всех других доступных пользователю страницах, были выполнены действия:

1. На вкладке браузера "Память":

-   при открытии страницы сделан снимок кучи (JS Heap);
-   в интерфейсе страницы выполнены все действия, доступные пользователю: клики по ссылкам, нажатия на кнопки, нажатия клавиатуры управления игрой;
-   сделан повторный снимок кучи.

Снимки сравнили, проанализировали основные показатели объемов памяти (для Object, Window, Node, EventListener и др.).
Отличия незначительные, менее 1%, тенденции к росту не выявлено.

2. На вкладке "Производительность":

-   была произведена запись с включенным графиком памяти и в течении 60 секунд был последовательно пройден клиентский путь от главной страницы, ко всем доступным страницам, и к игре.

Была отмечена незначительная тенденция к росту памяти в момент прохождения игры. Поэтому произведен повторный замер в течение 60 секунд только на странице игры и во время игры. Незначительный рост памяти сменялся падением (сборкой мусора) в диапазоне от 6,5 до 7,9 Мб. Это происходило циклично и в среднем за время испытания не привело к росту памяти.

Результат испытаний: утечек памяти не выявлено.