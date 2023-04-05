import { NestFactory } from "@nestjs/core";
import { AppModule } from "@modules/app.module";

async function start() {
  try {
    const app = await NestFactory.create(AppModule);

    const PORT = process.env.PORT || 4000;

    await app.listen(PORT, () =>
      console.log(`Server has started on the ${PORT}`),
    );
  } catch (error) {
    console.error(`Server has not started due to: ${error}`);
  }
}
start();
