# Code.ak Desktop (Electron)

Десктоп-приложение для платформы **Code.ak**. Приложение запускает отдельное окно **Electron** и открывает платформу как самостоятельное desktop-приложение.

## Возможности

- Сборка под Windows:
  - **Setup.exe** (Squirrel)
  - **.msi** (WiX)

## Технологии

- Electron
- Electron Forge
- makers: squirrel (exe installer), wix (msi), deb/rpm (linux), zip (macOS)
- fuses: базовые security-ограничения на уровне Electron

## Требования

### Для разработки
- Node.js + npm

### Для сборки MSI на Windows
- **WiX Toolset v3** (нужны `candle.exe` и `light.exe` в PATH)

Проверка в PowerShell:
```powershell
where candle
where light