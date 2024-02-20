import { company_useCase } from "../../application";
import { job_useCase } from "../../application";
import { company_repo } from "../../infrastructure/database/mongodb/repositories";
import { job_repo } from "../../infrastructure/database/mongodb/repositories";
import RabbitMqClient from "../../infrastructure/messageBroker/rabbitmq/client";
import { Client } from "../../infrastructure/database/redis/client";

export const dependencies = {
  company_useCase,
  company_repo,
  RabbitMqClient,
  job_repo,
  job_useCase,
  Client,
};
