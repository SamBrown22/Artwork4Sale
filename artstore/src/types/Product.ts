export type Product = {
    id: string;
    description: string;
    imageUrl: string;
    name: string;
    priceInCents: number;
    createdAt?: Date;
    updatedAt?: Date;
    artistId?: string;
    artist?: {
      username: string;
      image: string | null;
    };
    sold: boolean;
    soldAt?: Date | null;
  };