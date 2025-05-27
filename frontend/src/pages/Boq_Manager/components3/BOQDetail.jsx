import React, { useEffect, useState } from "react";

function BoqItemTree({ items }) {
  if (!items) return null;
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <div>
            <strong>{item.description}</strong>
            <ul>
              {item.paymentBreakups.map(b => (
                <li key={b.id}>
                  Breakup: {b.description} ({b.percentage}%)
                </li>
              ))}
            </ul>
          </div>
          {item.subItems && item.subItems.length > 0 && (
            <BoqItemTree items={item.subItems} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function BOQDetail({ boq }) {
  const [boqDetail, setBoqDetail] = useState(null);

  useEffect(() => {
    if (boq) {
      fetch(`/boq/${boq.id}`)
        .then(res => res.json())
        .then(setBoqDetail);
    }
  }, [boq]);

  if (!boqDetail) return <div>Loading BOQ details...</div>;
  return (
    <div>
      <h2>{boqDetail.title}</h2>
      <BoqItemTree items={boqDetail.items} />
    </div>
  );
}
