type OfferDates = { startsAt:string; endsAt:string|null };

/** Display policy only: never overwrite the merchant's dates or dateLabel. */
export function displayExpiryAt(offer:OfferDates):string|null {
  if (offer.endsAt) return Number.isFinite(Date.parse(offer.endsAt)) ? offer.endsAt : null;
  const start=offer.startsAt;
  if (!/^\d{4}-\d{2}-\d{2}(?:T|$)/.test(start)) return null;
  const dayText=start.slice(0,10);
  const dayCheck=new Date(dayText+'T00:00:00Z');
  if (!Number.isFinite(dayCheck.getTime()) || dayCheck.toISOString().slice(0,10)!==dayText) return null;
  const timestamp=Date.parse(start.length===10 ? start+'T00:00:00+08:00' : start);
  if (!Number.isFinite(timestamp)) return null;
  // Convert the start instant to Hong Kong's calendar date, independent of device timezone.
  const hk=new Date(timestamp+8*60*60*1000);
  const targetMonth=new Date(Date.UTC(hk.getUTCFullYear(),hk.getUTCMonth()+1,1));
  const year=targetMonth.getUTCFullYear(), month=targetMonth.getUTCMonth();
  const lastDay=new Date(Date.UTC(year,month+1,0)).getUTCDate();
  const day=Math.min(hk.getUTCDate(),lastDay);
  return `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}T00:00:00+08:00`;
}
