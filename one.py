import pandas as pd
import subprocess
import time
import schedule


def count_lines_using_wc(file_path):
    result = subprocess.run(['wc', '-l', file_path], stdout=subprocess.PIPE, text=True)
    line_count = int(result.stdout.split()[0])
    return line_count

tsv_file_path = '/home/sanju/Desktop/tron/Bitcoin/blockchair_bitcoin_addresses_latest.tsv'

line_count = count_lines_using_wc(tsv_file_path)
# print(f'Number of lines in the TSV file: {line_count}')


# # Specify the chunk size (number of lines to read at a time)
# chunk_size = 50000

# # Specify the TSV file path
# # tsv_file_path = 'your_file.tsv'  # Replace with your actual TSV file path
# # Specify the output text file path
# output_file_path = 'output.csv'  # Replace with your desired output file path

# # Read the TSV file in chunks
# for i, chunk in enumerate(pd.read_csv(tsv_file_path, sep='\t', chunksize=chunk_size)):
#     # Convert the chunk to a string and write to the output text file
#     with open(output_file_path, 'a') as output_file:
#         output_file.write(chunk.to_string(index=False, header=False))
    
#     print(f'Chunk {i + 1} processed and written to the output file.')

# print('Processing complete.')


def job():
    print("Job running...")

schedule.every(5).seconds.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)


