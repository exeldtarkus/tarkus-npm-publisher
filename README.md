````markdown
# 🚀 tarkus-npm-publisher

A lightweight CLI tool to streamline your Node.js or TypeScript project release process: build, version bump, commit, push to GitHub, and publish to NPM — all in one flow.

![npm](https://img.shields.io/npm/v/tarkus-npm-publisher?color=blue)  
![node](https://img.shields.io/node/v/tarkus-npm-publisher)  
![license](https://img.shields.io/npm/l/tarkus-npm-publisher)

---

## ✨ Features

- ✅ Detects uncommitted files and prompts for commit
- 📦 Interactive version bump (`patch`, `minor`, `major`)
- ⚙️ Optional build step with customizable command (e.g. `tsc`, `npm run build`)
- 🔐 Checks NPM login and assists if not logged in
- 🚀 Pushes commits and tags to GitHub
- 📤 Publishes package to NPM with public access

---

## 📦 Installation

### As a dev dependency:

```bash
npm install -D tarkus-npm-publisher
````

### Or globally:

```bash
npm install -g tarkus-npm-publisher
```

---

## 🚀 Usage

### Run directly:

```bash
npx tarkus-npm-publisher
```

### Or add a custom script in `package.json`:

```json
"scripts": {
  "release": "tarkus-npm-publisher"
}
```

Then run:

```bash
npm run release
```

---

## 💡 Example Workflow

```bash
√ 🚨 Uncommitted changes detected. Commit now? ... yes
√ 📝 Enter commit message: ... add new feature

√ 📦 Run build process? ... yes
√ ⚙️  Enter build command: ... tsc

√ 📦 Choose version bump: » minor

📦 Bumping version: minor
🚀 Pushing changes to GitHub...
🔐 Checking NPM login...
📤 Publishing to NPM...
[✓] Done!
```

---

## 📁 Project Requirements

Before using:

* Ensure your project has a valid `package.json`
* Initialize git and link to a remote (e.g. GitHub)
* Log in to NPM at least once (`npm login`)

---

## 📝 License

MIT © [exeldtarkus](https://github.com/exeldtarkus)