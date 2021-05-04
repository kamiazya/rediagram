import { Logger } from 'tslog';
import { RediagramLogger } from './types';

export class DefaultLogger implements RediagramLogger {
  public static createRoot(): RediagramLogger {
    return new DefaultLogger(
      new Logger({
        type: 'pretty',
        name: 'rediagram',
        displayDateTime: false,
        displayFilePath: 'hidden',
        displayFunctionName: false,
      }),
    );
  }

  // eslint-disable-next-line no-useless-constructor
  constructor(private internal: Logger) {}

  public createChild(name: string): RediagramLogger {
    return new DefaultLogger(this.internal.getChildLogger({ name }));
  }

  public silly(...args: unknown[]): void {
    this.internal.silly(...args);
  }

  public trace(...args: unknown[]): void {
    this.internal.trace(...args);
  }

  public debug(...args: unknown[]): void {
    this.internal.debug(...args);
  }

  public info(...args: unknown[]): void {
    this.internal.info(...args);
  }

  public warn(...args: unknown[]): void {
    this.internal.warn(...args);
  }

  public error(...args: unknown[]): void {
    this.internal.error(...args);
  }

  public fatal(...args: unknown[]): void {
    this.internal.fatal(...args);
  }
}
