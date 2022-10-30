import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'

@Injectable() //Classe provider
export class JogadoresService {

    private jogadores: Jogador[] = []

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        this.criar(criarJogadorDto)
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadores;
    }

    private criar(criarJogadorDto: CriarJogadorDto): void {
        const { nome, telefoneCelular, email } = criarJogadorDto

        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        }

        this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador)
    }
}
