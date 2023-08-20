import {NestFactory} from "@nestjs/core";
import {AppModule} from "@modules/app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

void (async function start() {
  try {
    const app = await NestFactory.create(AppModule);

    const PORT = process.env.PORT || 8080;

    await app.listen(PORT, () =>
      console.info(`Server has started on the ${PORT}`),
    );
    // todo Swagger:
    // const config = new DocumentBuilder()
    //   .setTitle("Beat-Boulevard")
    //   .setDescription("Music platform")
    //   .setVersion("1.0.0")
    //   .build();
    // const document = SwaggerModule.createDocument(app, config);
    // SwaggerModule.setup("/api/docs", app, document);
  } catch (error) {
    console.error(`Server has not started due to: ${error.message}`);
  }
})();
