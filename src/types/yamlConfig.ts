import yaml from 'js-yaml';
import fs from 'fs';

interface YamlAccounts {
  cashbook: Account;
  revenue: Account;
}

interface YamlAccount {
  name: string;
  currency: string;
}

interface YamlConfig {
  accounts: BaseAccounts;
}

export default class Config {
  private static instance: YamlConfig;

  private config: ConfigYaml | null = null;

  private constructor() {
  }

  public static getInstance(): YamlConfig {
    if (!this.instance) {
      this.instance = new YamlConfig();
    }

    return this.instance;
  }

  public load(): void {
    this.config = (yaml.safeLoad(fs.readFileSync('./config/config.yaml', 'utf8')) as ConfigYaml)
  }

  public getConfig() {
    return this.config;
  }
}
