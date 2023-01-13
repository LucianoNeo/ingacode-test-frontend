export function formatDate(dateStr: string) {
  // Cria um objeto Date a partir da string
  let date = new Date(dateStr);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDate();
  let month = date.getMonth() + 1; // Janeiro é 0
  let year = date.getFullYear().toString().slice(-2);

  // Padding para garantir que as horas e minutos tenham dois dígitos
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  day = day.toString().padStart(2, '0');

  // Concatena as horas, minutos, dia, mês e ano no formato desejado
  return `${hours}:${minutes} ${day}-${month}-${year}`;
}
