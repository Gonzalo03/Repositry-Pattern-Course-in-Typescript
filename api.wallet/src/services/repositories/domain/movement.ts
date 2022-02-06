import { MovementType } from "../../../common/enums/movement.types";

export interface Movement {
    id: number;
    user_id: number;
    type: MovementType;
    amount: number;
    created_at?: Date
    updated_at?: Date
}