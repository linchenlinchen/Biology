
@eel.expose               # Expose this function to js
def save(data):
    import pandas as pd
    import xlsxwriter
    df = pd.DataFrame({'name': ['meat', 'rice'], 'price': [12, 3], 'quantity': [10, 100]})
    workbook = xlsxwriter.Workbook('products.xlsx')
    worksheet = workbook.add_worksheet()
    worksheet.write(1,1,data)