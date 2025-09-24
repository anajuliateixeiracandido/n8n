import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Random implements INodeType {
description: INodeTypeDescription = {
  displayName: 'Random',
  name: 'random',
  icon: 'file:random.svg',
  group: ['transform'],
  version: 1,
  description: 'Gera um número aleatório usando Random.org. Informe o intervalo desejado.',
  defaults: {
    name: 'Random',
  },
  inputs: ['main'],
  outputs: ['main'],
  properties: [
    {
      displayName: 'Min',
      name: 'min',
      type: 'number',
      typeOptions: {
        minValue: 1,
      },
      default: 1,
      required: true,
      description: 'Valor mínimo (ex: 1)',
      hint: 'Exemplo: 1',
    },
    {
      displayName: 'Max',
      name: 'max',
      type: 'number',
      typeOptions: {
        minValue: 1,
      },
      default: 10,
      required: true,
      description: 'Valor máximo (ex: 10)',
      hint: 'Exemplo: 10',
    },
  ],
};

async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const items = this.getInputData();
  const returnData: INodeExecutionData[] = [];

  for (let i = 0; i < items.length; i++) {
    const min = this.getNodeParameter('min', i) as number;
    const max = this.getNodeParameter('max', i) as number;

    if (min >= max) {
      throw new Error('O valor mínimo (Min) deve ser menor que o valor máximo (Max).');
    }

    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

    let response;
    try {
      response = await this.helpers.httpRequest({
        method: 'GET',
        url,
      });
    } catch (error) {
      throw new Error('Falha ao acessar a API do Random.org. Tente novamente mais tarde.');
    }

    returnData.push({
      json: {
        randomNumber: parseInt(response, 10),
        min,
        max,
      },
    });
  }

  return [returnData];
}
}