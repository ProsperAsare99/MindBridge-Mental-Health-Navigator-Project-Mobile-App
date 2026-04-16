import sys
import os

try:
    with open('errors.txt', 'r', encoding='utf-16') as f:
        content = f.read()
        print(content)
except Exception as e:
    print(f"Error: {e}")
