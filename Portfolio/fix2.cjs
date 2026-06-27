const fs = require('fs');
const path = 'src/components/professional/Hyperspeed.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/\$\{THREE\.ShaderChunk\['([^']+)'\]\}/g, "` + THREE.ShaderChunk['$1'] + `");

// Let's also fix any \${ just in case it's still there
content = content.replace(/\\\$\{THREE\.ShaderChunk\['([^']+)'\]\}/g, "` + THREE.ShaderChunk['$1'] + `");

fs.writeFileSync(path, content, 'utf8');
