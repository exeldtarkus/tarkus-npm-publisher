import prompts from 'prompts';

export default async function promptVersionType() {
  const response = await prompts({
    type: 'select',
    name: 'type',
    message: '📦 Pilih tipe versi:',
    choices: [
      { title: 'patch', value: 'patch' },
      { title: 'minor', value: 'minor' },
      { title: 'major', value: 'major' },
      { title: 'exit', value: null }
    ]
  });

  return response.type;
}
