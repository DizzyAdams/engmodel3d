const { readdirSync, existsSync } = require('fs');
const { join } = require('path');
const root = 'C:/Users/forrydev/Desktop/model3deng/dist';
function walk(dir) {
  let entries = [];
  if (!existsSync(dir)) return entries;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = require('fs').statSync(full);
    if (stat.isDirectory()) entries = entries.concat(walk(full));
    else entries.push(full);
  }
  return entries;
}
for (const f of walk(root)) {
  if (f.includes('model-catalog')) console.log(f);
}
