export const environment = {
  production: true,
  api: {
    protocol: 'http',
    host: 'whatsapp-laravel.test',
    get url(){
      return `${this.protocol}://${this.host}/api`;
    }
  }
};
