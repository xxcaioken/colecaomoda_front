/**
 * Formata uma data para o formato brasileiro DD/MM/YY
 * @param date - Data a ser formatada (Date object ou string)
 * @returns String no formato DD/MM/YY
 */
export function formatDateBR(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const day = dateObj.getDate().toString().padStart(2, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObj.getFullYear().toString().slice(-2)
  
  return `${day}/${month}/${year}`
}

/**
 * Formata uma data para o formato brasileiro DD/MM/YYYY (ano completo)
 * @param date - Data a ser formatada (Date object ou string)
 * @returns String no formato DD/MM/YYYY
 */
export function formatDateBRFull(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const day = dateObj.getDate().toString().padStart(2, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObj.getFullYear().toString()
  
  return `${day}/${month}/${year}`
}

/**
 * Formata data e hora no formato brasileiro DD/MM/YY HH:mm
 * @param date - Data a ser formatada (Date object ou string)
 * @returns String no formato DD/MM/YY HH:mm
 */
export function formatDateTimeBR(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const day = dateObj.getDate().toString().padStart(2, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObj.getFullYear().toString().slice(-2)
  const hours = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')
  
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

/**
 * Gera uma string de data no formato ISO para ser enviada à API
 * @returns String no formato ISO
 */
export function getCurrentISOString(): string {
  return new Date().toISOString()
}

/**
 * Converte uma data no formato DD/MM/YY para Date object
 * @param dateStr - String no formato DD/MM/YY
 * @returns Date object
 */
export function parseDateBR(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/')
  const fullYear = parseInt(year) + (parseInt(year) < 50 ? 2000 : 1900)
  return new Date(fullYear, parseInt(month) - 1, parseInt(day))
} 