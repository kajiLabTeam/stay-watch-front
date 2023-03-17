type Tag = {
    id: number;
    name: string;
}

export type User = {
    userId: number;
    uuid: string;
    name: string;
    tags: Tag[];
    mail: string;
    beaconType: number;
  };
  
  export default User;
  