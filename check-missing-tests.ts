// import fs from 'fs';
// import path from 'path';

// const SRC_DIR = 'src/components';
// const TESTS_DIR = 'tests';

// const sourceFiles: string[] = [];
// const testFiles: Set<string> = new Set();

// function walk(dir: string, action: (f: string) => void) {
//     fs.readdirSync(dir).forEach(file => {
//         const fullPath = path.join(dir, file);
//         const stat = fs.statSync(fullPath);
//         if (stat.isDirectory()) walk(fullPath, action);
//         else action(fullPath);
//     });
// }

// // Gather test file identifiers
// walk(TESTS_DIR, (filePath) => {
//     if (filePath.endsWith('.test.tsx') || filePath.endsWith('.test.ts')) {
//         const relative = path.relative(TESTS_DIR, filePath)
//             .replace(/\.test\.tsx?$/, '')
//             .replace(/\\/g, '/'); // for Windows
//         testFiles.add(relative);
//     }
// });

// // Check source files
// walk(SRC_DIR, (filePath) => {
//     if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
//         const relative = path.relative(SRC_DIR, filePath)
//             .replace(/\.(tsx|ts)$/, '')
//             .replace(/\\/g, '/');
//         sourceFiles.push(relative);
//     }
// });

// // Find missing tests
// const missingTests = sourceFiles.filter(f => !testFiles.has(f));

// if (missingTests.length > 0) {
//     console.error("❌ Missing test files for the following source files:");
//     // missingTests.forEach((file) => console.error(`- ${file}`));
//     missingTests.forEach((file) => {
//         // Construct expected test file path (assuming .test.tsx)
//         const expectedTestFile = path.join(TESTS_DIR, file + '.test.tsx').replace(/\\/g, '/');
//         console.error(`- ${expectedTestFile}`);
//     });
//     process.exit(1); //  this causes npm to treat it as failure
// } else {
//     console.log("✅ All source files have corresponding tests.");
// }

import fs from "fs";
import path from "path";

const SRC_DIR = "src/components";     // your source folder
const TESTS_DIR = "tests/components"; // your tests folder matching source structure

type FileInfo = { relativePath: string; fullPath: string };

function normalizePath(p: string) {
    return p.replace(/\\/g, "/")
        .replace(/\.test\.tsx?$/, "")
        .replace(/\.(tsx|ts)$/, "");
}

function walk(dir: string, action: (filePath: string) => void) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) walk(fullPath, action);
        else action(fullPath);
    });
}

const sourceFiles: FileInfo[] = [];
const testFilesSet: Set<string> = new Set();

// Collect test files relative to TESTS_DIR
walk(TESTS_DIR, (filePath) => {
    if (filePath.endsWith(".test.tsx") || filePath.endsWith(".test.ts")) {
        const relative = normalizePath(path.relative(TESTS_DIR, filePath));
        testFilesSet.add(relative);
    }
});

// Collect source files relative to SRC_DIR
walk(SRC_DIR, (filePath) => {
    if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
        const relative = normalizePath(path.relative(SRC_DIR, filePath));
        sourceFiles.push({ relativePath: relative, fullPath: filePath });
    }
});

// Find missing tests by comparing relative paths
const missingTests = sourceFiles.filter(srcFile => !testFilesSet.has(srcFile.relativePath));

if (missingTests.length > 0) {
    console.error("❌ Missing test files for the following source files:");
    missingTests.forEach(({ fullPath }) => {
        console.error(`- ${path.relative(process.cwd(), fullPath)}`);
    });
    process.exit(1);
} else {
    console.log("✅ All source files have corresponding tests.");
}
