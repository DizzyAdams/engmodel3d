from pathlib import Path
root = Path('C:/Users/forrydev/Desktop/model3deng')
for p in sorted((root/'dist').rglob('model-catalog*')):
    print(p)
