from fastapi.middleware.cors import CORSMiddleware

# Allow CORS so your React frontend can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"] for stricter security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-boq/")
def get_boq():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="yourpassword",
            database="boq_db"
        )
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM categories")
        categories = cursor.fetchall()

        boq = []
        for cat in categories:
            cursor.execute("SELECT * FROM subcategories WHERE category_id = %s", (cat['id'],))
            subcategories = cursor.fetchall()

            subcat_list = []
            for sub in subcategories:
                cursor.execute("SELECT * FROM items WHERE sub_category_id = %s", (sub['id'],))
                items = cursor.fetchall()

                item_list = []
                for item in items:
                    cursor.execute("SELECT * FROM breakups WHERE item_id = %s AND sub_item_id IS NULL", (item['id'],))
                    breakups = cursor.fetchall()

                    cursor.execute("SELECT * FROM sub_items WHERE parent_item_id = %s", (item['id'],))
                    sub_items = cursor.fetchall()

                    sub_item_list = []
                    for sub_item in sub_items:
                        cursor.execute("SELECT * FROM breakups WHERE sub_item_id = %s", (sub_item['id'],))
                        sub_breakups = cursor.fetchall()
                        sub_item['breakups'] = sub_breakups
                        sub_item_list.append(sub_item)

                    item['breakups'] = breakups
                    item['subItems'] = sub_item_list
                    item_list.append(item)

                sub['items'] = item_list
                subcat_list.append(sub)

            cat['subCategories'] = subcat_list
            boq.append(cat)

        return boq
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
