import json

# Load the Bible data
with open('./bos-app/src/data/kjv-bible.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

# Find the book of Deuteronomy
deut = next(book for book in data if book['abbrev'] == 'dt')

# Print Deuteronomy 29:29
if len(deut['chapters']) >= 29:
    chapter29 = deut['chapters'][28]  # 0-indexed, so 28 is chapter 29
    if len(chapter29) >= 29:
        print(f'Deuteronomy 29:29 {chapter29[28]}')  # 0-indexed, so 28 is verse 29
    else:
        print(f'Deuteronomy 29 only has {len(chapter29)} verses')
else:
    print(f'Deuteronomy only has {len(deut["chapters"])} chapters')
