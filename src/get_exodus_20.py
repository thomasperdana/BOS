import json

# Load the Bible data
with open('./bos-app/src/data/kjv-bible.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

# Find the book of Exodus
exodus = next(book for book in data if book['abbrev'] == 'ex')

# Print Exodus 20 (all verses)
if len(exodus['chapters']) >= 20:
    chapter20 = exodus['chapters'][19]  # 0-indexed, so 19 is chapter 20
    print(f'Exodus 20 (KJV) - The Ten Commandments\n')
    for i, verse in enumerate(chapter20):
        print(f'Exodus 20:{i+1} {verse}')
else:
    print(f'Exodus only has {len(exodus["chapters"])} chapters')
