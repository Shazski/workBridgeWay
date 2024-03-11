import jobExpiryCronJob from "./jobExpiryCronJob";
import InterviewReminderCronJob from "./InterviewReminderCronJob";
import { IDependencies } from "../../application/interface/IDependencies";

export default (dependencies: IDependencies) => ({
 jobExpiryCronJob: jobExpiryCronJob(dependencies),
 InterviewReminderCronJob: InterviewReminderCronJob(dependencies),
});
