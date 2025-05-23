import { exec } from 'child_process';

/**
 * Menjalankan perintah shell/terminal dan menampilkan output langsung.
 * @param {string} cmd - Perintah shell.
 * @returns {Promise<string>} - Output hasil eksekusi.
 */
export function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    const subprocess = exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(stderr || err.message);
      } else {
        resolve(stdout.trim());
      }
    });

    subprocess.stdout.pipe(process.stdout);
    subprocess.stderr.pipe(process.stderr);
  });
}
