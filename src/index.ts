import express from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./settings/config";

// создание приложения
const app = express();
setupApp(app);

const PORT = SETTINGS.PORT;
// запуск приложения
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export default app;
