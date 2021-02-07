import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import TypeOrmConfigService from './typeorm.service';

const typeOrmConfigModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useClass: TypeOrmConfigService,
});

export default typeOrmConfigModule;
