import mongoose, { ObjectId, Types } from "mongoose";
import { IJob } from "../../../../../application/interface/IJob";
import JobSchema, { IJobsData } from "../../schema/jobSchema";
import { Client } from "../../../redis/client";

export const postJob = async (
 credentials: IJob,
 companyId: ObjectId
): Promise<IJobsData | boolean> => {
 try {
  const job = await JobSchema.create({
   ...credentials,
   companyId,
  });

  if (!job) return false;
  await Client.del("jobs");
  const jobData = job as IJobsData;

  return jobData;
 } catch (error) {
  console.log(error, "<< Something went wrong in post job repo >>");
  return false;
 }
};
export const updateJobStatus = async (
 updateData: {
  status: boolean;
  id: ObjectId;
 },
 page: number,
 search: string
): Promise<IJobsData | boolean> => {
 try {
  await Client.flushall()
   .then(() => {
    console.log("All keys cleared successfully.");
   })
   .catch((err) => {
    console.error("Error clearing all keys:", err);
   });
  const job = await JobSchema.findOneAndUpdate(
   {
    _id: updateData.id,
   },
   { status: updateData.status },
   { new: true }
  );

  if (!job) return false;

  const jobData = job as IJobsData;

  return jobData;
 } catch (error) {
  console.log(error, "<< Something went wrong in update job status repo >>");
  return false;
 }
};

export const getAllCompanyJobs = async (
 companyId: ObjectId,
 page?: number,
 search?: string
): Promise<any> => {
 const skip = Number(page! - 1 ?? 1) * 10 || 0;

 try {
  const cachedJob = await Client.get(`jobs${page}${search}`);
  if (cachedJob) {
   await Client.expire(`jobs${page}${search}`, 10);
   return JSON.parse(cachedJob);
  }
  const jobs: IJob[] = await JobSchema.find({
   $or: [
    {
     jobTitle: { $regex: `${search}`, $options: "i" },
    },
    {
     category: { $regex: search, $options: "i" },
    },
    {
     typeOfEmployment: { $regex: search, $options: "i" },
    },
   ],
   companyId: companyId,
  })
   .limit(10)
   .skip(skip);
  const count: number = await JobSchema.find({
   $or: [
    {
     jobTitle: { $regex: `${search}`, $options: "i" },
    },
    {
     category: { $regex: search, $options: "i" },
    },
    {
     typeOfEmployment: { $regex: search, $options: "i" },
    },
   ],
   companyId: companyId,
  }).countDocuments();

  const totalPendingApplicantsCount: any = await JobSchema.aggregate([
   {
    $match: {
     companyId: new mongoose.Types.ObjectId(String(companyId)),
    },
   },
   {
    $unwind: "$applicants",
   },
   {
    $match: {
     "applicants.hiringStage": "pending",
    },
   },
   {
    $group: {
     _id: null,
     totalPendingApplicants: { $sum: 1 },
    },
   },
   {
    $project: {
     _id: 0,
     totalPendingApplicants: 1,
    },
   },
  ]);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const scheduleTodayCount = await JobSchema.aggregate([
   {
    $unwind: "$applicants",
   },
   {
    $unwind: "$applicants.schedule",
   },
   {
    $match: {
     "applicants.schedule.date": formattedDate,
    },
   },
   {
    $group: {
     _id: null,
     todayScheduledCount: { $sum: 1 },
    },
   },
  ]);

  if (!jobs) return false;
  if (jobs.length > 0) {
   await Client.set(
    `jobs${page}${search}`,
    JSON.stringify([
     jobs,
     count,
     totalPendingApplicantsCount[0]?.totalPendingApplicants,
     scheduleTodayCount[0]?.todayScheduledCount,
    ])
   );
  }
  return [
   jobs,
   count,
   totalPendingApplicantsCount[0]?.totalPendingApplicants,
   scheduleTodayCount[0]?.todayScheduledCount,
  ] as any;
 } catch (error) {
  console.log(error, "<< Something went wrong in getAllcompnayrepo >>");
  return false;
 }
};
export const getJobById = async (id: ObjectId): Promise<IJob | boolean> => {
 try {
  const job: IJob | null = await JobSchema.findOne({ _id: id }).populate({
   path: "companyId",
   select: "companyLogo name headOffice _id",
  });

  if (!job) return false;

  return job as IJob;
 } catch (error) {
  console.log(error, "<< Something went wrong in getJobById >>");
  return false;
 }
};
export const editJob = async (jobDetails: IJob): Promise<IJob | boolean> => {
 const { _id, ...restValue } = jobDetails;
 await Client.flushall((err, succeeded) => {
  if (err) {
   console.error("Error clearing Redis database:", err);
  } else {
   console.log("Successfully cleared Redis database", succeeded);
  }
 });
 try {
  const job: IJob | null = await JobSchema.findOneAndUpdate(
   { _id: _id },
   {
    ...restValue,
   }
  );

  if (!job) return false;

  return job as IJob;
 } catch (error) {
  console.log(error, "<< Something went wrong in edit job details >>");
  return false;
 }
};

export const getAlljobs = async (data: {
 page?: number;
 category?: string[];
 fromSalary?: number;
 toSalary?: number;
 typeOfEmployment?: string[];
 search?: number;
}): Promise<IJob[] | boolean> => {
 const skip = Number(data.page! - 1) * 10;
 delete data.page;
 try {
  let filter: any = { ...data };
  if (data.fromSalary !== undefined) {
   filter.fromSalary = { $gte: Number(data.fromSalary) };
  }
  if (data.toSalary !== undefined) {
   filter.toSalary = { $lte: Number(data.toSalary) };
  }

  const jobs: IJob[] = await JobSchema.find({ status: true, ...filter })
   .populate("companyId")
   .limit(10)
   .skip(skip);

  //get counts of all filters
  const count = await JobSchema.find({
   status: true,
   ...filter,
  }).countDocuments();
  const fullTime = await JobSchema.find({
   status: true,
   typeOfEmployment: "Full-Time",
  }).countDocuments();
  const partTime = await JobSchema.find({
   status: true,
   typeOfEmployment: "Part-Time",
  }).countDocuments();
  const remote = await JobSchema.find({
   status: true,
   typeOfEmployment: "Remote",
  }).countDocuments();
  const internship = await JobSchema.find({
   status: true,
   typeOfEmployment: "Internship",
  }).countDocuments();
  const sales = await JobSchema.find({
   status: true,
   category: "sales",
  }).countDocuments();
  const engineering = await JobSchema.find({
   status: true,
   category: "engineering",
  }).countDocuments();
  const marketing = await JobSchema.find({
   status: true,
   category: "marketing",
  }).countDocuments();
  const design = await JobSchema.find({
   status: true,
   category: "design",
  }).countDocuments();
  const finance = await JobSchema.find({
   status: true,
   category: "finance",
  }).countDocuments();
  const technology = await JobSchema.find({
   status: true,
   category: "technology",
  }).countDocuments();
  const business = await JobSchema.find({
   status: true,
   category: "business",
  }).countDocuments();
  const hr = await JobSchema.find({
   status: true,
   category: "hr",
  }).countDocuments();

  if (!jobs) return false;

  return [
   jobs,
   {
    count,
    fullTime,
    partTime,
    remote,
    internship,
    sales,
    engineering,
    marketing,
    design,
    finance,
    technology,
    business,
    hr,
   },
  ] as any;
 } catch (error) {
  console.log(error, "<< Something went wrong in getAllcompnayrepo >>");
  return false;
 }
};

export const getJobDetailsById = async (
 id: ObjectId
): Promise<IJobsData | boolean> => {
 try {
  const job = await JobSchema.findById(id)
   .populate("companyId")
   .select("-password");

  if (!job) return false;
  const jobData = job as IJobsData;

  return jobData;
 } catch (error) {
  console.log(error, "<< Something went wrong in getJobDetailsById  repo >>");
  return false;
 }
};
export const applyForJob = async (applicantCredentials: any): Promise<any> => {
 const { jobId, ...restValues } = applicantCredentials;
 try {
  const applied = await JobSchema.findByIdAndUpdate(jobId, {
   $push: { applicants: restValues },
  });

  if (!applied) return false;

  return applied as any;
 } catch (error) {
  console.log(error, "<< Something went wrong in getJobDetailsById  repo >>");
  return false;
 }
};
export const findUserInApplicants = async (applicationData: {
 applicantId: string;
 jobId: string;
}): Promise<any> => {
 try {
  const { applicantId, jobId } = applicationData;
  console.log(applicantId, jobId, "application and job id");
  const userExists = await JobSchema.aggregate([
   { $match: { _id: new mongoose.Types.ObjectId(jobId) } },
   { $unwind: "$applicants" },
   {
    $match: {
     "applicants.applicantId": new mongoose.Types.ObjectId(applicantId),
    },
   },
  ]);
  if (userExists.length === 0) return false;

  return userExists as any;
 } catch (error) {
  console.log(error, "<< Something went wrong in getJobDetailsById repo >>");
  return false;
 }
};
export const getUserApplications = async (data: {
 userId: string;
 page: number;
 status: string;
}): Promise<any> => {
 const { userId, page, status } = data;
 const skip = Number((page || 1) - 1) * 10;
 try {
  const aggregationPipeline: any[] = [
   { $unwind: "$applicants" },
   {
    $match: {
     "applicants.applicantId": new mongoose.Types.ObjectId(userId),
    },
   },
   {
    $lookup: {
     from: "companies",
     localField: "companyId",
     foreignField: "_id",
     as: "companyDetails",
    },
   },
   {
    $unwind: "$companyDetails",
   },
   {
    $project: {
     companyName: "$companyDetails.name",
     companyLogo: "$companyDetails.companyLogo",
     headOffice: "$companyDetails.headOffice",
     appliedDate: "$applicants.appliedDate",
     jobTitle: 1,
     hiringStage: "$applicants.hiringStage",
     linkedInUrl: "$applicants.linkedIn",
     previousJob: "$applicants.previousJob",
     portfolioUrl: "$applicants.portfolioUrl",
    },
   },
   { $limit: 10 },
   { $skip: skip },
  ];

  if (status !== "" && status !== "all") {
   aggregationPipeline.splice(2, 0, {
    $match: { "applicants.hiringStage": status },
   });
  }
  const applicants = await JobSchema.aggregate(aggregationPipeline);
  const countPipe: any[] = [
   { $unwind: "$applicants" },
   {
    $match: {
     "applicants.applicantId": new mongoose.Types.ObjectId(userId),
    },
   },
   {
    $lookup: {
     from: "companies",
     localField: "companyId",
     foreignField: "_id",
     as: "companyDetails",
    },
   },
   {
    $unwind: "$companyDetails",
   },
   {
    $project: {
     companyName: "$companyDetails.name",
     companyLogo: "$companyDetails.companyLogo",
     headOffice: "$companyDetails.headOffice",
     appliedDate: "$applicants.appliedDate",
     jobTitle: 1,
     hiringStage: "$applicants.hiringStage",
    },
   },
  ];

  if (status !== "" && status !== "all") {
   countPipe.splice(2, 0, {
    $match: { "applicants.hiringStage": status },
   });
  }
  const count = await JobSchema.aggregate(countPipe);

  if (!applicants) return false;
  return [applicants, Number(count.length)] as any;
 } catch (error) {
  console.log(error, "<< Something went wrong in getUserApplications repo >>");
  return false;
 }
};

export const updateApplicantStatus = async (
 userId: ObjectId,
 jobId: ObjectId,
 stage: string
): Promise<any> => {
 try {
  const updatedStatus: any = await JobSchema.updateOne(
   { _id: jobId, "applicants.applicantId": userId },
   {
    $set: {
     "applicants.$.hiringStage": stage,
    },
   }
  );

  if (!updatedStatus) return false;

  return updatedStatus;
 } catch (error) {
  console.log(error, "<< Something went wrong in getJobById >>");
  return false;
 }
};

export const getUserPreferredJobs = async (userCredentials: {
 preferredCategory: string;
 skills: string[];
}): Promise<IJobsData[] | boolean> => {
 try {
  const preferredJobs: IJobsData[] | null = await JobSchema.find({
   $and: [
    { category: userCredentials.preferredCategory },
    { requiredSkills: { $in: userCredentials.skills } },
   ],
  }).populate({
   path: "companyId",
   select: "companyLogo name headOffice",
  });

  if (!preferredJobs) return false;

  return preferredJobs as IJobsData[];
 } catch (error) {
  console.log(
   error,
   "<< Something went wrong in get User Preferred jobs repo >>"
  );
  return false;
 }
};

export const findAllExpiredJobs = async (currentDate: Date): Promise<any> => {
 try {
  const expiredJobs = await JobSchema.find({
   expiry: { $lt: currentDate },
   status: true,
  });

  if (!expiredJobs) return false;

  return expiredJobs as any;
 } catch (error) {
  console.log(error, "<< Something went wrong in findAllExpiredJobs  repo >>");
  return false;
 }
};
export const updateJobExpiryStatus = async (jobId: ObjectId): Promise<any> => {
 try {
  const updatedJobs = await JobSchema.findByIdAndUpdate(jobId, {
   $set: { status: false },
  });

  if (!updatedJobs) return false;

  return updatedJobs as any;
 } catch (error) {
  console.log(
   error,
   "<< Something went wrong in updateJobExpiryStatus  repo >>"
  );
  return false;
 }
};
export const scheduleInterviewForUser = async (
 jobId: ObjectId,
 userId: ObjectId,
 scheduleData: {
  testType: string;
  date: string;
  time: string;
  employeeId: ObjectId;
 }
): Promise<any> => {
 try {
  const updatedJobs = await JobSchema.findOneAndUpdate(
   { _id: jobId, "applicants.applicantId": userId },
   {
    $addToSet: { "applicants.$.schedule": scheduleData },
   },
   { new: true }
  ).populate({
   path: "companyId",
   select: "companyLogo name headOffice _id",
  });
  if (!updatedJobs) return false;

  return updatedJobs as any;
 } catch (error) {
  console.log(
   error,
   "<< Something went wrong in scheduleInterviewForUser  repo >>"
  );
  return false;
 }
};
export const cancelInterviewForUser = async (
 jobId: ObjectId,
 userId: ObjectId,
 scheduleId: ObjectId
): Promise<any> => {
 try {
  const updatedJobs = await JobSchema.findOneAndUpdate(
   { _id: jobId, "applicants.applicantId": userId },
   {
    $pull: { "applicants.$.schedule": { _id: scheduleId } },
   },
   { new: true }
  ).populate({
   path: "companyId",
   select: "companyLogo name headOffice _id",
  });
  if (!updatedJobs) return false;

  return updatedJobs as any;
 } catch (error) {
  console.log(
   error,
   "<< Something went wrong in cancelInterviewForUser  repo >>"
  );
  return false;
 }
};
export const getAllApplicantsSchedule = async (companyId: string) => {
 try {
  console.log(companyId, "companyId");
  const result = await JobSchema.aggregate([
   {
    $match: {
     companyId: new mongoose.Types.ObjectId(companyId),
    },
   },
   {
    $unwind: "$applicants",
   },
   {
    $unwind: "$applicants.schedule",
   },
   {
    $project: {
     _id: "$_id",
     schedule: "$applicants.schedule",
    },
   },
  ]);
  if (!result) return false;

  return result;
 } catch (error) {
  console.error("Error fetching data:", error);
  return false;
 }
};
export const getAllJobsForScheduleMail = async (currentDate: Date) => {
 try {
  const jobs = await JobSchema.find({
   "applicants.schedule.date": {
    $lte: currentDate.toISOString().split("T")[0],
   },
  });

  if (!jobs) return false;

  return jobs;
 } catch (error) {
  console.log(
   error,
   "<< Something went wrong in get all jobs for schedule mail repo >>"
  );
  return false;
 }
};

export const getEmployeeSchedules = async (
 employeeId: mongoose.Types.ObjectId
): Promise<any[]> => {
 try {
  const today = new Date();
  const jobs = await JobSchema.find({
   "applicants.schedule.employeeId": employeeId,
  });

  const schedules: any[] = [];

  jobs.forEach((job: any) => {
   job.applicants.forEach((applicant: any) => {
    applicant.schedule.forEach((schedule: any) => {
     if (
      schedule.employeeId.equals(employeeId) &&
      new Date(schedule.date) >= today
     ) {
      schedules.push({
       testType: schedule.testType,
       date: schedule.date,
       time: schedule.time,
       applicantId: applicant.applicantId,
      });
     }
    });
   });
  });
  return schedules;
 } catch (error) {
  throw error;
 }
};
