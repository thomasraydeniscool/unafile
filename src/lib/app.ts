import * as e from 'express';
import { createLogger, format, LogEntry, Logger, transports } from 'winston';

export interface IEndpoint {
  path: string;
  router: e.Router;
}

export class App {
  private app: e.Express;
  private endpoints: IEndpoint[];
  private logger: Logger;

  constructor(endpoints: IEndpoint[]) {
    this.app = e();
    this.endpoints = endpoints;
  }

  get instance(): e.Express {
    return this.app;
  }

  public log(args: LogEntry): void {
    this.logger.log(args);
  }

  public setup(custom?: (app: e.Express) => void): void {
    this.setupExpress(custom);
    this.setupLogger();
  }

  public start(port?: number): void {
    const p = port || 3000;
    this.app.listen(p, () => {
      this.logger.log({
        level: 'info',
        message: `Sever started on port ${p}`
      });
    });
  }

  private setupExpress(custom: (app: e.Express) => void): void {
    /**
     * API Middleware
     */
    this.app.use(e.json());

    /**
     * Web Middleware
     */
    custom(this.app);

    /**
     * API Endpoints
     */
    this.setupEndpoints();
  }

  private setupLogger(): void {
    const loggers = [];
    if (process.env.NODE_ENV !== 'production') {
      loggers.push(new transports.Console({ format: format.simple() }));
    } else {
      // loggers.push(
      //   ...[
      //     new transports.File({ filename: 'error.log', level: 'error' }),
      //     new transports.File({ filename: 'combined.log' })
      //   ]
      // );
    }
    this.logger = createLogger({
      format: format.json(),
      level: 'info',
      transports: loggers
    });
  }

  private setupEndpoints(): void {
    for (const { path, router } of this.endpoints) {
      this.app.use(path, router);
    }
  }
}
