import assert from 'assert';
import { ApplicationException } from '../../src/common/exception/ApplicationException';
import { MovementCreateDto } from '../../src/dtos/MovementDto';
import { MovementService } from '../../src/services/Movement.ser';
import { BalanceMockRepository } from '../../src/services/repositories/impl/mock/BalanceMockRepository';
import { MovementMockRepository } from '../../src/services/repositories/impl/mock/MovementMockRepository';

const movementService = new MovementService(
    new MovementMockRepository(),
    new BalanceMockRepository()
);

describe('Test for movement service', ()=>{

    describe('store', ()=>{

        it('tries to register income', async ()=>{

            await movementService.store({
                user_id: 1,
                type: 0,
                amount:200
            } as MovementCreateDto)

        });

        it('tries to register outcome', async ()=>{

            await movementService.store({
                user_id: 1,
                type: 1,
                amount:200
            } as MovementCreateDto)

        });

        it('tries to register outcome without enougth amount', async ()=>{

            try {
                await movementService.store({
                    user_id: 1,
                    type: 1,
                    amount:200
                } as MovementCreateDto)
            } catch (error) {

                if(error instanceof ApplicationException){

                    assert.equal(error.message, 'without amount or not have enougth')

                }
                
            }

        });

        it('catch a invalid movement', async ()=>{

            try {
                await movementService.store({
                    user_id: 1,
                    type: 999,
                    amount:200
                } as any)
            } catch (error) {

                if(error instanceof ApplicationException){

                    assert.equal(error.message, 'movement is not valid')

                }

            }

        });

    });

});