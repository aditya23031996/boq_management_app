import React, { useEffect, useState } from "react";

function BoqItemTree({ items }) {
  if (!items) return null;
  return (
    <ul style={{ fontFamily: 'Inter, sans-serif' }}>
      {items.map(item => (
        <li key={item.id} className="mb-2">
          <div className="font-medium text-base text-[#154078] mb-1">{item.description}</div>
          <ul className="ml-4 text-sm text-gray-700">
            {item.paymentBreakups.map(b => (
              <li key={b.id} className="mb-0.5">
                Breakup: <span className="font-medium">{b.description}</span> ({b.percentage}%)
              </li>
            ))}
          </ul>
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

  if (!boqDetail) return <div className="text-base text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Loading BOQ details...</div>;
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <h2 className="text-lg font-bold text-[#154078] mb-2">{boqDetail.title}</h2>
    <div>
      <h2>{boqDetail.title}</h2>
      <BoqItemTree items={boqDetail.items} />
    </div>
  );
}
