Я створила класичну гру **"Змійка"** з використанням чистого HTML, CSS та JavaScript.
Для маніпуляцій з DOM я застосовувала jQuery, а Canvas використала для відображення ігрового поля, змійки, яблука та також відображення очок, повідомлення про те коли гра закінчена . 
Ігрове поле - холст є місцем, де відбувається вся дія – змійка рухається, збирає їжу та розвивається.

Реалізація гри була виконана з використанням об'єктно-орієнтованого підходу, що дозволило структуровано організувати код і забезпечити легкість у його підтримці.

**Основні функції гри:**
* **Емоція змійки:** Якщо змійка з'їсть більше п’яти яблук, її "ротик" починає усміхатися.
* **Колір сегментів:** При кожному новому раунді змійка отримує новий колір своїх сегментів.
* **Завершення гри при зіткненні:** Гра закінчується, якщо змійка наїжджає на себе.
* **Завершення гри при зіткненні зі стінками:** Гра також закінчується, якщо змійка входить у колізію зі стінками ігрового поля.
* **Відображення очок:** Очки відображаються у лівій частині ігрового поля.

# Ось найголовніші частини коду, які відповідають за обробку колізій та логіку гри:
* ## Метод Snake.prototype.move:**
   
![move](https://github.com/Korneliia08/Classic-Snake-Game/blob/master/assets/imagesOfCode/snakeMove.png)

*Оновлює позицію голови змійки відповідно до напрямку.

*Перевіряє на колізії за допомогою this.checkCollision(newHead).

*Якщо змійка їсть яблуко (newHead.equal(apple.position)), оновлює рахунок і переміщує яблуко.

*Якщо яблуко не з'їдене, видаляє останній сегмент змійки (якщо не було з'їдено).

* ## Метод Snake.prototype.checkCollision:**

![checkCollision](https://github.com/Korneliia08/Classic-Snake-Game/blob/master/assets/imagesOfCode/checkCollision.png)

*Перевіряє, чи нова голова змійки стикається з краями ігрового поля (wallCollision).

*Перевіряє, чи нова голова змійки стикається з будь-яким з її сегментів (selfCollision).

*Повертає true, якщо є колізія з будь-якою частиною змійки або стінкою, інакше false.


* ## Метод Block.prototype.equal:

![equal](https://github.com/Korneliia08/Classic-Snake-Game/blob/master/assets/imagesOfCode/equel.png)

*Перевіряє, чи два блоки мають однакові координати.

* ## Функція gameOver:

  ![gameOver](https://github.com/Korneliia08/Classic-Snake-Game/blob/master/assets/imagesOfCode/gameOver.png)

* Зупиняє гру, очищуючи інтервал оновлення.
  
* Відображає повідомлення "Game over" на екрані.

* ## Обробка вводу з клавіатури

  ![eventKeyboard](https://github.com/Korneliia08/Classic-Snake-Game/blob/master/assets/imagesOfCode/event.png)

* ### Об'єкт directions:

Цей об'єкт використовує код клавіші як ключ (стрілки вліво, вгору, вправо, вниз) і відповідний напрямок як значення.

* ### Обробка події keydown:

* Встановлює обробник подій для натискання клавіші.

* При натисканні клавіші, подія передає об'єкт event, в якому є keyCode натиснутої клавіші.
* event.keyCode використовує код клавіші, щоб визначити напрямок руху, викликаний натисканням стрілки.
* Якщо keyCode є в об'єкті directions, метод snake.setDirection(nowDirection) оновлює напрямок руху змійки.

### Як це працює:
Коли натискається одна з клавіш-стрілок, відповідний код клавіші (37, 38, 39, 40) перевіряється в об'єкті directions.
Якщо код клавіші знайдено, викликається метод setDirection об'єкта snake, щоб змінити напрямок руху змійки на новий.
Цей механізм забезпечує інтерактивний контроль над рухом змійки в грі, дозволяючи гравцеві управляти змійкою за допомогою клавіатури.

## Структура ігрового поля

### Конструктор Block:

![block](https://github.com/Korneliia08/Classic-Snake-Game/blob/master/assets/imagesOfCode/block.png)

* Конструктор Block створює блоки на ігровому полі. Кожен блок визначається координатами col і row, які визначають його позицію на холсті.

* this.color задає випадковий колір блоку, що використовується для малювання.

### Змійка і яблуко:

* **Snake:** Змійка складається з масиву сегментів типу Block. Кожен сегмент представляє собою блок, який зберігається в масиві this.segments.
* **Apple:** Яблуко також представлено як об'єкт типу Block, але використовує зображення для візуалізації. Його позиція оновлюється випадковим чином, щоб уникнути перекриття з сегментами змійки.
Ця структура дозволяє організувати ігрове поле в зручний і зрозумілий спосіб, розділяючи його на рівномірні блоки, що спрощує обробку колізій та відображення об'єктів на холсті.

## Ось детальний опис інтервалу та структури ігрового поля, що складається з блоків:

![setInterval](https://github.com/Korneliia08/Classic-Snake-Game/blob/master/assets/imagesOfCode/setInterval.png)

* setInterval() створює цикл, який виконує функцію кожні 180 мілісекунд. Це визначає частоту оновлення гри.

* **ctx.clearRect(0, 0, width, height):** Очищує весь холст перед кожним оновленням, щоб уникнути залишкових зображень.
* **snake.move():** Оновлює позицію змійки, включаючи перевірку на колізії та оновлення стану (змія рухається, їсть яблуко тощо).
* **rawScore():** Відображає поточний рахунок на холсті.
* **snake.draw():** Малює сегменти змійки на холсті.
* **apple.draw():** Малює яблуко на холсті.
* **drawBorder():** Малює межі ігрового поля.

Ці частини коду є критично важливими для забезпечення основного функціоналу гри "Змійка", включаючи обробку руху, колізій та завершення гри.
