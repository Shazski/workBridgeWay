import cron from "node-cron";
import { IDependencies } from "../../application/interface/IDependencies";
import { IJobsData } from "../database/mongodb/schema/jobSchema";

export default (dependencies: IDependencies) => {
 const {
  job_repo: { findAllExpiredJobs, updateJobExpiryStatus },
 } = dependencies;
 cron.schedule("0 0 * * *", async () => {
  try {
   const currentDate = new Date();

   // Find jobs where expiry is less than the current date
   const expiredJobs = await findAllExpiredJobs(currentDate);

   // Update the status of expired jobs to false
   if (expiredJobs.length > 0) {
    const updatePromises = expiredJobs.map(async (job: IJobsData) => {
     await updateJobExpiryStatus(job._id);
    });
    await Promise.all(updatePromises);

    console.log("Cron job executed successfully.");
   } else {
    console.log("<<No expired Job Found>>");
   }
  } catch (error) {
   console.error("Error executing cron job:", error);
  }
 });
};
