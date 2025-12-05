import { existsSync, mkdirSync } from "node:fs";
import path from 'path';

export default function ensureAndMkdir(filePath) {
    const folderPath = path.resolve(filePath)
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath, {recursive: true});
        return folderPath
    }
    else {
        return folderPath
    }
}