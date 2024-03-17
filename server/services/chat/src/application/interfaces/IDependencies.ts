import { IChatRepository } from "./IChatRepository";
import { IChatUseCase } from "./IChatUseCases";
export interface IDependencies {
 chatRepo: IChatRepository;
 chatUseCase: IChatUseCase;
}
