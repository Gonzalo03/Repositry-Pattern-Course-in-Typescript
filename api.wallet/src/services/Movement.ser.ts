import { MovementType } from "../common/enums/movement.types";
import { ApplicationException } from "../common/exception/ApplicationException";
import { MovementCreateDto } from "../dtos/MovementDto";
import { BalanceRepository } from "./repositories/BalanceRepository";
import { Balance } from "./repositories/domain/balance";
import { Movement } from "./repositories/domain/movement";
import { MovementRepository } from "./repositories/MovementRepository";

export class MovementService {

    constructor(
        private readonly movementPostgresRepository: MovementRepository, 
        private readonly balancePostgresRepository: BalanceRepository){}

    public async find(id: number): Promise<Movement | null>{

       return this.movementPostgresRepository.find(id)

    }

    public async all(): Promise<Movement[]>{

        return this.movementPostgresRepository.all()

    }

    public async store(entry: MovementCreateDto): Promise<void>{

        const balance = await this.balancePostgresRepository.findByUserId(entry.user_id)

        if(entry.type === MovementType.income){

            await this.income(entry, balance)    

        }else if(entry.type === MovementType.outcome){

            await this.outcome(entry, balance)

        }else{

            throw new ApplicationException('movement is not valid', 404)

        }

    }

    private async income(entry: MovementCreateDto, balance: Balance | null){
        
        if(!balance){

            await this.balancePostgresRepository.store({
                amount: entry.amount,
                user_id: entry.user_id 
            } as Balance)

        }else{

            balance.amount += entry.amount

            await this.balancePostgresRepository.update(balance)
        }

        await this.movementPostgresRepository.store(entry as Movement)

    }

    public async outcome(entry: MovementCreateDto, balance: Balance | null) {
 
        if(!balance || balance.amount<entry.amount){

            throw new ApplicationException('without amount or not have enougth', 404)

        }else{

            balance.amount-=entry.amount
            console.log(balance.amount);
            
            await this.balancePostgresRepository.update(balance)
            await this.movementPostgresRepository.store(entry as Movement)
        }

    }
}