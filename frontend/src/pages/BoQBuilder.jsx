// Importing necessary libraries and styles
import React, { useState } from "react"; // React is used for building UI components, useState manages state
import { v4 as uuidv4 } from "uuid"; // uuid is used to generate unique IDs for categories, subcategories, and items
import "./BoQBuilder.css"; // Importing the CSS file for styling the component

// Main functional component for the BoQ (Bill of Quantities) Builder
function BoQBuilder() {
  // State to manage the list of categories
  const [categories, setCategories] = useState([]);
  // State to manage the input for a new category name
  const [newCategoryName, setNewCategoryName] = useState("");

  // Function to add a new category to the list
  const addCategory = () => {
    if (!newCategoryName.trim()) return; // Prevent adding a category with an empty name
    setCategories([
      ...categories, // Retain the existing categories
      {
        categoryId: uuidv4(), // Generate a unique ID for the new category
        categoryName: newCategoryName.trim(), // Use the trimmed input as the category name
        subCategories: [] // Initialize with an empty list of subcategories
      }
    ]);
    setNewCategoryName(""); // Clear the input field after adding the category
  };

  // Function to add a new subcategory to a specific category
  const addSubCategory = (categoryId, subCategoryName) => {
    setCategories(categories.map(cat =>
      cat.categoryId === categoryId // Find the category to which the subcategory should be added
        ? {
            ...cat, // Spread the existing category properties
            subCategories: [
              ...cat.subCategories, // Retain the existing subcategories
              { subCategoryId: uuidv4(), subCategoryName, items: [] } // Add the new subcategory with an empty items array
            ]
          }
        : cat // Return other categories unchanged
    ));
  };

  // Function to add a new item to a specific subcategory
  const addItem = (categoryId, subCategoryId) => {
    const updated = categories.map(cat => {
      if (cat.categoryId === categoryId) { // Find the matching category
        const updatedSubCategories = cat.subCategories.map(sub => {
          if (sub.subCategoryId === subCategoryId) { // Find the matching subcategory
            const newItem = {
              itemId: uuidv4(), // Generate a unique ID for the new item
              description: "", // Initialize with an empty description
              unit: "", // Initialize with an empty unit
              quantity: "", // Initialize with an empty quantity
              rate: "", // Initialize with an empty rate
              breakups: [], // Initialize with an empty breakups array
              subItems: [], // Initialize with an empty sub-items array
            };
            return { ...sub, items: [...sub.items, newItem] }; // Add the new item to the subcategory
          }
          return sub; // Return other subcategories unchanged
        });
        return { ...cat, subCategories: updatedSubCategories }; // Update the category with the modified subcategories
      }
      return cat; // Return other categories unchanged
    });
    setCategories(updated); // Update the state with the modified categories
  };

  // Function to add a new sub-item to an item
  const addSubItem = (catId, subCatId, itemId) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.categoryId === catId) {
          return {
            ...cat,
            subCategories: cat.subCategories.map(sub => {
              if (sub.subCategoryId === subCatId) {
                return {
                  ...sub,
                  items: sub.items.map(item => {
                    if (item.itemId === itemId) {
                      // Check if there are existing sub-items
                      const lastSubItem = item.subItems[item.subItems.length - 1];
                      const newSubItem = lastSubItem
                        ? {
                            ...lastSubItem, // Copy data from the last sub-item
                            itemId: uuidv4(), // Generate a new unique ID
                          }
                        : {
                            // If no sub-items exist, create a default sub-item
                            itemId: uuidv4(),
                            description: "",
                            quantity: "",
                            rate: "",
                            unit: "",
                            breakups: [],
                            totalAmount: 0,
                          };
                      return { ...item, subItems: [...item.subItems, newSubItem] };
                    }
                    return item;
                  }),
                };
              }
              return sub;
            }),
          };
        }
        return cat;
      })
    );
  };

  // Function to update a specific field of an item
  const updateItemField = (catId, subCatId, itemId, field, value) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.categoryId === catId) {
          return {
            ...cat,
            subCategories: cat.subCategories.map(sub => {
              if (sub.subCategoryId === subCatId) {
                return {
                  ...sub,
                  items: sub.items.map(item =>
                    item.itemId === itemId ? { ...item, [field]: value } : item
                  ),
                };
              }
              return sub;
            }),
          };
        }
        return cat;
      })
    );
  };

  // Function to update a specific field of a sub-item
  const updateSubItemField = (catId, subCatId, itemId, subItemId, field, value) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.categoryId === catId) {
          return {
            ...cat,
            subCategories: cat.subCategories.map(sub => {
              if (sub.subCategoryId === subCatId) {
                return {
                  ...sub,
                  items: sub.items.map(item => {
                    if (item.itemId === itemId) {
                      return {
                        ...item,
                        subItems: item.subItems.map(subItem =>
                          subItem.itemId === subItemId ? { ...subItem, [field]: value } : subItem
                        ),
                      };
                    }
                    return item;
                  }),
                };
              }
              return sub;
            }),
          };
        }
        return cat;
      })
    );
  };

  // Function to add a breakup to an item
  const addBreakup = (catId, subCatId, itemId) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.categoryId === catId) {
          return {
            ...cat,
            subCategories: cat.subCategories.map(sub => {
              if (sub.subCategoryId === subCatId) {
                return {
                  ...sub,
                  items: sub.items.map(item => {
                    if (item.itemId === itemId) {
                      return {
                        ...item,
                        breakups: [...item.breakups, { name: "", percentage: "" }], // Add a new empty breakup
                      };
                    }
                    return item;
                  }),
                };
              }
              return sub;
            }),
          };
        }
        return cat;
      })
    );
  };

  const updateBreakup = (catId, subCatId, itemId, index, field, value) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.categoryId === catId) {
          return {
            ...cat,
            subCategories: cat.subCategories.map(sub => {
              if (sub.subCategoryId === subCatId) {
                return {
                  ...sub,
                  items: sub.items.map(item => {
                    if (item.itemId === itemId) {
                      const updatedBreakups = [...item.breakups];
                      updatedBreakups[index][field] = value; // Update the specific field of the breakup
                      return { ...item, breakups: updatedBreakups };
                    }
                    return item;
                  }),
                };
              }
              return sub;
            }),
          };
        }
        return cat;
      })
    );
  };

  // JSX to render the UI
  return (
    <div className="boq-container">
      <h2>BoQ Builder with Sub-Categories</h2>

      {/* Input field for adding a new category */}
      <input
        placeholder="Enter new category name"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
      <button onClick={addCategory}>Add Category</button>

      {/* Loop through each category and render its subcategories */}
      {categories.map(cat => (
        <div key={cat.categoryId} className="category-block">
          <h3>
            {cat.categoryName}
            <button onClick={() => {
              const newName = prompt("Edit Category Name:", cat.categoryName);
              if (newName) {
                setCategories(prev =>
                  prev.map(c => (c.categoryId === cat.categoryId ? { ...c, categoryName: newName } : c))
                );
              }
            }}>Edit</button>
            <button onClick={() => setCategories(prev => prev.filter(c => c.categoryId !== cat.categoryId))}>
              Delete
            </button>
          </h3>

          {/* Button to add a new subcategory */}
          <button
            onClick={() => {
              const name = prompt("Enter Sub-Category Name:");
              if (name) addSubCategory(cat.categoryId, name);
            }}
          >Add Sub-Category</button>

          {/* Loop through each subcategory */}
          {cat.subCategories?.map(sub => (
            <div key={sub.subCategoryId} className="subcategory-block">
              <h4>{sub.subCategoryName}</h4>
              <button onClick={() => addItem(cat.categoryId, sub.subCategoryId)}>Add Item</button>
              <table className="boq-table">
                <thead>
                  <tr>
                    <th>Description</th><th>Unit</th><th>Qty</th><th>Rate</th><th>Total</th><th>Breakups</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Loop through each item in the subcategory */}
                  {sub.items.map(item => (
                    <React.Fragment key={item.itemId}>
                      <tr>
                        <td>
                          <textarea
                            value={item.description}
                            placeholder="Enter item description"
                            onChange={(e) =>
                              updateItemField(cat.categoryId, sub.subCategoryId, item.itemId, "description", e.target.value)
                            }
                            rows="1" // Initial number of visible rows
                            style={{ resize: "none", overflow: "hidden" }} // Prevent manual resizing and ensure content fits
                            onInput={(e) => {
                              e.target.style.height = "auto"; // Reset height to auto
                              e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height to fit content
                            }}
                          />
                        </td>
                        <td>
                          <input
                            value={item.unit}
                            placeholder="Enter unit (e.g., kg, m)"
                            onChange={(e) =>
                              updateItemField(cat.categoryId, sub.subCategoryId, item.itemId, "unit", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.quantity}
                            placeholder="Enter quantity"
                            onChange={(e) =>
                              updateItemField(cat.categoryId, sub.subCategoryId, item.itemId, "quantity", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.rate}
                            placeholder="Enter rate"
                            onChange={(e) =>
                              updateItemField(cat.categoryId, sub.subCategoryId, item.itemId, "rate", e.target.value)
                            }
                          />
                        </td>
                        <td>{(item.quantity || 0) * (item.rate || 0)}</td>
                        <td>
                          {/* Render breakups */}
                          {item.breakups.map((b, i) => (
                            <div key={i}>
                              <input
                                placeholder="Breakup Name"
                                value={b.name}
                                onChange={(e) =>
                                  updateBreakup(cat.categoryId, sub.subCategoryId, item.itemId, i, "name", e.target.value)
                                }
                              />
                              <input
                                placeholder="Percentage"
                                type="number"
                                value={b.percentage}
                                onChange={(e) =>
                                  updateBreakup(cat.categoryId, sub.subCategoryId, item.itemId, i, "percentage", e.target.value)
                                }
                              />
                            </div>
                          ))}
                          <button onClick={() => addBreakup(cat.categoryId, sub.subCategoryId, item.itemId)}>+ Breakup</button>
                          <button onClick={() => {
                            setCategories(prev =>
                              prev.map(c =>
                                c.categoryId === cat.categoryId
                                  ? {
                                      ...c,
                                      subCategories: c.subCategories.map(s =>
                                        s.subCategoryId === sub.subCategoryId
                                          ? { ...s, items: s.items.filter(i => i.itemId !== item.itemId) }
                                          : s
                                      ),
                                    }
                                  : c
                              )
                            );
                          }}>Delete</button>
                        </td>
                      </tr>

                      {/* Render sub-items */}
                      {item.subItems.map(subItem => (
                        <tr key={subItem.itemId} className="sub-row">
                          <td>
                            <input
                              value={subItem.description}
                              placeholder="Enter sub-item description"
                              onChange={(e) =>
                                updateSubItemField(cat.categoryId, sub.subCategoryId, item.itemId, subItem.itemId, "description", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              value={subItem.unit}
                              placeholder="Enter unit"
                              onChange={(e) =>
                                updateSubItemField(cat.categoryId, sub.subCategoryId, item.itemId, subItem.itemId, "unit", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={subItem.quantity}
                              placeholder="Enter quantity"
                              onChange={(e) =>
                                updateSubItemField(cat.categoryId, sub.subCategoryId, item.itemId, subItem.itemId, "quantity", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={subItem.rate}
                              placeholder="Enter rate"
                              onChange={(e) =>
                                updateSubItemField(cat.categoryId, sub.subCategoryId, item.itemId, subItem.itemId, "rate", e.target.value)
                              }
                            />
                          </td>
                          <td>{(subItem.quantity || 0) * (subItem.rate || 0)}</td>
                          <td>
                            {/* Render breakups for sub-items if needed */}
                            {subItem.breakups.map((b, i) => (
                              <div key={i}>
                                <input
                                  placeholder="Breakup Name"
                                  value={b.name}
                                  onChange={(e) =>
                                    updateSubItemBreakup(cat.categoryId, sub.subCategoryId, item.itemId, subItem.itemId, i, "name", e.target.value)
                                  }
                                />
                                <input
                                  placeholder="Percentage"
                                  type="number"
                                  value={b.percentage}
                                  onChange={(e) =>
                                    updateSubItemBreakup(cat.categoryId, sub.subCategoryId, item.itemId, subItem.itemId, i, "percentage", e.target.value)
                                  }
                                />
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}

                      {/* Add Sub-Item Button */}
                      <tr className="sub-form-row">
                        <td colSpan="6">
                          <button onClick={() => addSubItem(cat.categoryId, sub.subCategoryId, item.itemId)}>Add Sub-Item</button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BoQBuilder;