export function formatDate(dateStr: string) {

  let date = new Date(dateStr);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear().toString().slice(-2);

  {/* @ts-ignore */ }
  hours = hours.toString().padStart(2, '0');
  {/* @ts-ignore */ }
  minutes = minutes.toString().padStart(2, '0');
  {/* @ts-ignore */ }
  month = month.toString().padStart(2, '0');
  {/* @ts-ignore */ }
  day = day.toString().padStart(2, '0');


  return `${hours}:${minutes} ${day}-${month}-${year}`;
}
