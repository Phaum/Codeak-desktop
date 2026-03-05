# Code.ak Desktop (Electron)

Десктоп-приложение для платформы **Code.ak**. Приложение запускает отдельное окно **Electron** и открывает платформу как самостоятельное desktop-приложение.

## Возможности

- Сборка для **Windows**: `Setup.exe`, `.msi`
- Сборка для **macOS**: `.zip` *(при необходимости можно добавить `.dmg/.pkg`)*
- Сборка для **Linux**: `.deb`, `.rpm`

## Требования

### Для разработки
- `Node.js` + `npm`

### Для сборки MSI на Windows
- **WiX Toolset v3** (нужны `candle.exe` и `light.exe` в `PATH`)

Проверка в PowerShell:
```powershell
where candle
where light
```

### Запуск (разработка)
```
npm install
npm run dev
```

# Сборка на разных устройствах (Windows / macOS / Linux)

## Важно: часть установщиков нельзя надёжно собрать “на любой ОС”. Рекомендуется собирать на той же ОС, для которой готовится приложение.

### Windows (лучше собирать на Windows)

Команда:
`npm run make -- --platform=win32 --arch=x64`

### MacOS (собирать на macOS)

Команда:
`npm run make -- --platform=darwin --arch=arm64`

### Или для Intel (macOS):
`npm run make -- --platform=darwin --arch=x64`

### Linux (собирать на Linux)

Команда:

`npm run make -- --platform=linux --arch=x64`

## Кросс-сборка (собирать “не на той ОС”) — нежелательно

Технически некоторые форматы можно попытаться собрать кросс-платформенно, но все упирается в зависимости и системные инструменты.

![](https://codeak.ru/icon.png)