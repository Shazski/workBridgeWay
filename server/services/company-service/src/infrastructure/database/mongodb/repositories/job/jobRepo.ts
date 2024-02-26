import { ObjectId } from "mongoose";
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
 page: number,
 search: string
): Promise<any> => {
 const skip = Number(page - 1) * 10;

 if (search !== "") {
 }

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

  if (!jobs) return false;
  if (jobs.length > 0) {
   await Client.set(`jobs${page}${search}`, JSON.stringify([jobs, count]));
  }
  return [jobs, count] as any;
 } catch (error) {
  console.log(error, "<< Something went wrong in getAllcompnayrepo >>");
  return false;
 }
};
export const getJobById = async (id: ObjectId): Promise<IJob | boolean> => {
 try {
  const job: IJob | null = await JobSchema.findOne({ _id: id });

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
