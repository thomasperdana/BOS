import json

# Load the Bible data
with open('./bos-app/src/data/kjv-bible.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

# New Testament books to check
nt_books = ['mt', 'mk', 'lk', 'jn', 'ac', 'rm', 'rv']

# Print information about these books
for abbrev in nt_books:
    book = next((b for b in data if b['abbrev'] == abbrev), None)
    if book:
        print(f"{book['name']} ({book['abbrev']}): {len(book['chapters'])} chapters")
    else:
        print(f"Book with abbreviation '{abbrev}' not found")
