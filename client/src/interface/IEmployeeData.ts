export interface IEmployee {
 _id: string | null;
 name: string | null;
 email: string | null;
 department: string | null;
 workType: string | null;
 status: string | null;
 attendance: {
  date: Date | string | null;
  checkIn: string | null;
  checkOut: string | null;
  status: string | null;
 }[];
}
