const db = {

    balance : [
        {
            id: 1,
            user_id: 1,
            amount: 0,

        },
        {
            id: 2,
            user_id: 2,
            amount: 0,   
        }
    ],

    movement : [

        {
            id: 1,
            user_id: 1,
            type: 0,
            amount: 200
        },

        {
            id: 2,
            user_id: 2,
            type: 0,
            amount: 400
        }

    ],

    subscription : [
        {
            id: 1,
            code: 'Movistar',
            user_id: 1,
            amount: 200,
            cron: 'Today'
        },
        {
            id: 2,
            code: 'Claro',
            user_id: 2,
            amount: 400,
            cron: 'Today and Tomorrow'
        }
    ],

    identitys: {

        balance: 0,
        movement: 0,
        subscription: 0

    }

}

db.identitys.balance = db.balance.length
db.identitys.movement = db.movement.length
db.identitys.subscription = db.subscription.length

export {db}