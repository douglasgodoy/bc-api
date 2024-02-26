export interface Validator {
  setNext(validator: Validator): Validator;
  validate(data: any, message?: string[]): ValidatorResponse;
}

export type ValidatorResponse = { ok: boolean; message?: string[] };

export type ElectricityBill = {
  numeroDoDocumento: string;
  tipoDeConexao: 'monofasico' | 'bifasico' | 'trifasico';
  classeDeConsumo:
    | 'residencial'
    | 'comercial'
    | 'industrial'
    | 'rural'
    | 'poderPublico';
  modalidadeTarifaria: 'convencional' | 'branca' | 'azul' | 'verde';

  historicoDeConsumo: number[];
};

export type DataResponse = {
  elegivel: boolean;
  razoesDeInelegibilidade?: string[];
  economiaAnualDeCO2?: string;
};
