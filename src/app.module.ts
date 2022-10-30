import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores/jogadores.controller';
import { JogadoresModule } from './jogadores/jogadores.module';
import { JogadoresService } from './jogadores/jogadores.service';

@Module({
  imports: [JogadoresModule],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class AppModule { }
