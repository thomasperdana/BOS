import json

# Load the Bible data
with open('./bos-app/src/data/kjv-bible.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

# Find the book of John
john = next(book for book in data if book['abbrev'] == 'jo')

# Print John 8:1-12
chapter8 = john['chapters'][7]  # 0-indexed, so 7 is chapter 8
for i in range(min(12, len(chapter8))):
    print(f'John 8:{i+1} {chapter8[i]}')
