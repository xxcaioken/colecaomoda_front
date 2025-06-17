import {
    formatDateBR,
    formatDateBRFull,
    formatDateTimeBR,
    getCurrentISOString,
    parseDateBR
} from '../dateUtils';

describe('DateUtils', () => {
  const testDate = new Date('2024-01-15T14:30:00.000Z');
  const testDateString = '2024-01-15T14:30:00.000Z';

  describe('formatDateBR', () => {
    it('deve formatar Date object para DD/MM/YY', () => {
      const result = formatDateBR(testDate);
      expect(result).toBe('15/01/24');
    });

    it('deve formatar string ISO para DD/MM/YY', () => {
      const result = formatDateBR(testDateString);
      expect(result).toBe('15/01/24');
    });
  });

  describe('formatDateBRFull', () => {
    it('deve formatar Date object para DD/MM/YYYY', () => {
      const result = formatDateBRFull(testDate);
      expect(result).toBe('15/01/2024');
    });

    it('deve formatar string ISO para DD/MM/YYYY', () => {
      const result = formatDateBRFull(testDateString);
      expect(result).toBe('15/01/2024');
    });
  });

  describe('formatDateTimeBR', () => {
    it('deve formatar Date object para DD/MM/YY HH:mm', () => {
      const result = formatDateTimeBR(testDate);
      // Nota: o resultado pode variar dependendo do timezone
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{2} \d{2}:\d{2}/);
    });
  });

  describe('parseDateBR', () => {
    it('deve converter DD/MM/YY para Date object (ano 20xx)', () => {
      const result = parseDateBR('15/01/24');
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // Janeiro = 0
      expect(result.getDate()).toBe(15);
    });

    it('deve converter DD/MM/YY para Date object (ano 19xx)', () => {
      const result = parseDateBR('15/01/95');
      expect(result.getFullYear()).toBe(1995);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });
  });

  describe('getCurrentISOString', () => {
    it('deve retornar uma string ISO válida', () => {
      const result = getCurrentISOString();
      expect(result).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
    });
  });
});

// Exemplos de uso para documentação
export const exemploDeUso = () => {
  const agora = new Date();
  const dataISO = getCurrentISOString();

  console.log('Exemplos de formatação de data:');
  console.log('Data atual:', agora);
  console.log('Formato DD/MM/YY:', formatDateBR(agora));
  console.log('Formato DD/MM/YYYY:', formatDateBRFull(agora));
  console.log('Formato DD/MM/YY HH:mm:', formatDateTimeBR(agora));
  console.log('ISO String:', dataISO);
  
  // Exemplo de parsing
  const dataBrasileira = '15/01/24';
  const dateObject = parseDateBR(dataBrasileira);
  console.log('Convertendo', dataBrasileira, 'para Date:', dateObject);
}; 