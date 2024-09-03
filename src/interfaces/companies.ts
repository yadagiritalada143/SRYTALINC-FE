export interface CompaniesInterface {
  id: string;
  companyName: string;
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
  secondaryContact_1: {
    name: string;
    email: string;
    phone: string;
  };
  secondaryContact_2: {
    name: string;
    email: string;
    phone: string;
  };
  status: string;
  lastUpdatedAt: Date;
  comments: [
    {
      date: Date;
      comment: string;
      firstName: string;
      lastName: string;
    }
  ];
}
