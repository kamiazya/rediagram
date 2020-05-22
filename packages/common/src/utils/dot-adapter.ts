import cp from 'child_process';

function execCommand(command: string, input: string): Buffer {
  return cp.execSync(command, {
    stdio: 'pipe',
    input,
  });
}

export function renderDot(input: string, output: string, format: 'png' | 'svg' = 'png'): Buffer {
  return execCommand(`dot -T${format} -o ${output}`, input);
}
