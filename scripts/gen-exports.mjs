import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEATURES_ROOT = path.resolve(__dirname, '../features');
const SUB_FOLDERS = ['components', 'hooks', 'services', 'types', 'utils'];

function generateForFeature(featureName) {
    const featurePath = path.join(FEATURES_ROOT, featureName);

    // Kiểm tra an toàn: chỉ xử lý nếu là thư mục
    try {
        if (!fs.statSync(featurePath).isDirectory()) return;
    } catch (e) { return; }

    const indexPath = path.join(featurePath, 'index.ts');
    let content = `// Auto-generated index for feature: ${featureName}\n\n`;
    let hasExports = false;

    SUB_FOLDERS.forEach(folder => {
        const folderPath = path.join(featurePath, folder);

        if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
            const files = fs.readdirSync(folderPath);

            files.forEach(file => {
                // Loại bỏ index, test, các file hidden (.ds_store)
                if ((file.endsWith('.ts') || file.endsWith('.tsx')) &&
                    !file.startsWith('index') &&
                    !file.includes('.test.')) {

                    const fileName = file.replace(/\.tsx?$/, '');
                    content += `export * from './${folder}/${fileName}';\n`;
                    hasExports = true;
                }
            });
        }
    });

    if (hasExports) {
        fs.writeFileSync(indexPath, content.trim() + '\n');
        console.log(`✅ Updated: features/${featureName}/index.ts`);
    }
}

function run() {
    if (!fs.existsSync(FEATURES_ROOT)) {
        console.error('❌ Không tìm thấy thư mục features tại:', FEATURES_ROOT);
        return;
    }

    const features = fs.readdirSync(FEATURES_ROOT);
    features.forEach(generateForFeature);
    console.log('🚀 All feature indexes have been regenerated!');
}

run();