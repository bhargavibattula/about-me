const fs = require('fs');
const path = 'src/components/professional/Hyperspeed.jsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/\\\$\{THREE\.ShaderChunk/g, '${THREE.ShaderChunk');
fs.writeFileSync(path, content, 'utf8');
