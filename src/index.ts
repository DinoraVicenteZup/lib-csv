import { stringify } from 'csv';
import fs from 'fs';
import path from 'path';
const crypto = require('crypto');

function gerarCaractereEspecial(): string {
    const caracteresDisponiveis = '@#$%*!';
    const indiceAleatorio = crypto.randomInt(0, caracteresDisponiveis.length);
    return caracteresDisponiveis[indiceAleatorio];
}

function gerarLetraMaiuscula(): string {
    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const indiceAleatorio = crypto.randomInt(0, letrasMaiusculas.length);
    return letrasMaiusculas[indiceAleatorio];
}

function gerarUUID(): string {
    const uuid = crypto.randomUUID();
    return uuid.slice(-4);
}

export function gerarSenha(): string {
    const senha = (
        'c' + // Caractere fixo
        gerarCaractereEspecial() + // Caractere especial aleatorio dentre os seis disponiveis - @#$%*!
        crypto.randomInt(0, 9) + // Numero aleatório entre 0 e 9
        gerarLetraMaiuscula() + //  Letra maiuscula aleatoria
        gerarUUID() // Ultimos quatro caracteres aleatorios extraidos de um uuid
    );

    return senha;
}


// Dados a serem escritos no arquivo CSV
const records = [
    ['Name', 'Age', 'Email'],
    ['João Doe', '25', gerarSenha()],
    ['Jane Smith', '30', gerarSenha()],
];

// Função para gerar o CSV
const generateCSV = () => {
    const filePath = path.join(__dirname, 'output.csv');
    stringify(records, (err, output) => {
        if (err) {
            console.error('Erro ao gerar CSV:', err);
            return;
        }
        fs.writeFileSync(filePath, output);
        console.log('Arquivo CSV gerado com sucesso:', filePath);
    });
};

generateCSV();