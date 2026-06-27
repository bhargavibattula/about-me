import os
import re

def replace_classes(content):
    # Remove dark: modifiers completely
    content = re.sub(r'dark:[a-zA-Z0-9_/[\]#-]+', '', content)
    
    # Replace backgrounds
    content = re.sub(r'bg-\[\#030412\]', 'bg-bg-primary', content)
    content = re.sub(r'bg-\[\#0c0e25\]/80', 'bg-bg-secondary', content)
    content = re.sub(r'bg-slate-50', 'bg-bg-primary', content)
    content = re.sub(r'bg-slate-100', 'bg-bg-secondary', content)
    content = re.sub(r'bg-slate-200', 'bg-bg-tertiary', content)
    content = re.sub(r'bg-slate-300', 'bg-bg-tertiary', content)
    content = re.sub(r'bg-white/5', 'bg-bg-secondary', content)
    content = re.sub(r'bg-white/10', 'bg-bg-tertiary', content)
    content = re.sub(r'bg-white/\[0\.01\]', 'bg-bg-secondary', content)
    content = re.sub(r'bg-white/\[0\.03\]', 'bg-bg-tertiary', content)
    content = re.sub(r'bg-primary/20', 'bg-bg-secondary', content)
    
    # Replace text colors
    content = re.sub(r'text-slate-900', 'text-text-primary', content)
    content = re.sub(r'text-slate-800', 'text-text-primary', content)
    content = re.sub(r'text-slate-700', 'text-text-secondary', content)
    content = re.sub(r'text-slate-600', 'text-text-secondary', content)
    content = re.sub(r'text-slate-500', 'text-text-muted', content)
    content = re.sub(r'text-slate-400', 'text-text-muted', content)
    content = re.sub(r'text-white/50', 'text-text-muted', content)
    content = re.sub(r'text-white/40', 'text-text-muted', content)
    content = re.sub(r'text-white/30', 'text-text-muted', content)
    content = re.sub(r'text-white/20', 'text-text-muted', content)
    content = re.sub(r'text-white/10', 'text-text-muted', content)
    
    # Ensure text-white is handled carefully
    content = re.sub(r'\btext-white\b', 'text-text-primary', content)
    
    # Replace borders
    content = re.sub(r'border-slate-200', 'border-border', content)
    content = re.sub(r'border-slate-300', 'border-border-strong', content)
    content = re.sub(r'border-white/5', 'border-border', content)
    content = re.sub(r'border-white/10', 'border-border-strong', content)
    content = re.sub(r'border-white/20', 'border-border-strong', content)
    
    # Hovers
    content = re.sub(r'hover:bg-slate-100', 'hover:bg-bg-secondary', content)
    content = re.sub(r'hover:bg-slate-200', 'hover:bg-bg-tertiary', content)
    content = re.sub(r'hover:bg-white/10', 'hover:bg-bg-tertiary', content)
    content = re.sub(r'hover:bg-white/5', 'hover:bg-bg-secondary', content)
    content = re.sub(r'hover:border-slate-300', 'hover:border-border-strong', content)
    content = re.sub(r'hover:border-slate-400', 'hover:border-border-strong', content)
    content = re.sub(r'hover:text-slate-900', 'hover:text-text-primary', content)
    content = re.sub(r'hover:text-slate-800', 'hover:text-text-primary', content)
    content = re.sub(r'hover:text-white', 'hover:text-text-primary', content)
    
    # Clean up double spaces created by empty dark classes
    content = re.sub(r'\s{2,}', ' ', content)
    
    return content

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = replace_classes(content)
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Processed {filepath}')
