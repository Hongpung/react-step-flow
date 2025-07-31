import { readdir, rename, stat } from 'fs/promises';
import { join } from 'path';

async function renameToCjs(dir) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const fullPath = join(dir, file);
    const stats = await stat(fullPath);
    
    if (stats.isDirectory()) {
      await renameToCjs(fullPath);
    } else if (file.endsWith('.js')) {
      const newPath = fullPath.replace('.js', '.cjs');
      await rename(fullPath, newPath);
      console.log(`Renamed: ${fullPath} -> ${newPath}`);
    }
  }
}

async function processCjsFiles() {
  try {
    // dist/common의 파일들을 .cjs 확장자로 변경
    const distCommonPath = './dist/common/step-flow';
    
    await renameToCjs(distCommonPath);
    
    console.log('CJS build completed successfully!');
  } catch (error) {
    console.error('Error during CJS build:', error);
    process.exit(1);
  }
}

processCjsFiles(); 