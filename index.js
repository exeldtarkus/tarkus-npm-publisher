#!/usr/bin/env node

import { runCommand } from './utils.js';
import promptVersionType from './prompts.js';
import prompts from 'prompts';

async function checkUncommittedChanges() {
  const output = await runCommand('git status --porcelain');
  return output.trim() !== '';
}

async function checkGitRemote() {
  const output = await runCommand('git remote -v');
  return output.trim() !== '';
}

async function checkNpmLogin() {
  try {
    await runCommand('npm whoami');
    return true;
  } catch {
    return false;
  }
}

async function askBuildOptions() {
  const response = await prompts([
    {
      type: 'confirm',
      name: 'shouldBuild',
      message: '📦 Apakah ingin menjalankan proses build?',
      initial: true
    },
    {
      type: prev => prev ? 'text' : null,
      name: 'buildCommand',
      message: '⚙️  Masukkan perintah build:',
      initial: 'npm run build'
    }
  ]);

  return response;
}

async function askCommitChanges() {
  const response = await prompts({
    type: 'confirm',
    name: 'commit',
    message: '🚨 Ada file yang belum di-commit. Commit sekarang?',
    initial: true
  });

  if (response.commit) {
    const message = await prompts({
      type: 'text',
      name: 'msg',
      message: '📝 Masukkan commit message:',
      validate: msg => msg.trim().length > 0 ? true : 'Commit message tidak boleh kosong.'
    });

    await runCommand('git add .');
    await runCommand(`git commit -m "${message.msg}"`);
    console.log('✅ Perubahan telah di-commit.');
  } else {
    console.log('⚠️  Perubahan tidak di-commit.');
  }
}

async function main() {
  // Cek remote Git
  const hasRemote = await checkGitRemote();
  if (!hasRemote) {
    console.error('❌ Tidak ada remote git repository yang terhubung. Jalankan "git remote add origin <url>" terlebih dahulu.');
    process.exit(1);
  }

  // Cek perubahan belum di-commit
  if (await checkUncommittedChanges()) {
    await askCommitChanges();
  }

  // Opsi build
  const { shouldBuild, buildCommand } = await askBuildOptions();
  if (shouldBuild && buildCommand) {
    console.log(`🔧 Menjalankan build: ${buildCommand}`);
    await runCommand(buildCommand);
  }

  // Versi
  const versionType = await promptVersionType();
  if (!versionType) {
    console.log('❌ Cancelled.');
    return;
  }

  console.log(`📦 Bumping version: ${versionType}`);
  await runCommand(`npm version ${versionType}`);

  console.log('🚀 Committing and pushing to GitHub...');
  await runCommand('git push');
  await runCommand('git push --tags');

  console.log('🔐 Mengecek apakah sudah login ke NPM...');
  const loggedIn = await checkNpmLogin();

  if (!loggedIn) {
    console.log('🔑 Anda belum login ke NPM. Silakan login terlebih dahulu:');
    try {
      await runCommand('npm login');
    } catch (e) {
      console.error('❌ Gagal login ke NPM. Proses dihentikan.');
      process.exit(1);
    }

    const recheck = await checkNpmLogin();
    if (!recheck) {
      console.error('❌ Masih belum login ke NPM. Proses dihentikan.');
      process.exit(1);
    }
  }

  console.log('📤 Publishing to NPM...');
  await runCommand('npm publish --access public');

  console.log('[✓] Done!');

  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error:', err);
});
