import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface'
import { query } from 'express';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto) {
        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
    }

    @Get()
    async consultarJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> {
        if (email) {
            return await this.jogadoresService.consultarJogadorPeloEmail(email)
        } else {
            return await this.jogadoresService.consultarTodosJogadores();
        }
    }

}
