import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'csv';

const filePath = path.join(__dirname, 'output.csv');

// Função para ler o CSV existente e retornar como array de objetos
function readCsv(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const input = fs.createReadStream(filePath);
        const parser = parse({ columns: true }, (err, records) => {
            if (err) {
                return reject(err);
            }
            resolve(records);
        });
        input.pipe(parser);
    });
}

// Função para escrever os dados modificados de volta ao CSV
function writeCsv(filePath: string, data: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(filePath);
        const stringifier = stringify({ header: true });
        stringifier.on('error', reject);
        stringifier.on('finish', resolve);

        stringifier.pipe(output);
        data.forEach((row) => stringifier.write(row));
        stringifier.end();


    });
}

// Função para modificar os dados do CSV
async function modifyCsv() {
    try {
        const data = await readCsv(filePath);

        // Modifique os dados conforme necessário (exemplo: alterar o valor de uma coluna)
        const updatedData = data.map((row) => {
            if (row['Name'] === 'João') {
                row['Age'] = '30';  // Atualizando idade de João
            }
            return row;
        });

        // Escreve os dados modificados de volta ao arquivo CSV
        await writeCsv(filePath, updatedData);
        console.log('CSV atualizado com sucesso!');


    } catch (error) {
        console.error('Erro ao modificar o CSV:', error);
    }
}

// Executa a função de modificação
modifyCsv();