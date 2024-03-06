import cron from "node-cron";
import { IDependencies } from "../../application/interface/IDependencies";


export default (dependencies: IDependencies) => {
   const myCronJob = () => {
    console.log("Running cron job at:", new Date().toISOString());
    // Add your task logic here
  };
  
  cron.schedule("0 0 * * *", myCronJob);
}
