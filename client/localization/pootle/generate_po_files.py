import json
import datetime
from pathlib import Path

import polib
import tqdm

PRE_POOTLE_FILES_DIR = Path('prePootleFiles')
GENERATED_PO_FILES_DIR = Path('generatedPoFiles')


def generate_po_file(file_path: Path):
    with file_path.open() as f:
        file_data = json.load(f)
    po = polib.POFile()
    po.metadata = {
        'POT-Creation-Date': str(datetime.datetime.now()),
        'Content-Type': 'text/plain; charset=utf-8'
    }
    for k, v in file_data.items():
        entry = polib.POEntry(
            msgid=k,
            msgstr=v
        )
        po.append(entry)

    path_parts = list(file_path.parts[1:])
    path_parts[-1] = path_parts[-1].rstrip('json') + 'po'
    element_path = Path(*path_parts)
    if len(path_parts) > 1:
        Path(f'{GENERATED_PO_FILES_DIR}/{Path(*path_parts[:-1])}').mkdir(parents=True, exist_ok=True)
    po.save(f'{GENERATED_PO_FILES_DIR}/{element_path}')


def process_files():
    GENERATED_PO_FILES_DIR.mkdir(parents=True, exist_ok=True)
    for file_path in tqdm.tqdm(PRE_POOTLE_FILES_DIR.rglob('*.json')):
        generate_po_file(file_path)


if __name__ == '__main__':
    process_files()