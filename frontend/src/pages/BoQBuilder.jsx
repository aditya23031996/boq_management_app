import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./BoQBuilder.css";

const sampleData = [
  {
    categoryId: uuidv4(),
    categoryName: "Foundation",
    items: [
      {
        itemId: uuidv4(),
        description: "Excavation Work",
        unit: "cum",
        quantity: 100,
        rate: 200,
        breakups: [
          { name: "Start", percentage: 50 },
          { name: "Completion", percentage: 50 }
        ],
        subItems: [
          {
            itemId: uuidv4(),
            description: "Manual Digging",
            quantity: 40,
            rate: 180,
            unit: "cum",
            breakups: [
              { name: "Start", percentage: 50 },
              { name: "Completion", percentage: 50 }
            ],
            totalAmount: 7200
          }
        ]
      }
    ]
  }
];

function BoQBuilder() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    setCategories(sampleData);
  }, []);

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    setCategories([
      ...categories,
      {
        categoryId: uuidv4(),
        categoryName: newCategoryName.trim(),
        items: []
      }
    ]);
    setNewCategoryName("");
  };

  const addItem = (categoryId) => {
    const updated = categories.map(cat => {
      if (cat.categoryId === categoryId) {
        const newItem = {
          itemId: uuidv4(),
          description: "",
          unit: "",
          quantity: "",
          rate: "",
          breakups: [],
          subItems: [],
          useSubItems: false,
          subItemForm: {
            description: "",
            quantity: "",
            rate: "",
            unit: "",
            breakups: []
          }
        };
        return { ...cat, items: [...cat.items, newItem] };
      }
      return cat;
    });
    setCategories(updated);
  };

  const updateItemField = (catId, itemId, field, value) => {
    setCategories(prev => prev.map(cat => {
      if (cat.categoryId === catId) {
        return {
          ...cat,
          items: cat.items.map(item =>
            item.itemId === itemId ? { ...item, [field]: value } : item
          )
        };
      }
      return cat;
    }));
  };

  const updateBreakup = (catId, itemId, index, field, value) => {
    setCategories(prev => prev.map(cat => {
      if (cat.categoryId === catId) {
        return {
          ...cat,
          items: cat.items.map(item => {
            if (item.itemId === itemId) {
              const breakups = [...item.breakups];
              breakups[index][field] = value;
              return { ...item, breakups };
            }
            return item;
          })
        };
      }
      return cat;
    }));
  };

  const addBreakup = (catId, itemId) => {
    setCategories(prev => prev.map(cat => {
      if (cat.categoryId === catId) {
        return {
          ...cat,
          items: cat.items.map(item => {
            if (item.itemId === itemId) {
              return {
                ...item,
                breakups: [...item.breakups, { name: "", percentage: "" }]
              };
            }
            return item;
          })
        };
      }
      return cat;
    }));
  };

  const toggleSubItem = (catId, itemId) => {
    setCategories(prev => prev.map(cat => {
      if (cat.categoryId === catId) {
        return {
          ...cat,
          items: cat.items.map(item =>
            item.itemId === itemId ? { ...item, useSubItems: !item.useSubItems } : item
          )
        };
      }
      return cat;
    }));
  };

  const updateSubItemForm = (catId, itemId, field, value) => {
    setCategories(prev => prev.map(cat => {
      if (cat.categoryId === catId) {
        return {
          ...cat,
          items: cat.items.map(item => {
            if (item.itemId === itemId) {
              return {
                ...item,
                subItemForm: { ...item.subItemForm, [field]: value }
              };
            }
            return item;
          })
        };
      }
      return cat;
    }));
  };

  const addSubItem = (catId, itemId) => {
    setCategories(prev => prev.map(cat => {
      if (cat.categoryId === catId) {
        return {
          ...cat,
          items: cat.items.map(item => {
            if (item.itemId === itemId) {
              const sub = item.subItemForm;
              const newSubItem = {
                itemId: uuidv4(),
                description: sub.description,
                quantity: sub.quantity,
                rate: sub.rate,
                unit: sub.unit || item.unit,
                breakups: sub.breakups.length ? sub.breakups : item.breakups,
                totalAmount: parseFloat(sub.quantity || 0) * parseFloat(sub.rate || 0)
              };
              return {
                ...item,
                subItems: [...item.subItems, newSubItem],
                subItemForm: { description: "", quantity: "", rate: "", unit: "", breakups: [] }
              };
            }
            return item;
          })
        };
      }
      return cat;
    }));
  };

  return (
    <div className="boq-container">
      <h2>BoQ Builder with Table + Input</h2>
      <input placeholder="New Category Name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
      <button onClick={addCategory}>Add Category</button>

      {categories.map(cat => (
        <div key={cat.categoryId} className="category-block">
          <h3>{cat.categoryName}</h3>
          <button onClick={() => addItem(cat.categoryId)}>Add Item</button>
          <table className="boq-table">
            <thead>
              <tr>
                <th>Description</th><th>Unit</th><th>Qty</th><th>Rate</th><th>Total</th><th>Breakups</th>
              </tr>
            </thead>
            <tbody>
              {cat.items.map(item => (
                <React.Fragment key={item.itemId}>
                  <tr className="main-row">
                    <td><input value={item.description} onChange={e => updateItemField(cat.categoryId, item.itemId, "description", e.target.value)} /></td>
                    <td><input value={item.unit} onChange={e => updateItemField(cat.categoryId, item.itemId, "unit", e.target.value)} /></td>
                    <td><input type="number" value={item.quantity} onChange={e => updateItemField(cat.categoryId, item.itemId, "quantity", e.target.value)} /></td>
                    <td><input type="number" value={item.rate} onChange={e => updateItemField(cat.categoryId, item.itemId, "rate", e.target.value)} /></td>
                    <td>{item.quantity * item.rate}</td>
                    <td>
                      {item.breakups.map((b, i) => (
                        <div key={i}>
                          <input placeholder="Name" value={b.name} onChange={e => updateBreakup(cat.categoryId, item.itemId, i, "name", e.target.value)} />
                          <input placeholder="%" type="number" value={b.percentage} onChange={e => updateBreakup(cat.categoryId, item.itemId, i, "percentage", e.target.value)} />
                        </div>
                      ))}
                      <button onClick={() => addBreakup(cat.categoryId, item.itemId)}>+ Breakup</button>
                    </td>
                  </tr>
                  {item.subItems.map(sub => (
                    <tr key={sub.itemId} className="sub-row">
                      <td>↳ {sub.description}</td>
                      <td>{sub.unit}</td>
                      <td>{sub.quantity}</td>
                      <td>{sub.rate}</td>
                      <td>{sub.totalAmount}</td>
                      <td>{sub.breakups.map((b, i) => <div key={i}>{b.name}: {b.percentage}%</div>)}</td>
                    </tr>
                  ))}
                  {item.useSubItems && (
                    <tr className="sub-form-row">
                      <td colSpan="6">
                        <input placeholder="Sub Desc" value={item.subItemForm.description} onChange={e => updateSubItemForm(cat.categoryId, item.itemId, "description", e.target.value)} />
                        <input placeholder="Qty" type="number" value={item.subItemForm.quantity} onChange={e => updateSubItemForm(cat.categoryId, item.itemId, "quantity", e.target.value)} />
                        <input placeholder="Rate" type="number" value={item.subItemForm.rate} onChange={e => updateSubItemForm(cat.categoryId, item.itemId, "rate", e.target.value)} />
                        <input placeholder="Unit" value={item.subItemForm.unit} onChange={e => updateSubItemForm(cat.categoryId, item.itemId, "unit", e.target.value)} />
                        <button onClick={() => addSubItem(cat.categoryId, item.itemId)}>Add Sub</button>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="6"><label><input type="checkbox" checked={item.useSubItems} onChange={() => toggleSubItem(cat.categoryId, item.itemId)} /> Enable Sub-Items</label></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default BoQBuilder;
