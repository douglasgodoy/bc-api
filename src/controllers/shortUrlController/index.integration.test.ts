import app from 'src/app';
import request from 'supertest';

describe('analyzeCustomerController', () => {
  it('Should return a success response with the correct CO2 savings', async () => {
    const electricityBillData = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    };

    const response = await request(app)
      .post('/analyze')
      .send(electricityBillData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      data: { elegivel: true, economiaAnualDeCO2: '5553.24' },
      message: '',
    });
  });

  it('Should return false eligible because the tariff modality is not allowed', async () => {
    const electricityBillData = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'noAllowed',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    };

    const response = await request(app)
      .post('/analyze')
      .send(electricityBillData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      data: {
        elegivel: false,
        razoesDeInelegibilidade: ['Modalidade tarifária não aceita'],
      },
      message: '',
    });
  });

  it('Should return false eligible because the average consumption is less than necessary', async () => {
    const electricityBillData = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    };

    const response = await request(app)
      .post('/analyze')
      .send(electricityBillData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      data: {
        elegivel: false,
        razoesDeInelegibilidade: [
          'Cliente não atingiu o mínimo de consumo necessário',
        ],
      },
      message: '',
    });
  });

  it('Should return false eligible because the customer class is not allowed', async () => {
    const electricityBillData = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'notAllowed',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    };

    const response = await request(app)
      .post('/analyze')
      .send(electricityBillData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      data: {
        elegivel: false,
        razoesDeInelegibilidade: ['Classe de consumo não aceita'],
      },
      message: '',
    });
  });

  it('Should return false eligible because all validations is incorrects', async () => {
    const electricityBillData = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'notAllowed',
      modalidadeTarifaria: 'notAllowed',
      historicoDeConsumo: [1, 2, 4, 3, 5, 6, 7, 8, 9, 10],
    };

    const response = await request(app)
      .post('/analyze')
      .send(electricityBillData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      data: {
        elegivel: false,
        razoesDeInelegibilidade: [
          'Classe de consumo não aceita',
          'Cliente não atingiu o mínimo de consumo necessário',
          'Modalidade tarifária não aceita',
        ],
      },
      message: '',
    });
  });
});
