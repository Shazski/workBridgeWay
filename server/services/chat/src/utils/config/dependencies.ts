import chatRepo from "../../infrastructure/database/mongodb/repositories";
import chatUseCase from "../../application/useCases";

export const dependencies = {
 chatRepo,
 chatUseCase,
};
