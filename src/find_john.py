import json

# Load the Bible data
with open('./bos-app/src/data/kjv-bible.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

# Look for the Gospel of John
for book in data:
    if 'john' in book['name'].lower() and not book['name'].lower().startswith('1') and not book['name'].lower().startswith('2') and not book['name'].lower().startswith('3'):
        print(f"Found: {book['name']} ({book['abbrev']}): {len(book['chapters'])} chapters")
