type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  data?: unknown
  stack?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, data } = entry
    let log = `[${timestamp}] [${level.toUpperCase()}] ${message}`
    
    if (data) {
      log += `\n${JSON.stringify(data, null, 2)}`
    }
    
    if (entry.stack) {
      log += `\n${entry.stack}`
    }
    
    return log
  }

  private log(level: LogLevel, message: string, data?: unknown) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    }

    const formattedLog = this.formatLog(entry)

    switch (level) {
      case 'error':
        console.error(formattedLog)
        break
      case 'warn':
        console.warn(formattedLog)
        break
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedLog)
        }
        break
      default:
        console.log(formattedLog)
    }

    // In production, you might want to send logs to a service like Sentry, LogRocket, etc.
    if (!this.isDevelopment && level === 'error') {
      // TODO: Send to error tracking service
    }
  }

  info(message: string, data?: unknown) {
    this.log('info', message, data)
  }

  warn(message: string, data?: unknown) {
    this.log('warn', message, data)
  }

  error(message: string, error?: unknown) {
    const entry: LogEntry = {
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      data: error,
      stack: error instanceof Error ? error.stack : undefined,
    }

    console.error(this.formatLog(entry))

    // In production, send to error tracking service
    if (!this.isDevelopment) {
      // TODO: Send to error tracking service
    }
  }

  debug(message: string, data?: unknown) {
    this.log('debug', message, data)
  }

  // Specific loggers for different contexts
  api(method: string, path: string, status: number, duration?: number) {
    this.info(`API ${method} ${path} - ${status}`, { duration })
  }

  auth(action: string, userId?: string, success = true) {
    this.info(`Auth: ${action}`, { userId, success })
  }

  transaction(type: string, userId: string, amount: number, status: string) {
    this.info(`Transaction: ${type}`, { userId, amount, status })
  }

  auction(action: string, auctionId: string, data?: unknown) {
    this.info(`Auction: ${action}`, { auctionId, ...(typeof data === 'object' && data !== null ? data : {}) })
  }
}

export const logger = new Logger()
