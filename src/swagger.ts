import { AUTH_COOKIE_NAME } from '@auth/auth.constants';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { displayName, version } from 'package.json';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle(displayName as string)
    .setVersion(version as string)

    .addCookieAuth(AUTH_COOKIE_NAME, {
      type: 'apiKey',
      in: 'cookie',
      name: AUTH_COOKIE_NAME,
    })

    .addServer('http://localhost:3000', 'Development')
    .addServer('http://api.localhost', 'Development Docker')

    .build();

  const documentFactory = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, documentFactory);
}
