import json

# Load the Bible data
with open('./bos-app/src/data/kjv-bible.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

# Print the number of books
print(f'Number of books in the Bible data: {len(data)}')

# Print the first 10 books and their chapter counts
for i, book in enumerate(data[:10]):
    print(f"{book['name']} ({book['abbrev']}): {len(book['chapters'])} chapters")
