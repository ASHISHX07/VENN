import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// executables paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cppExe = path.resolve(__dirname, '03_Core_Cpp/sampleStruct.cpp');
const pySrc = path.resolve(__dirname, '02_Strategies_Python/example.py');
const nodeGateway = path.resolve(__dirname, '01_Gateway_Node/index.js');

console.log(`[LAUNCHER] Starting....`);
console.log(`[LAUNCHER] Launching Example C++ Code`);
const cppProcess = spawn(cppExe, [], {stdio: 'inherit'});

console.log(`[LAUNCHER] -----> Launching Python Layer....`);
const pyProcess = spawn('python', [pySrc], {stdio: 'inherit'});

setTimeout(() => {
    console.log(`-----> Launching Node Layer`);
    const nodeProcess = spawn('node', [nodeGateway], {stdio: 'inherit'});

    nodeProcess.on('close', (code) => {
        console.log(`[LAUNCHER] Gatway exited with code ${code}. Killing Core....`);
        cppProcess.kill();
        pyProcess.kill();
        process.exit(code);
    });
}, 2000)


