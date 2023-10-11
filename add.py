import mysql.connector

import pandas as pd

# data = pd.read_table('/home/sanju/Desktop/tron/Bitcoin/nams.tsv')

# tsv_file = '/home/sanju/Desktop/tron/Bitcoin/nams.tsv'
tsv_file = '/home/sanju/Desktop/tron/Bitcoin/blockchair_bitcoin_addresses_latest.tsv'

def read_csv_file(filename):
    data = []
    # with open(filename, 'r') as file:
    datas = '/home/sanju/Desktop/tron/Bitcoin/blockchair_bitcoin_addresses_latest.tsv'
    df = pd.DataFrame()
    for chunk in pd.read_csv(datas,sep='\t',  chunksize=1000000):
        df = pd.concat([df, chunk], ignore_index=True)
        print(df)
    # datas = pd.read_table('/home/sanju/Desktop/tron/Bitcoin/nams.tsv')
    # data_tuples = [ row for index, row in datas.iterrows()]
    # print(datas.to_string())


    #     # Split the line into values using a comma as the delimiter
    #     values = line.strip().split(',')
    #     if len(values) == 2:
    #         data.append((values[0], int(values[1])))
    #     else:
    #         data.append(tuple(line.strip().split()))
    return data


# connection = mysql.connector.connect(
#     host='localhost',
#     user='root',
#     password='password',
#     database='BitcoinAddres'
# )

# # Create a cursor
# cursor = connection.cursor()

tsv_data = read_csv_file(tsv_file)
print(tsv_data)
# create_table_query = """
# CREATE TABLE IF NOT EXISTS btc_address (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     address VARCHAR(255),
#     balance BIGINT
# )
# """
# cursor.execute(create_table_query)
# print('Table created successfully.')

# # Insert data into the table
# insert_data_query = """
# INSERT INTO btc_address (address, balance) VALUES (%s, %s)
# """

# cursor.executemany(insert_data_query, tsv_data)
# connection.commit()  # Commit the transaction

# print('Data inserted successfully.')

# # Close the cursor and the connection
# cursor.close()
# connection.close()