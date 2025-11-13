# UI Компоненты - Полная Документация

## 📚 Содержание

1. [Button](#button)
2. [Input](#input)
3. [Select](#select)
4. [Switch](#switch)
5. [Modal](#modal)
6. [Container](#container)
7. [Глобальные переменные](#глобальные-переменные)
8. [Примеры использования](#примеры-использования)

---

## Button

Компонент кнопки для всех типов действий.

### Props

| Параметр    | Тип             | Default   | Описание                                              |
| ----------- | --------------- | --------- | ----------------------------------------------------- |
| `children`  | React.ReactNode | -         | Содержимое кнопки                                     |
| `variant`   | string          | "primary" | Вариант: primary, success, danger, secondary, outline |
| `size`      | string          | "md"      | Размер: sm, md, lg                                    |
| `icon`      | ReactIcon       | null      | Иконка слева от текста                                |
| `disabled`  | boolean         | false     | Отключить кнопку                                      |
| `onClick`   | function        | null      | Обработчик клика                                      |
| `type`      | string          | "button"  | Тип: button, submit, reset                            |
| `fullWidth` | boolean         | false     | Растянуть на всю ширину                               |
| `className` | string          | ""        | Дополнительный класс                                  |

### Примеры

```jsx
import { Button } from "@/ui";
import { MdSave } from "react-icons/md";

// Базовая кнопка
<Button>Нажми меня</Button>

// Разные варианты
<Button variant="primary">Primary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Delete</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

// Разные размеры
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// С иконкой
<Button icon={MdSave}>Сохранить</Button>

// На всю ширину
<Button fullWidth>Подтвердить</Button>

// Отключена
<Button disabled>Недоступна</Button>

// С обработчиком
<Button onClick={() => alert('Clicked!')}>Действие</Button>

// Для форм
<Button type="submit">Отправить</Button>
```

### Стили

- **Primary**: Синий (#4f46e5)
- **Success**: Зеленый (#10b981)
- **Danger**: Красный (#ef4444)
- **Secondary**: Серый (#6b7280)
- **Outline**: Прозрачный с бордером

---

## Input

Компонент текстового ввода.

### Props

| Параметр       | Тип       | Default   | Описание                                |
| -------------- | --------- | --------- | --------------------------------------- |
| `type`         | string    | "text"    | Тип: text, email, password, tel, number |
| `label`        | string    | ""        | Подпись над полем                       |
| `placeholder`  | string    | ""        | Подсказка в поле                        |
| `value`        | string    | ""        | Значение поля                           |
| `onChange`     | function  | null      | Обработчик изменения                    |
| `disabled`     | boolean   | false     | Отключить поле                          |
| `error`        | string    | ""        | Текст ошибки                            |
| `size`         | string    | "md"      | Размер: sm, md, lg                      |
| `variant`      | string    | "default" | Вариант: default, success, danger       |
| `icon`         | ReactIcon | null      | Иконка слева                            |
| `required`     | boolean   | false     | Обязательное поле                       |
| `maxLength`    | number    | null      | Максимальная длина                      |
| `autoComplete` | string    | "off"     | Автодополнение                          |

### Примеры

```jsx
import { Input } from "@/ui";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

const [email, setEmail] = useState("");

// Базовый Input
<Input
  placeholder="Введите текст"
  value={email}
  onChange={setEmail}
/>

// С label
<Input
  label="Email"
  type="email"
  placeholder="example@mail.com"
/>

// С ошибкой
<Input
  label="Пароль"
  type="password"
  error="Пароль должен быть минимум 6 символов"
  variant="danger"
/>

// С иконкой
<Input
  icon={MdEmail}
  placeholder="Email"
  type="email"
/>

// Разные размеры
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />

// Обязательное поле
<Input
  label="Имя"
  required
  placeholder="Ваше имя"
/>

// Телефон
<Input
  type="tel"
  label="Телефон"
  placeholder="+996"
/>

// Число
<Input
  type="number"
  label="Возраст"
  placeholder="18"
/>
```

### Валидация

```jsx
const [formData, setFormData] = useState({ email: "", password: "" });
const [errors, setErrors] = useState({});

const handleChange = (field, value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
  if (errors[field]) {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }
};

const handleSubmit = () => {
  const newErrors = {};
  if (!formData.email) newErrors.email = "Email обязателен";
  if (formData.password.length < 6) newErrors.password = "Min 6 символов";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  // Submit...
};

return (
  <>
    <Input
      type="email"
      label="Email"
      value={formData.email}
      onChange={(val) => handleChange("email", val)}
      error={errors.email}
    />
    <Input
      type="password"
      label="Пароль"
      value={formData.password}
      onChange={(val) => handleChange("password", val)}
      error={errors.password}
    />
  </>
);
```

---

## Select

Компонент выпадающего списка.

### Props

| Параметр      | Тип      | Default   | Описание                          |
| ------------- | -------- | --------- | --------------------------------- |
| `label`       | string   | ""        | Подпись над селектом              |
| `options`     | array    | []        | Массив опций [{label, value}]     |
| `value`       | string   | ""        | Выбранное значение                |
| `onChange`    | function | null      | Обработчик изменения              |
| `placeholder` | string   | ""        | Текст по умолчанию                |
| `disabled`    | boolean  | false     | Отключить селект                  |
| `error`       | string   | ""        | Текст ошибки                      |
| `size`        | string   | "md"      | Размер: sm, md, lg                |
| `variant`     | string   | "default" | Вариант: default, success, danger |

### Примеры

```jsx
import { Select } from "@/ui";
import { useState } from "react";

const [country, setCountry] = useState("");

const countries = [
  { label: "Кыргызстан", value: "kg" },
  { label: "Россия", value: "ru" },
  { label: "Казахстан", value: "kz" },
];

// Базовый Select
<Select
  options={countries}
  value={country}
  onChange={setCountry}
  placeholder="Выберите страну"
/>

// С label
<Select
  label="Страна"
  options={countries}
  value={country}
  onChange={setCountry}
/>

// С ошибкой
<Select
  label="Роль"
  options={[
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ]}
  error="Выбор обязателен"
  variant="danger"
/>

// Разные размеры
<Select size="sm" options={countries} />
<Select size="md" options={countries} />
<Select size="lg" options={countries} />
```

---

## Switch

Компонент переключателя (toggle).

### Props

| Параметр      | Тип      | Default   | Описание                                   |
| ------------- | -------- | --------- | ------------------------------------------ |
| `checked`     | boolean  | false     | Состояние переключателя                    |
| `onChange`    | function | null      | Обработчик изменения                       |
| `disabled`    | boolean  | false     | Отключить переключатель                    |
| `size`        | string   | "md"      | Размер: sm, md, lg                         |
| `variant`     | string   | "default" | Вариант: primary, success, danger, warning |
| `label`       | string   | ""        | Текст рядом с переключателем               |
| `description` | string   | ""        | Описание под текстом                       |
| `id`          | string   | ""        | Идентификатор                              |
| `name`        | string   | ""        | Имя для формы                              |

### Примеры

```jsx
import { Switch } from "@/ui";
import { useState } from "react";

const [isEnabled, setIsEnabled] = useState(false);

// Базовый Switch
<Switch
  checked={isEnabled}
  onChange={setIsEnabled}
  id="basic"
/>

// С label
<Switch
  checked={isEnabled}
  onChange={setIsEnabled}
  id="notifications"
  label="Включить уведомления"
/>

// С описанием
<Switch
  checked={isEnabled}
  onChange={setIsEnabled}
  id="darkMode"
  label="Темная тема"
  description="Включить темный режим интерфейса"
/>

// Разные размеры
<Switch size="sm" checked={true} id="s1" />
<Switch size="md" checked={true} id="s2" />
<Switch size="lg" checked={true} id="s3" />

// Разные варианты (checked state)
<Switch variant="primary" checked={true} id="v1" />
<Switch variant="success" checked={true} id="v2" />
<Switch variant="danger" checked={true} id="v3" />
<Switch variant="warning" checked={true} id="v4" />

// Отключен
<Switch disabled checked={false} id="disabled1" />
<Switch disabled checked={true} id="disabled2" />
```

---

## Modal

Компонент модального окна (боковая панель).

### Props

| Параметр      | Тип             | Default | Описание                     |
| ------------- | --------------- | ------- | ---------------------------- |
| `isOpen`      | boolean         | false   | Открыто ли окно              |
| `onClose`     | function        | null    | Функция закрытия             |
| `title`       | string          | ""      | Заголовок окна               |
| `position`    | string          | "right" | Позиция: right, left, center |
| `size`        | string          | "md"    | Размер: sm, md, lg, full     |
| `width`       | string          | "500px" | Ширина окна                  |
| `showOverlay` | boolean         | true    | Показывать фон               |
| `children`    | React.ReactNode | null    | Содержимое                   |

### Примеры

```jsx
import { Modal, Button } from "@/ui";
import { useState } from "react";

const [isOpen, setIsOpen] = useState(false);

// Базовая модалка
<>
  <Button onClick={() => setIsOpen(true)}>Открыть</Button>

  <Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Заголовок"
  >
    <p>Содержимое модалки</p>
    <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
  </Modal>
</>

// Боковая панель справа
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Добавить пользователя"
  position="right"
  size="md"
  width="500px"
>
  {/* Форма или содержимое */}
</Modal>

// Слева
<Modal
  position="left"
  title="История"
>
  {/* Содержимое */}
</Modal>

// В центре
<Modal
  position="center"
  title="Подтверждение"
>
  {/* Содержимое */}
</Modal>

// Без фона
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  showOverlay={false}
>
  {/* Содержимое */}
</Modal>
```

### Закрытие

- Клик на крестик
- Нажатие ESC
- Клик на фон (overlay)

---

## Container

Компонент контейнера для группировки контента.

### Props

| Параметр    | Тип             | Default   | Описание                                              |
| ----------- | --------------- | --------- | ----------------------------------------------------- |
| `variant`   | string          | "default" | Вариант: default, card, ghost, outlined, filled       |
| `size`      | string          | "md"      | Размер: sm, md, lg, full                              |
| `padding`   | string          | "md"      | Padding: none, sm, md, lg, xl                         |
| `direction` | string          | "column"  | Направление: row, column, row-reverse, column-reverse |
| `gap`       | string          | "none"    | Расстояние: none, sm, md, lg, xl                      |
| `children`  | React.ReactNode | null      | Содержимое                                            |

### Примеры

```jsx
import { Container } from "@/ui";

// Базовый контейнер
<Container>
  <p>Содержимое</p>
</Container>

// Карточка
<Container variant="card" padding="lg">
  <h3>Карточка с тенью</h3>
  <p>Описание</p>
</Container>

// Ghost (прозрачный)
<Container variant="ghost">
  <p>Прозрачный контейнер</p>
</Container>

// Outlined (только бордер)
<Container variant="outlined" padding="md">
  <p>Только бордер</p>
</Container>

// Filled (серый фон)
<Container variant="filled" padding="md">
  <p>С серым фоном</p>
</Container>

// Flex контейнер
<Container direction="row" gap="lg">
  <div>Элемент 1</div>
  <div>Элемент 2</div>
  <div>Элемент 3</div>
</Container>

// На всю ширину
<Container size="full">
  <p>Полная ширина</p>
</Container>

// Маленький размер
<Container size="sm">
  <p>Максимум 400px</p>
</Container>

// Большой размер
<Container size="lg">
  <p>Максимум 900px</p>
</Container>
```

### Варианты (Variants)

- **default**: Белый фон + бордер + border-radius
- **card**: Белый фон + бордер + тень
- **ghost**: Прозрачный, без бордера
- **outlined**: Прозрачный + толстый бордер
- **filled**: Серый фон + бордер

### Размеры (Sizes)

- **sm**: max-width 400px
- **md**: max-width 600px
- **lg**: max-width 900px
- **full**: 100% ширина

### Padding

- **none**: 0px
- **sm**: 12px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px

---

## Глобальные переменные

Все переменные находятся в `/styles/global.scss`.

### Цвета

```scss
// Primary
--color-primary: #4f46e5;
--color-primary-dark: #4338ca;
--color-primary-light: #6366f1;

// Success
--color-success: #10b981;
--color-success-dark: #059669;
--color-success-light: #34d399;

// Danger
--color-danger: #ef4444;
--color-danger-dark: #dc2626;
--color-danger-light: #f87171;

// Warning
--color-warning: #f59e0b;
--color-warning-dark: #d97706;
--color-warning-light: #fbbf24;

// Grayscale
--color-black: #000000;
--color-gray-900: #111827;
--color-gray-800: #1f2937;
--color-gray-700: #374151;
--color-gray-600: #4b5563;
--color-gray-500: #6b7280;
--color-gray-400: #9ca3af;
--color-gray-300: #d1d5db;
--color-gray-200: #e5e7eb;
--color-gray-100: #f3f4f6;
--color-gray-50: #f9fafb;
--color-white: #ffffff;

// Text
--text-primary: #1f2937;
--text-secondary: #6b7280;
--text-tertiary: #9ca3af;
--text-inverse: #ffffff;
--text-disabled: #9ca3af;

// Background
--bg-primary: #ffffff;
--bg-secondary: #f9fafb;
--bg-tertiary: #f3f4f6;

// Border
--border-color: #e5e7eb;
--border-color-light: #f3f4f6;
--border-color-dark: #d1d5db;
```

### Spacing

```scss
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-2xl: 24px;
--spacing-3xl: 32px;
--spacing-4xl: 40px;
```

### Border Radius

```scss
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### Transitions

```scss
--transition-fast: 0.15s ease;
--transition-base: 0.2s ease;
--transition-slow: 0.3s ease;
```

### Shadows

```scss
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
```

---

## Примеры использования

### Форма входа

```jsx
import { Input, Button, Container } from "@/ui";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = "Email обязателен";
    if (password.length < 6) newErrors.password = "Min 6 символов";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Submit", { email, password });
  };

  return (
    <Container
      variant="card"
      size="sm"
      padding="lg"
      direction="column"
      gap="lg"
    >
      <h2>Вход</h2>

      <Input
        type="email"
        label="Email"
        placeholder="your@email.com"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />

      <Input
        type="password"
        label="Пароль"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />

      <Button fullWidth type="submit" onClick={handleSubmit}>
        Войти
      </Button>
    </Container>
  );
}
```

### Настройки профиля

```jsx
import { Container, Switch, Input, Button } from "@/ui";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Container size="full" direction="column" gap="md">
      <h2>Настройки</h2>

      <Container variant="outlined" padding="lg" direction="column" gap="md">
        <Switch
          checked={notifications}
          onChange={setNotifications}
          label="Уведомления"
          description="Получайте уведомления о новых сообщениях"
        />

        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          label="Темная тема"
          description="Включить темный режим"
        />
      </Container>

      <div style={{ display: "flex", gap: "12px" }}>
        <Button variant="outline">Отмена</Button>
        <Button>Сохранить</Button>
      </div>
    </Container>
  );
}
```

### Список с фильтром

```jsx
import { Container, Input, Select, Button } from "@/ui";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

export default function UsersList() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  return (
    <Container size="full" direction="column" gap="lg">
      <h2>Пользователи</h2>

      <Container variant="ghost" direction="row" gap="md">
        <Input
          icon={MdSearch}
          placeholder="Поиск..."
          value={search}
          onChange={setSearch}
        />

        <Select
          options={[
            { label: "Все роли", value: "" },
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ]}
          value={role}
          onChange={setRole}
        />
      </Container>

      <Button>+ Добавить пользователя</Button>
    </Container>
  );
}
```

---

## Часто задаваемые вопросы

### Как использовать компоненты?

```jsx
import { Button, Input, Select, Switch, Modal, Container } from "@/ui";
```

### Как подключить иконки?

```jsx
import { MdSave, MdDelete, MdEdit } from "react-icons/md";

<Button icon={MdSave}>Сохранить</Button>;
```

### Как передать свой CSS?

```jsx
<Button className={s.customButton}>Текст</Button>
```

### Как сделать адаптивную форму?

```jsx
<Container direction="row" gap="md">
  <Input /> {/* На мобилках будет column */}
  <Input />
</Container>
```

---

## Responsive дизайн

Все компоненты адаптированы для:

- 📱 Мобильных (< 480px)
- 📱 Планшетов (480px - 768px)
- 💻 Десктопа (> 768px)

### Медиа запросы

```scss
// Mobile first approach используется везде

@media (max-width: 480px) {
  // Для мобилок
}

@media (max-width: 768px) {
  // Для планшетов
}

@media (max-width: 1024px) {
  // Для больших планшетов
}
```

---

## Поддержка браузеров

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## Версия

Документация для: **v1.0.0**

Создано: **2025**
