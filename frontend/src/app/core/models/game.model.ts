export interface Game {
  _id: number;
  name: string;
  type: 'Game' | 'DLC' | 'Subscription';
  price: number;
  description: string;
  images: string[];
  trailer: string;
  platform: ('Windows' | 'macOS' | 'Linux')[];
}
