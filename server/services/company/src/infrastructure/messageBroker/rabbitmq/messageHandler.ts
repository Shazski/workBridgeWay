import rabbitMQClient from "./client";
import { company_repo, job_repo } from "../../database/mongodb/repositories";
export default class MessageHandler {
 static async handle(
  operation: string,
  data: any,
  correlationId: string,
  replyTo: string
 ) {
  let response = {};
  switch (operation) {
   case "registerCompany":
    response = await company_repo.registerCompany(data);
    break;
   case "companyExists":
    response = await company_repo.findCompanyByEmail(data);
    break;
   case "getAllCompany":
    response = await company_repo.getAllCompanyData_repo();
    break;
   case "updateRequest":
    response = await company_repo.updateRequest(data);
    break;
   case "getAllJobs":
    response = await job_repo.getAlljobs(data);
    break;
   case "getJobById":
    response = await job_repo.getJobDetailsById(data);
    break;
   case "appplyForJob":
    response = await job_repo.applyForJob(data);
    break;
   case "checkUserInApplicants":
    response = await job_repo.findUserInApplicants(data);
    break;
   case "getUserApplications":
    response = await job_repo.getUserApplications(data);
    break;
   case "getPreferredJobs":
    response = await job_repo.getUserPreferredJobs(data);
    break;
   case "getEmployeeScheduleData":
    console.log("data ini nkilum vaaaa",data.employeeId)
    response = job_repo.getEmployeeSchedules(data.employeeId);
    break;
   default:
    response = "Request-key notfound";
    break;
  }

  await rabbitMQClient.Responder(response, correlationId, replyTo);
 }
}
