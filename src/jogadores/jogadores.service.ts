import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'

@Injectable() //Classe provider
export class JogadoresService {

    private jogadores: Jogador[] = []

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto

        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        if (jogadorEncontrado) {
            return this.atualizar(jogadorEncontrado, criarJogadorDto)
        } else {
            this.criar(criarJogadorDto)
        }
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.jogadores;
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado!`);
        }

        return jogadorEncontrado
    }

    async deletarJogador(email: string): Promise<void> {
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)
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

    private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void {
        const { nome } = criarJogadorDto
        jogadorEncontrado.nome = nome;
    }
}
